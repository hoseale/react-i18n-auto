import React, { useEffect } from 'react';
import { Table } from 'antd';
import { observer } from 'mobx-react';
import { usePage } from 'hooks';

const View = (props) => {
  const { store } = props;
  const { state: { list, total } } = store;
  
  useEffect(() => {
    store.getData();
  },[])
  
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
      <hr/>
      <Table
        dataSource={list}
        pagination={{
          ...pageConf
        }}
        onChange={(pagination, filters, sorter) => { store.getData(pagination.current); setPage(pagination);} }
        columns={columns}
      />
    </div>
  ) 
}


export default observer(View)
