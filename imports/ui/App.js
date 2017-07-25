import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Route } from 'react-router-dom';
import Home from './containers/home';
import ContactUs from './containers/contact-us';
import Login from './containers/login';
import Dashboard from './containers/dashboard/Dashboard';
import ThemeDefault from './theme-default';
import Logout from './containers/logout';
import Authenticated from './components/pages/Authenticated';
import Public from './components/pages/Public';

injectTapEventPlugin();

const App = () => (
  <div>
    <MuiThemeProvider muiTheme={ThemeDefault}>
      <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/contact-us" component={ContactUs} />
        <Public exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Authenticated path="/dashboard" component={Dashboard} />
      </main>
    </MuiThemeProvider>
  </div>
);

export default App;

