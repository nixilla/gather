export const ODK_ACTIVE = (process.env.AETHER_MODULES.indexOf('odk') > -1)

export const CSV_HEADER_RULES = process.env.CSV_HEADER_RULES || ''
export const CSV_HEADER_RULES_SEP = process.env.CSV_HEADER_RULES_SEP || ':'
