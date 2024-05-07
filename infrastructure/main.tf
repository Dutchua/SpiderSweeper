terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.48.0"
    }
  }
  required_version = ">= 1.8.2"
}

variable "aws_region" {
  description = "Region of resources"
  type = string
  sensitive = true
  default = "eu-west-1"
}

provider "aws" {
}

# Define VPC
resource "aws_vpc" "my_vpc" {
  cidr_block = "10.0.0.0/16" # Change this to your desired CIDR block
}

# Define Subnets
resource "aws_subnet" "public_subnet" {
  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "10.0.1.0/24" # Change this to your desired CIDR block
  availability_zone = "eu-west-1" # Change this to your desired availability zone
}

resource "aws_subnet" "private_subnet" {
  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "10.0.2.0/24" # Change this to your desired CIDR block
  availability_zone = "eu-west-1" # Change this to your desired availability zone
}

resource "aws_db_subnet_group" "my_subnet_group" {
  name       = "my-subnet-group"
  subnet_ids = [
    aws_subnet.private_subnet.id,
  ]
}

# Define Security Group
resource "aws_security_group" "rds_sg" {
  name        = "rds-sg"
  description = "Allow traffic to RDS SQL Server"
  vpc_id      = aws_vpc.my_vpc.id

  ingress {
    from_port   = 1433
    to_port     = 1433
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Restrict this to specific IP ranges for security
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Define the RDS SQL Server instance
resource "aws_db_instance" "sql_server" {
  identifier            = "my-sql-server" # Change this to your desired identifier
  engine                = "sqlserver-se"
  engine_version        = "15.00.2000.05.v1"
  instance_class        = "db.t3.micro" # Change this to your desired instance class
  allocated_storage     = 20 # Change this to your desired storage size in GB
  storage_type          = "gp2" # Change this to your desired storage type
  username              = var.db_username
  password              = var.db_password
  publicly_accessible   = false # Change this to true if you want the instance to be publicly accessible
  skip_final_snapshot   = true # Change this to false if you want a final snapshot to be created when the instance is deleted

  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  subnet_group_name      = aws_db_subnet_group.my_subnet_group.name

  subnet_ids = [aws_subnet.private_subnet.id]
}