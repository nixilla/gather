variable "environment" { default = "prod" }
variable "project" { default = "aether" }
variable "aws_region" { default = "eu-west-1" }
variable "project_billing_id" { default = "internal" }

# RDS
variable "db_engine_type" { default="postgres" }
variable "db_engine_version" { default="9.5.4" }
