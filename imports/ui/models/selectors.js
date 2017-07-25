import { createSelector } from 'redux-orm';
import orm from './orm';

const userSelector = createSelector(
  orm,
  state => state.entities,
  session => session.User.all().toRefArray(),
);

export { userSelector };
