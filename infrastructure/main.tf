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

resource "aws_vpc" "spidersweeper_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
  tags = {
    Name = "spidersweeper_vpc"
  }
}

resource "aws_internet_gateway" "spidersweeper_gateway" {
  vpc_id = aws_vpc.spidersweeper_vpc.id
  tags = {
    owner: "josh@bbd.co.za"
  }
}

resource "aws_subnet" "spidersweeper_subnet_a" {
  vpc_id                  = aws_vpc.spidersweeper_vpc.id
  cidr_block              = "10.0.4.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "eu-west-1a"
  tags = {
    owner: "josh@bbd.co.za"
  }
}

resource "aws_route_table" "spidersweeper_route_table_a" {
  vpc_id = aws_vpc.spidersweeper_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.spidersweeper_gateway.id
  }

  tags = {
    owner: "josh@bbd.co.za"
  }
}

resource "aws_route_table_association" "spidersweeper_association_a" {
  subnet_id      = aws_subnet.spidersweeper_subnet_a.id
  route_table_id = aws_route_table.spidersweeper_route_table_a.id
}

resource "aws_subnet" "spidersweeper_subnet_b" {
  vpc_id                  = aws_vpc.spidersweeper_vpc.id
  cidr_block              = "10.0.5.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "eu-west-1b"
  tags = {
    owner: "josh@bbd.co.za"
  }
}

resource "aws_route_table" "spidersweeper_route_table_b" {
  vpc_id = aws_vpc.spidersweeper_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.spidersweeper_gateway.id
  }

  tags = {
    owner: "josh@bbd.co.za"
  }
}

resource "aws_route_table_association" "spidersweeper_association_b" {
  subnet_id      = aws_subnet.spidersweeper_subnet_b.id
  route_table_id = aws_route_table.spidersweeper_route_table_b.id
}

resource "aws_db_subnet_group" "spidersweeper_subnet_group" {
  name       = "spidersweeper_subnet_group"
  subnet_ids = [aws_subnet.spidersweeper_subnet_a.id, aws_subnet.spidersweeper_subnet_b.id]

  tags = {
    owner: "josh@bbd.co.za"
  }
}

resource "aws_security_group" "spidersweeper_security_group" {
  vpc_id = aws_vpc.spidersweeper_vpc.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    owner: "josh@bbd.co.za"
  }
}

resource "aws_db_instance" "web-levelup-db" {
  identifier             = "web-levelup-db"
  engine                 = "sqlserver-ex"
  engine_version         = "14.00.3465.1.v1"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  storage_type           = "gp2"
  publicly_accessible    = true
  username               = var.db_username
  password               = var.db_password
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.spidersweeper_security_group.id]
  tags = {
    owner         = "josh@bbd.co.za"
    created-using = "terraform"
  }
}