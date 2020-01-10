import React from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import AppLayout from '../appLayout'
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
moment.locale('zh-cn');

export default () => {
  return (
    <ConfigProvider locale={zhCN}>
      <AppLayout/>
    </ConfigProvider>
  )
}

