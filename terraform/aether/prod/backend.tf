terraform {
  backend "s3" {
        bucket = "eha-prod-state-files"
        key = "gather-on-aether-prod/terraform.tfstate"
        region = "eu-west-1"
        dynamodb_table = "gather-on-aether-prod-terraform-lock"
  }
}
