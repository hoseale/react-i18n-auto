import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';


const View = (props) => {
  console.log(props,'props')
  const { store } = props;
  // useEffect(() => {
  //   store.increment();
  //   return () => {

  //   }
  // })
  return (
    <div>
      {store.count} <br/>
      <Button size='small' type='primary' onClick={() => { store.increment() }}>增加</Button>
    </div>
  ) 
}

export default observer(View)
