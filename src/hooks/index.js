import { useState, useEffect } from 'react';

/**
 * 保存current、pageSize状态；观察total状态
 * @param {object} defaultPageOpts pagination配置项
 * 
 */
function usePage(defaultPageOpts={}) {
  const pagination = {
    current:1,
    pageSize: 2,
    total: 0
  }
  const [defaultPage, setPage]= useState(() => Object.assign(pagination, defaultPageOpts));
  useEffect(() => {
    setPage({...defaultPage, total: defaultPageOpts.total})
  }, [defaultPageOpts.total])
  return [defaultPage, setPage];
}

export { usePage }
