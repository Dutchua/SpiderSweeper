# Define variables in separate files (variables.tf)
variable "aws_region" {
  description = "Region of resources"
  type        = string
  default     = "eu-west-1"
}

variable "bucket_name" {
  description = "Name of the bucket"
  type        = string
}

# Main Terraform configuration (main.tf)
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.48.0"
    }
  }
  required_version = ">= 1.8.2"
}

provider "aws" {
  region = var.aws_region
}

# Check if VPC already exists, if not, create it
resource "aws_vpc" "spidersweeper_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "spidersweeper_vpc"
  }
}

# Check if subnets already exist, if not, create them
resource "aws_subnet" "spidersweeper_subnet_a" {
  vpc_id                  = aws_vpc.spidersweeper_vpc.id
  cidr_block              = "10.0.4.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "${var.aws_region}a"
}

resource "aws_subnet" "spidersweeper_subnet_b" {
  vpc_id                  = aws_vpc.spidersweeper_vpc.id
  cidr_block              = "10.0.5.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "${var.aws_region}b"
}

# Check if internet gateway exists, if not, create it
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.spidersweeper_vpc.id
}

# Check if route table exists, if not, create it
resource "aws_route_table" "r" {
  vpc_id = aws_vpc.spidersweeper_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
}

# Associate route table with subnet
resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.spidersweeper_subnet_b.id
  route_table_id = aws_route_table.r.id
}

resource "aws_db_subnet_group" "spidersweeper_subnet_group" {
  name       = "spidersweeper_subnet_group"
  subnet_ids = [aws_subnet.spidersweeper_subnet_a.id, aws_subnet.spidersweeper_subnet_b.id]
}

# Check if security group exists, if not, create it
resource "aws_security_group" "mssql_sg" {
  vpc_id = aws_vpc.spidersweeper_vpc.id

  ingress {
    from_port   = 1433
    to_port     = 1433
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "mssql" {
  allocated_storage    = 20
  storage_type         = "gp3"
  engine               = "sqlserver-ex"
  instance_class       = "db.t3.micro"  # Updated to micro instance
  username             = var.db_username
  password             = var.db_password
  db_subnet_group_name = aws_db_subnet_group.spidersweeper_subnet_group.name
  publicly_accessible  = true
  skip_final_snapshot  = true
  multi_az             = false
  vpc_security_group_ids = [aws_security_group.mssql_sg.id]
}

# Check if S3 bucket exists
data "aws_s3_bucket" "existing_bucket" {
  bucket = var.bucket_name
}

# Configure S3 bucket for website hosting
resource "aws_s3_bucket_website_configuration" "existing_bucket_website" {
  bucket = data.aws_s3_bucket.existing_bucket.id

  index_document {
    suffix = "index.html"
  }
}

# Apply bucket policy for public access
resource "aws_s3_bucket_policy" "existing_bucket_policy" {
  bucket = data.aws_s3_bucket.existing_bucket.id

  policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "${data.aws_s3_bucket.existing_bucket.arn}/*"
    }]
  })
}


# Upload files to S3 bucket
resource "aws_s3_object" "existing_bucket_files" {
  for_each     = fileset("../frontend/Views/", "*")
  bucket       = data.aws_s3_bucket.existing_bucket.id
  key          = each.value
  source       = "../frontend/Views/${each.value}"
  content_type = "text/html"
}