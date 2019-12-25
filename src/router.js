import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import loadable from '@loadable/component'
import { isEmpty } from 'lodash';

// 视图文件、store文件代码分割
function loadCom({ view, mod }) {
  const View = loadable(view);
  const Mod = loadable.lib(mod);
  return (props) => <Mod>
    {({ default: Store }) => <View {...props} store={ new Store() } /> }
  </Mod>
}

const routes = [
  {
    path: '/',
    component: ({children}) => <div>{children}</div>,
    redirect: '/home',
    child: [
      {
        path: '/home',
        component: loadCom( {
          view: () => import(/* webpackChunkName: 'homeView' */'pages/home/homeView'),
          mod: () => import(/* webpackChunkName: 'homeMod' */'pages/home/homeMod')
        })
      },
      {
        path: '/demo',
        component: loadCom({
          view: () => import(/*webpackChunkName: 'demoView' */'pages/demo/demoView'),
          mod: () => import(/*webpackChunkName: 'demoMod' */'pages/demo/demoMod')
        })
      }
    ]
  }
]

function createRoutes(routes) {
  return routes.map(item => {
    if (!isEmpty(item.child)) {
      const Layout = item.component;
      return <Layout>
        <Switch>
          { createRoutes(item.child) }
          <Redirect to={item.redirect}/>
        </Switch>
      </Layout>
    }
    return (
      <Route exact path={item.path} component={item.component} />
    )
  })
}

export default createRoutes(routes);