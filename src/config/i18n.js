import { createIntl, createIntlCache } from 'react-intl'

const cache = createIntlCache();
const intl = createIntl({
  locale: 'zh',
  messages: {
    hello: 'sad dfsdf gdfg',
    'aa.bb': '呵呵'
  }
}, cache);

function ts(id, vals={}) {
  return intl.formatMessage({id}, vals)
}

export default ts 