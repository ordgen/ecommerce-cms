import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Route } from 'react-router-dom';
import Home from './containers/home/Home';
import ContactUs from './containers/contact-us';
import Login from './containers/login/Login';
import AboutUs from './containers/about-us';
import Dashboard from './containers/dashboard/Dashboard';
import ThemeDefault from './theme-default';
import Logout from './containers/logout';
import Authenticated from './components/pages/Authenticated';
import CategoryProductsView from './containers/CategoryProductsView';
import ProductView from './containers/ProductView';
import OrderSummary from './containers/order-summary/OrderSummary';

injectTapEventPlugin();

const App = () => (
  <div>
    <MuiThemeProvider muiTheme={ThemeDefault}>
      <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/contact-us" component={ContactUs} />
        <Route exact path="/category/:categoryId/products" component={CategoryProductsView} />
        <Route exact path="/product/:productId" component={ProductView} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route exact path="/order-summary" component={OrderSummary} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Authenticated path="/dashboard" component={Dashboard} />
      </main>
    </MuiThemeProvider>
  </div>
);

export default App;

