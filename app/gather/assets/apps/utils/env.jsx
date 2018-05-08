// takes enabled modules from the environment variable
export const ODK_ACTIVE = ((process.env.AETHER_MODULES || '').split(',').indexOf('odk') > -1)

// these are used to export the responses as a CSV file using the CustomCSVRenderer
export const CSV_HEADER_RULES = process.env.CSV_HEADER_RULES
export const CSV_HEADER_RULES_SEP = process.env.CSV_HEADER_RULES_SEP

// needed to create the links to external modules
export const AETHER_KERNEL_URL = process.env.AETHER_KERNEL_URL
export const AETHER_ODK_URL = ODK_ACTIVE ? process.env.AETHER_ODK_URL : null
