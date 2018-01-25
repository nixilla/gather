module "rds" {
  source = "git@github.com:eHealthAfrica/ehealth-deployment.git//terraform//modules//rds"
  project = "${var.project}"
  environment = "${var.environment}"
  project_billing_id = "${var.project_billing_id}"
  cluster_name = "ehealth-africa-prod"
}

module "gather" {
  source = "git@github.com:eHealthAfrica/ehealth-deployment.git//terraform//modules//generic_ecs_service"
  environment = "${var.environment}"
  project = "${var.project}"
  database_hostname = "${module.rds.database_hostname}"
  app = "gather"
  application_memory = 512
  http_rule_priority = 222 
  domain = "gather2"
}
