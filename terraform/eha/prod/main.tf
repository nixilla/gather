module "rds" {
  source = "git@github.com:eHealthAfrica/ehealth-deployment.git//terraform//modules//rds"
  project = "${var.project}"
  environment = "${var.environment}"
  project_billing_id = "${var.project_billing_id}"
  cluster_name = "ehealth-africa-prod"
}

module "odk" {
  source = "git@github.com:eHealthAfrica/ehealth-deployment.git//terraform//modules//generic_ecs_service"
  environment = "${var.environment}"
  project = "${var.project}"
  database_hostname = "${module.rds.database_hostname}"
  app = "odk-importer"
  application_memory = 512
  http_rule_priority = 11
  domain = "gather2"
}

module "core" {
  source = "git@github.com:eHealthAfrica/ehealth-deployment.git//terraform//modules//generic_ecs_service"
  environment = "${var.environment}"
  project = "${var.project}"
  database_hostname = "${module.rds.database_hostname}"
  app = "core"
  application_memory = 512
  http_rule_priority = 12 
  domain = "gather2"
}

module "ui" {
  source = "git@github.com:eHealthAfrica/ehealth-deployment.git//terraform//modules//generic_ecs_service"
  environment = "${var.environment}"
  project = "${var.project}"
  database_hostname = "${module.rds.database_hostname}"
  app = "ui"
  application_memory = 512
  http_rule_priority = 14 
  domain = "gather2"
}
