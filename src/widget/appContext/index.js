import React from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import AppLayout from '../appLayout'
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
moment.locale('zh-cn');

const message = require('locales/zh-CN/common.json');

export default () => {
  return (
    <ConfigProvider locale={zhCN}>
      <IntlProvider locale="zh-CN" messages={message}>
        <AppLayout/>
      </IntlProvider>
    </ConfigProvider>
  )
}

