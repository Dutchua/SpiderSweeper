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

locals {
  mime_types = {
    ".html" = "text/html"
    ".css" = "text/css"
    ".js" = "application/javascript"
    ".ico" = "image/vnd.microsoft.icon"
    ".jpeg" = "image/jpeg"
    ".png" = "image/png"
    ".svg" = "image/svg+xml"
  }
}

resource "aws_s3_object" "existing_bucket_files" {
  bucket = data.aws_s3_bucket.existing_bucket.id
  for_each = fileset("../frontend/Views/", "**")
  key = each.value
  source = "${"../frontend/Views/"}/${each.value}"
  content_type = lookup(local.mime_types, regex("\\.[^.]+$", each.value), null)
  etag = filemd5("${"../frontend/Views/"}/${each.value}")

  content_disposition = null
}

resource "aws_vpc" "spidersweeper_api_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
  tags = {
    Name = "spidersweeper_api_vpc"
  }
}

resource "aws_internet_gateway" "spidersweeper_api_gateway" {
  vpc_id = aws_vpc.spidersweeper_api_vpc.id
  tags = {
    owner: "josh@bbd.co.za"
  }
}

resource "aws_subnet" "spidersweeper_api_subnet_a" {
  vpc_id                  = aws_vpc.spidersweeper_api_vpc.id
  cidr_block              = "10.0.4.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "eu-west-1a"
  tags = {
    owner: "josh@bbd.co.za"
  }
}

resource "aws_route_table" "spidersweeper_api_route_table_a" {
  vpc_id = aws_vpc.spidersweeper_api_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.spidersweeper_api_gateway.id
  }

  tags = {
    owner: "josh@bbd.co.za"
  }
}

resource "aws_route_table_association" "spidersweeper_api_association_a" {
  subnet_id      = aws_subnet.spidersweeper_api_subnet_a.id
  route_table_id = aws_route_table.spidersweeper_api_route_table_a.id
}

resource "aws_subnet" "spidersweeper_api_subnet_b" {
  vpc_id                  = aws_vpc.spidersweeper_api_vpc.id
  cidr_block              = "10.0.5.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "eu-west-1b"
  tags = {
    owner: "josh@bbd.co.za"
  }
}

resource "aws_route_table" "spidersweeper_api_route_table_b" {
  vpc_id = aws_vpc.spidersweeper_api_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.spidersweeper_api_gateway.id
  }

  tags = {
    owner: "josh@bbd.co.za"
  }
}

resource "aws_route_table_association" "spidersweeper_api_association_b" {
  subnet_id      = aws_subnet.spidersweeper_api_subnet_b.id
  route_table_id = aws_route_table.spidersweeper_api_route_table_b.id
}

resource "aws_db_subnet_group" "spidersweeper_api_subnet_group" {
  name       = "spidersweeper_api_subnet_group"
  subnet_ids = [aws_subnet.spidersweeper_api_subnet_a.id, aws_subnet.spidersweeper_api_subnet_b.id]

  tags = {
    owner: "josh@bbd.co.za"
  }
}

resource "aws_iam_role" "beanstalk_ec2" {
  assume_role_policy    = "{\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"ec2.amazonaws.com\"}}],\"Version\":\"2012-10-17\"}"
  description           = "Allows EC2 instances to call AWS services on your behalf."
  force_detach_policies = false
  managed_policy_arns   = ["arn:aws:iam::aws:policy/AWSElasticBeanstalkMulticontainerDocker", "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier", "arn:aws:iam::aws:policy/AWSElasticBeanstalkWorkerTier", "arn:aws:iam::aws:policy/AWSElasticBeanstalkRoleECS", "arn:aws:iam::aws:policy/AmazonEC2FullAccess"]
  max_session_duration  = 3600
  name                  = "aws-elasticbeanstalk-ec2"
  path                  = "/"
}

resource "aws_iam_instance_profile" "beanstalk_ec2" {
  name = "aws-spidersweeper-ec2-profile"
  role = aws_iam_role.beanstalk_ec2.name
}

resource "aws_security_group" "spidersweeper_api_security_group" {
  vpc_id = aws_vpc.spidersweeper_api_vpc.id

  tags = {
    owner: "josh@bbd.co.za"
  }
}

resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv4" {
  security_group_id = aws_security_group.spidersweeper_api_security_group.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # semantically equivalent to all ports
}

resource "aws_vpc_security_group_ingress_rule" "allow_tls_ipv4" {
  security_group_id = aws_security_group.spidersweeper_api_security_group.id
  cidr_ipv4         = aws_vpc.spidersweeper_api_vpc.cidr_block
  from_port         = 443
  ip_protocol       = "tcp"
  to_port           = 443
}

# S3 bucket to store jar
resource "aws_s3_bucket" "beanstalk_bucket" {
  bucket = "spider-sweeper-beanstalk"
}

# add jar to bucket
resource "aws_s3_object" "app_nodejs" {
  bucket = aws_s3_bucket.beanstalk_bucket.id
  key    = "apis.zip"
  source = "../release/apis.zip"
  etag = filemd5("../release/apis.zip")
  depends_on = [aws_s3_bucket.beanstalk_bucket]
}

# create app
resource "aws_elastic_beanstalk_application" "app" {
  name        = "spidersweeper-api"
  description = "spidersweeper API"
}

resource "aws_elastic_beanstalk_environment" "production_environment" {
  name        = "production"
  application = aws_elastic_beanstalk_application.app.name
  solution_stack_name = "64bit Amazon Linux 2023 v6.1.4 running Node.js 20"

  setting {
    namespace = "aws:ec2:vpc"
    name      = "VPCId"
    value     = aws_vpc.spidersweeper_api_vpc.id
  }

  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MinSize"
    value     = "1"
  }

  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MaxSize"
    value     = "3"
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = "LoadBalanced"
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "Subnets"
    value     = join(",", aws_db_subnet_group.spidersweeper_api_subnet_group.subnet_ids)
  }

  setting {
    namespace = "aws:elasticbeanstalk:command"
    name      = "IgnoreHealthCheck"
    value     = "true"
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = aws_iam_instance_profile.beanstalk_ec2.name
  }

  setting {
    namespace   = "aws:elasticbeanstalk:application:environment"
    name        = "db_username"
    value       = var.db_username
  }

  setting {
    namespace   = "aws:elasticbeanstalk:application:environment"
    name        = "db_password"
    value       = var.db_password
  }
}