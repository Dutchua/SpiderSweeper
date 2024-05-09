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


# Upload files to S3 bucket
resource "aws_s3_object" "existing_bucket_files" {
  for_each     = fileset("../frontend/Views/", "*")
  bucket       = data.aws_s3_bucket.existing_bucket.id
  key          = each.value
  source       = "../frontend/Views/${each.value}"
  content_type = "text/html"
}