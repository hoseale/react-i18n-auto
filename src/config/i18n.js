import { createIntl, createIntlCache } from 'react-intl'

class I18n{
  init(opts) {
    const cache = createIntlCache();
    const intl = createIntl(opts, cache);
    this.intl = intl
  }

  ts(id, vals={}) {
    return this.intl.formatMessage({id}, vals)
  }
}

const _I18n = new I18n();

function ts(id, vals={}) {
  return _I18n.ts(id, vals={})
}

export { _I18n }

export default ts
