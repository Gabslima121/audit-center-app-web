import get from 'lodash/get'

import pt from '../assets/data/locales/pt'

export default function translate(id?: string, defaultMessage?: string) {
  return get(pt, `${id}`, defaultMessage)
}
