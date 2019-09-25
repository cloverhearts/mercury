import LANGUAGE from '../../Languages/Types'

import javascriptTemplate from './Languages/javascript'

export default (language, id, code, initializeObject) => {
  switch (language) {
    case LANGUAGE.JAVASCRIPT:
    default:
      return javascriptTemplate(id, code, initializeObject)
  }
}
