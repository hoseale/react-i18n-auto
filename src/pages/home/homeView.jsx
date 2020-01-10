import React, { useEffect } from 'react';
import { Table } from 'antd';
import { observer } from 'mobx-react';
import { useHistory, Link } from "react-router-dom";
import { usePage, useMount, useUnMount } from 'hooks';
import ts from 'config/i18n';

const View = (props) => {
  const { store } = props;
  const { state: { list, total } } = store;
  useMount(() => {
    store.getData();
  });
  useUnMount(() => {
    console.log(111111111111)
  })
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const [ pageConf, setPage ] = usePage({total});

  return (
    <div style={{padding: 50}}>
     
      {ts('hello')}
      {ts('aa.bb')}

      <Link to='/demo'>demo</Link>
      <hr/>
      <Table
        dataSource={list}
        pagination={{
          ...pageConf
        }}
        onChange={(pagination, filters, sorter) => { store.getData(pagination.current); setPage(pagination);} }
        columns={columns}
      />
      <a onClick={() => store.alertMsg() }>弹出消息</a>
    </div>
  ) 
}


export default observer(View)
