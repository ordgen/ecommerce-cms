import { Meteor } from 'meteor/meteor';
import {
  CREATE_PRODUCT,
  ADD_PRODUCT_TO_CATEGORY,
  REMOVE_PRODUCT,
  CREATE_PRODUCT_CATEGORY,
  REMOVE_PRODUCT_CATEGORY,
} from '../actions/types';
import orm from '../models/orm';

function createInitialState() {
  const session = orm.session(orm.getEmptyState());
  const { User } = session;
  User.create({ id: Meteor.userId() });
  /* Redux-ORM automatically created a new version of session.state, so we just grab it */
  const newState = session.state;
  return newState;
}

const initialState = createInitialState();

export default function ormReducer(dbState = initialState, action) {
  const sess = orm.session(dbState);

  /* Session-specific Models are available
  as properties on the Session instance. */
  const { Product, ProductCategory } = sess;
  const { payload, type } = action;
  switch (type) {
    case CREATE_PRODUCT:
      Product.create(payload);
      break;
    case ADD_PRODUCT_TO_CATEGORY:
      break;
    case REMOVE_PRODUCT:
      Product.withId(payload.id).delete();
      break;
    case CREATE_PRODUCT_CATEGORY:
      ProductCategory.create(payload);
      break;
    case REMOVE_PRODUCT_CATEGORY:
      ProductCategory.withId(payload.id).delete();
      break;
    default:
      break;
  }

  /* the state property of Session always points to the current database.
  Updates don't mutate the original state, so this reference is not
  equal to `dbState` that was an argument to this reducer. */
  return sess.state;
}
