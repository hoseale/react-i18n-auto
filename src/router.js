import React from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Loadable from 'react-loadable';
import { isEmpty } from 'lodash';

function loadCom(view, mod) {
  return Loadable.Map({
    loader: {
      Component: view,
      store: mod,
    },
    loading: () => <div>loading</div>,
    render(loaded, props) {
      let Component = loaded.Component.default;
      let Store = loaded.store.default;
      console.log(Store, 'loaded.store')
      return <Component {...props} store={ new Store() } cc={333} />;
    },
  });
}


const routes = [
  {
    path: '/',
    component: ({children}) => <div>{children}</div>,
    mod: '',
    redirect: '/home',
    child: [
      {
        path: '/home',
        component: loadCom(() => import('pages/home/homeView'), () => import('pages/home/homeMod')),
        mod: '',
      },
      {
        path: '/demo',
        component: loadCom(() => import('pages/demo/demoView'), () => import('pages/demo/demoMod')),
        mod: '',
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