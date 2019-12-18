import React from 'react'
import { FormattedMessage } from 'react-intl';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import routes from '../../router';
import HomeView  from 'pages/home/homeView';
import DemoView  from 'pages/demo/demoView';
console.log(routes)

export default (props) => {
  console.log(props, 'props')
  return <Router>
    <Switch>
      {/* <Route exact path='/home' component={HomeView} /> */}
      {/* <Route exact path='/demo' component={DemoView} /> */}
      {routes}
    </Switch>
  </Router>
}