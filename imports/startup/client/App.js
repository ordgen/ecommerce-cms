import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Route } from 'react-router-dom';
import Home from '../../ui/containers/home';
import ContactUs from '../../ui/containers/contact-us';
import Login from '../../ui/containers/login';
import Dashboard from '../../ui/containers/dashboard';
import ThemeDefault from '../../ui/theme-default';
import Logout from '../../ui/containers/logout';
import Authenticated from '../../ui/components/pages/Authenticated';

injectTapEventPlugin();

const App = () => (
  <div>
    <MuiThemeProvider muiTheme={ThemeDefault}>
      <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/contact-us" component={ContactUs} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Authenticated path="/dashboard" component={Dashboard} />
      </main>
    </MuiThemeProvider>
  </div>
);

export default App;

