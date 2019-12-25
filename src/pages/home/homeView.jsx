import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';

const View = (props) => {
  console.log(props, 'props')
  const { store } = props;
  useEffect(() => {
    store.getData();
  },[])
  const { state: { list } } = store
  return (
    <div style={{padding: 50}}>
      {store.count} <br/>
      <Button size='small' onClick={() => { store.decrement() }}>删除</Button>
      <Button size='small' type='primary' onClick={() => { store.increment() }}>增加</Button>
      {
        list.map(item => {
          return <p>{item}</p>
        })
      }
    </div>
  ) 
}

export default observer(View)
