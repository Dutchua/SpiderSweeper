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
  for_each = fileset("../client/", "**")
  key = each.value
  source = "${"../client/"}/${each.value}"
  content_type = lookup(local.mime_types, regex("\\.[^.]+$", each.value), null)
  etag = filemd5("${"../client/"}/${each.value}")

  content_disposition = null
}