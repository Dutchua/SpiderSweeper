variable "aws_region" {
  description = "Region of resources"
  type = string
  sensitive = true
  default = "eu-west-1"
}
variable "access_key" {}
variable "secret_key" {}
variable "db_username" {}
variable "db_password" {}
variable "ssh_private_key" {}