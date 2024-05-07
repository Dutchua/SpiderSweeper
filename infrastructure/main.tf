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

resource "aws_default_vpc" "default_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
  tags = {
    Name = "default_vpc"
  }
}

data "aws_availability_zones" "available_zones" {
  
}

resource "aws_subnet" "subnet_az1" {
  vpc_id            = aws_vpc.default_vpc.id
  cidr_block              = "10.0.4.0/24"
  map_public_ip_on_launch = true
  availability_zone = data.aws_availability_zones.available_zones.names[0]
}

resource "aws_subnet" "subnet_az2" {
  vpc_id            = aws_vpc.default_vpc.id
  cidr_block              = "10.0.4.0/24"
  map_public_ip_on_launch = true
  availability_zone = data.aws_availability_zones.available_zones.names[1]
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.default_vpc.id
}

resource "aws_route_table" "r" {
  vpc_id = aws_vpc.default_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
}

resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.subnet_az1.id
  route_table_id = aws_route_table.r.id
}


resource "aws_security_group" "allow_mssql_current" {
  name        = "allow_mssql_current"

  ingress {
    from_port   = 1433
    to_port     = 1433
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow_mssql_current"
    owner = "josh@bbd.co.za"
    created-using = "terraform"
  }
}

resource "aws_db_instance" "web-levelup-db" {
  identifier             = "web-levelup-db"
  engine                 = "sqlserver-ex"
  engine_version         = "14.0.3456.2"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  storage_type           = "gp2"
  publicly_accessible    = true
  multi_az               = false
  username               = var.db_username
  password               = var.db_password
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.allow_mssql_current.id]
  tags = {
    owner         = "josh@bbd.co.za"
    created-using = "terraform"
  }
}