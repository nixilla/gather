import { getSurveysPath } from './utils/paths'

/*
This is the home app -> skip welcome screen and go straight to list of surveys
*/

window.location = getSurveysPath({})
