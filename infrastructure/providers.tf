variable "ACCESS_KEY" {}
variable "SECRET_KEY" {}

provider "aws" {
  region = "eu-west-1"
  ACCESS_KEY = var.ACCESS_KEY
  SECRET_KEY = var.SECRET_KEY
}