import React, { Suspense } from 'react'
import {
  HashRouter as Router,
  Switch,
} from "react-router-dom";
import routes from '../../router';

export default (props) => {
  return <Router>
    <Switch>
      {routes}
    </Switch>
  </Router>
}