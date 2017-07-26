import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from '../../ui/store';
import { createProductCategory } from '../../ui/actions/ProductCategoryActionCreators';
import { createProduct } from '../../ui/actions/ProductActionCreators';
import App from '../../ui/App';

Meteor.startup(() => {
  Meteor.call('ProductCategories.methods.getAllProductCategories',
    (err, res) => {
      if (!err) {
        res.forEach(category =>
          store.dispatch(createProductCategory({
            id: category._id, // eslint-disable-line no-underscore-dangle
            name: category.name,
            parent: category.parent,
          }, false)),
        );
      } else {
        console.log(err);
      }
    },
  );
  Meteor.call('Products.methods.getAllProducts',
    (err, res) => {
      if (!err) {
        res.forEach(product =>
          store.dispatch(createProduct({
            id: product._id, // eslint-disable-line no-underscore-dangle
            name: product.name,
            price: product.price,
            pictures: product.pictures,
            category: product.productCategoryId,
          }, false)),
        );
      } else {
        console.log(err);
      }
    },
  );
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
