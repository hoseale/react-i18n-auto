import React, { Suspense } from 'react'
import { FormattedMessage } from 'react-intl';
import {
  HashRouter as Router,
  Switch,
} from "react-router-dom";
import routes from '../../router';

export default (props) => {
  console.log(props, 'props')
  return <Router>
    <Switch>
      {routes}
    </Switch>
  </Router>
}