import React from 'react';
import { observer } from 'mobx-react';
import { get } from 'lodash';
import { Button } from 'antd';

export default observer((props) => {
  const { store } = props;
  const { state: { count } } = store;
  return <div style={{padding: 50}}>
    {count} <br/>
    <Button size='small' onClick={() => { store.decrement() }}>删除</Button>
    <Button size='small' type='primary' onClick={() => { store.increment() }}>增加</Button>
  </div>
})