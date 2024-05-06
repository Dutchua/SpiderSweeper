
variable "SSH_PRIVATE_KEY" {}

resource "aws_default_vpc" "default_vpc" {
  tags = {
    Name = "default_vpc"
  }
}

data "aws_availability_zones" "available_zones" {
  
}

resource "aws_default_subnet" "subnet_az1" {
  availability_zone = data.aws_availability_zones.available_zones.names[0]
}

resource "aws_default_subnet" "subnet_az2" {
  availability_zone = data.aws_availability_zones.available_zones.names[1]
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

resource "aws_key_pair" "my_key_pair" {
  key_name   = "josh-key"
  public_key = var.SSH_PRIVATE_KEY
}

resource "aws_security_group" "allow_http" {
  name        = "allow_http"
  description = "Allow HTTP inbound traffic"
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
    ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Allow HTTP"
    owner = "josh@bbd.co.za"
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
  username               = "admin"
  password               = "supersecret"
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.allow_mssql_current.id]
  tags = {
    owner         = "josh@bbd.co.za"
    created-using = "terraform"
  }
}

  resource "aws_s3_bucket" "static_files_bucket" {
  bucket = "thisstatic-bucket"
  acl    = "private"

  tags = {
    Name = "Static Files Bucket"
    }
  }

  resource "aws_instance" "web_server" {
  ami           = "ami-04e2e94de097d3986" 
  instance_type = "t2.micro"
  subnet_id     = aws_default_subnet.subnet_az1.id
  key_name      = aws_key_pair.my_key_pair.key_name 

  security_groups = [aws_security_group.allow_http.id]

  tags = {
    Name = "Web Server Instance"
  }
}