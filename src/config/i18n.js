import { createIntl, createIntlCache } from 'react-intl'

class Intl{
  _init(opts) {
    const cache = createIntlCache();
    const intl = createIntl(opts, cache);
    Object.assign(this, intl)
  }
}

const I18n = new Intl();

function ts(id, vals={}) {
  return I18n.formatMessage({id}, vals)
}

export { I18n }

export default ts
