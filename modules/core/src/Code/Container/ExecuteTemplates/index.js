import LANGUAGE from '../../Languages/Types'

import javascriptTemplate, { CODE as JAVASCRIPT_CODE } from './Languages/javascript'

export const JAVASCRIPT_DEFAULT_CODE = JAVASCRIPT_CODE

export default (language, id, code, initializeObject) => {
  switch (language) {
    case LANGUAGE.JAVASCRIPT:
    default:
      return javascriptTemplate(id, code, initializeObject)
  }
}
