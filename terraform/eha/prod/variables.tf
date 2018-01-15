variable "environment" { default = "prod" }
variable "project" { default = "eha" }
variable "project_billing_id" { default = "internal" }
variable "aws_region" { default = "eu-west-1" }

# RDS
variable "db_engine_type" { default="postgres" }
variable "db_engine_version" { default="9.5.4" }
