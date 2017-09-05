import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM,
} from '../actions/types';
import orm from '../models/cartItemOrm';

function createInitialState() {
  const session = orm.session(orm.getEmptyState());
  const newState = session.state;
  return newState;
}

const initialState = createInitialState();


export default function cartItemReducer(dbState = initialState, action) {
  const sess = orm.session(dbState);

  /* Session-specific Models are available
  as properties on the Session instance. */
  const { CartItem } = sess;
  const { payload, type } = action;
  switch (type) {
    case ADD_CART_ITEM:
      CartItem.create(payload);
      break;
    case REMOVE_CART_ITEM:
      CartItem.withId(payload.id).delete();
      break;
    case UPDATE_CART_ITEM:
      CartItem.withId(payload.id).update(payload);
      break;
    default:
      break;
  }

  /* the state property of Session always points to the current database.
  Updates don't mutate the original state, so this reference is not
  equal to `dbState` that was an argument to this reducer. */
  return sess.state;
}
