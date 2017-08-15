import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from '../../ui/store';
import loadScript from './loadScript';
import App from '../../ui/App';

Meteor.startup(() => {
  const url = `https://maps.googleapis.com/maps/api/js?key=${Meteor.settings.public.GOOGLE_MAPS_API_KEY}&libraries=places,geometry`; //eslint-disable-line
  loadScript(url, () => {
    console.log('script has loaded');
  });
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
