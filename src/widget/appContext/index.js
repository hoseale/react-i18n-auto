import React from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import AppLayout from '../appLayout'
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
import { _I18n } from 'config/i18n';
moment.locale('zh-cn');
_I18n.init({
  locale: 'zh',
  messages: {
    hello: 'sad dfsdf gdfg',
    'aa.bb': '呵呵'
  }
})
export default () => {
  return (
    <ConfigProvider locale={zhCN}>
      <AppLayout/>
    </ConfigProvider>
  )
}

