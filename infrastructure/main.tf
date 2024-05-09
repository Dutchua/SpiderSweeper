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

variable "service_name" {
  type    = string
  default = "nodejs-app-this-will-probs"
}

variable "service_description" {
  type    = string
  default = "My awesome nodeJs App"
}

resource "aws_elastic_beanstalk_application" "eb_app" {
  name        = var.service_name
  description = var.service_description
}

resource "aws_elastic_beanstalk_application_version" "app_version" {
  name                = "v1.0.0"  # Name of your application version
  application         = aws_elastic_beanstalk_application.eb_app.name
  description         = "First version of my application"
  bucket              =  data.aws_s3_bucket.existing_bucket.bucket # Bucket where your application code is stored
  key                 = "apis.zip"  # Path to your application code package
  force_delete        = true  # Optional: Forces deletion of the application version if it's already deployed
}

resource "aws_elastic_beanstalk_environment" "eb_env" {
  name                = "${var.service_name}-env"
  application         = aws_elastic_beanstalk_application.eb_app.name
  solution_stack_name = "64bit Amazon Linux 2023 v6.1.4 running Node.js 20"

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "db_username"
    value     = var.db_username
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "db_password"
    value     = var.db_password
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "db_instance_name"
    value     = var.db_instance_name
  }

  depends_on = [aws_elastic_beanstalk_application_version.app_version]
}
