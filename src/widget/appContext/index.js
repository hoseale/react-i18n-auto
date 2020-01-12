import React from 'react';
import 'moment/locale/zh-cn';
import moment from 'moment';
import AppLayout from '../appLayout'
import { ConfigProvider } from 'antd';
import loadable from '@loadable/component';
import { I18n, getLang, handleMsg } from 'config/i18n';

const lang = getLang();
moment.locale('zh-cn');

const messages = {
  zh_CN: () => Promise.all([
    import(/* webpackChunkName: 'zh_CN' */'antd/es/locale/zh_CN'), 
    import(/* webpackChunkName: 'zh_CN' */'locales/zh_CN' )
  ]),
  en_US: () => Promise.all([
    import(/* webpackChunkName: 'en_US' */'antd/es/locale/en_US'), 
    import(/* webpackChunkName: 'en_US' */'locales/en_US')
  ]) 
}
const Msg = loadable.lib(messages[lang]); // 语言文件按需加载

export default () => {
  return (
    <Msg>
      { ([antdMsg, selfMsg]) => {
        I18n._init({
          locale: 'zh',
          messages: handleMsg(selfMsg.default)
        });
        return (
          <ConfigProvider locale={antdMsg.default}>
            <AppLayout/>
          </ConfigProvider>
        )
      }}
    </Msg>
  )
}

