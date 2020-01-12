import { createIntl, createIntlCache } from 'react-intl';
import Cookie from 'js-cookie';

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

const mesEnum = {
  zh_CN: 'zh_CN',
  en_US: 'en_US'
}

// 获取语言
function getLang() {
  let lang;
  const cookieLang = Cookie.get('lang');
  if (mesEnum.hasOwnProperty(cookieLang)) {
    lang = cookieLang;
  }

  return lang || systemLang()
}

// 系统语言
function systemLang() {
  let lang
  if (navigator.language.indexOf('en') > -1) {
    lang = mesEnum.en_US
  } else {
    lang = mesEnum.zh_CN
  }
  return lang
}

// 将{home:{a:'1'}}变为 {home.a: '1'}  
function handleMsg(obj) {
  let msg = {};
  (function traverse(obj, path=[]) {
    for(let o in obj) {
      if (typeof obj[o] === 'string') {
        const prePath = path.join('.');
        const key = path.length > 0 ? `${prePath}.${o}` : o;
        msg[key] = obj[o];
      } else if(typeof obj[o] === 'object') {
        traverse(obj[o], [...path, o])
      }
    }
  })(obj);
  return msg
}

export { I18n, getLang, handleMsg }

export default ts
