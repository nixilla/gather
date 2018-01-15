terraform {
  backend "s3" {
        bucket = "eha-prod-state-files"
        key = "eha-prod/terraform.tfstate"
        region = "eu-west-1"
        dynamodb_table = "eha-prod-terraform-lock"
  }
}
