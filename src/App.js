import * as React from 'react';
import { Route, Switch, Redirect} from 'wouter';
import Index from '../src/Index/index';
import Home from '../src/Home/home';

const App = () => (
  <Switch>
    <Route path="/" component={Index} />
    <Route path="/home" component={Home} />
    <Redirect to="/home" component={Home} />
  </Switch>
);


export default App;