import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from '../../ui/store';
import { fetchAndCreateProductCategories } from '../../ui/actions/action-creators/ProductCategories';
import { fetchAndCreateProducts } from '../../ui/actions/action-creators/Products';
import App from '../../ui/App';

Meteor.startup(() => {
  store.dispatch(fetchAndCreateProductCategories());
  store.dispatch(fetchAndCreateProducts());
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <App />
        </div>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('react-root'),
  );
});
