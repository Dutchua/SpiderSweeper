# SpiderSweeper

SpiderSweeper is a web-based game inspired by the classic Minesweeper but with a twist - spiders! This project is built using Node.js for the backend and HTML/CSS/JS for the frontend.

## Table of Contents

- [Deployment](#deployment)
- [Deployment](#deployment)
- [AWS Deployment](#aws-deployment)
- [Contributing](#contributing)
- [Important Links](#links)

## Deployment

1. Create PR into main.
2. GitHub workflows will run terraform infrastructure, deploy to AWS and migrate the scripts.
3. Infrastructure to deploy includes:

- Terraform - AWS
- Flyway - Database Migrations

4. To localy run terraform, please insure you have the latest Terraform CLI and AWS CLI installed.

- Initialize (Sets up files needed for terraform)
  - `terraform init`
- Plan (Creates an execution plan)
  - `terraform plan`
- Apply (Applies the execution plan)
  - `terraform apply`

## AWS Deployment

- RDS - Hosting Database
- S3 - Storage of files as well as serving static website
- Elastic Beanstalk - Hosting Backend

## Contributions

- Lucinda Jordaan (lucinda.botes@bbd.com)
- Christine Olckers (christine.olckers@bbd.com)
- Joseph Kimathi (joseph.kimathi@bbd.co.za)
- Josh Jennings (josh@bbd.co.za)

## Important Links

- [Confluence](https://bbdnet-candle-stock-system.atlassian.net/wiki/spaces/SpiderSwee/pages/26083329/SpiderSweeper+Requirements)<br>
- [Jira](https://bbdnet-candle-stock-system.atlassian.net/jira/software/projects/BGP/pages)<br>
- [Figma](https://www.figma.com/design/JfbVkpwIoqUcC7lift7pNG/SpiderSweeper?node-id=24-460&t=iokwnm8oxpOmcHfB-0)<br>
- [Spider Sweeper](http://github-oidc-terraform-aws-tfstates-bucket.s3-website-eu-west-1.amazonaws.com/index.html)
