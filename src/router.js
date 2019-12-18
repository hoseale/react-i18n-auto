import React from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Loadable from 'react-loadable';
import { isEmpty } from 'lodash';
import HomeView  from 'pages/home/homeView';
import DemoView  from 'pages/demo/demoView';


function loadCom(view, Mod) {
  return Loadable.Map({
    loader: {
      Component: view,
      store: () => Promise.resolve('asd'),
    },
    loading: () => <div>loading</div>,
    render(loaded, props) {
      let Component = loaded.Component.default;
      let store = loaded.store.default;;
      return <Component {...props}  store={store} />;
    },
  });
}


const routes = [
  {
    path: '/',
    component: ({children}) => <div>{children}</div>,
    mod: '',
    child: [
      {
        path: '/home',
        component: loadCom(() => import('pages/home/homeView')),
        mod: '',
      },
      {
        path: '/demo',
        component: loadCom(() => import('pages/demo/demoView')),
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
          <Redirect to={item.child[0].path}/>
        </Switch>
      </Layout>
    }
    return (
      <Route exact path={item.path} component={item.component} />
    )
  })
}

export default createRoutes(routes);