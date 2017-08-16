import { Meteor } from 'meteor/meteor';
import { REHYDRATE } from 'redux-persist/constants'
import {
  ADD_PRODUCT,
  ADD_PRODUCT_TO_CATEGORY,
  UPDATE_PRODUCT_CATEGORY,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_PRODUCT_CATEGORY,
  REMOVE_PRODUCT_CATEGORY,
  ADD_SLIDER_IMAGE,
  REMOVE_SLIDER_IMAGE,
  UPDATE_SLIDER_IMAGE,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM,
  ADD_ORDER,
  REMOVE_ORDER,
  UPDATE_ORDER,
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
  const { Product, ProductCategory, SliderImage, CartItem, Order } = sess;
  const { payload, type } = action;
  switch (type) {
    case ADD_PRODUCT:
      Product.create(payload);
      break;
    case UPDATE_PRODUCT: {
      const prevParent = ProductCategory.all().toRefArray().find(
        category => !!ProductCategory.withId(category.id).products.toRefArray().find(
          p => p.id === payload.id,
        ),
      );
      if (prevParent && payload.productCategoryId !== prevParent.id) {
        ProductCategory.withId(prevParent.id).products.remove(payload.id);
        ProductCategory.withId(payload.productCategoryId).products.add(payload.id);
      }
      Product.withId(payload.id).update(payload);
      break;
    }
    case REHYDRATE:
      console.log(payload);
      break;
    case ADD_PRODUCT_TO_CATEGORY:
      ProductCategory.withId(action.payload.categoryId).products.add(action.payload.productId);
      break;
    case REMOVE_PRODUCT:
      Product.withId(payload.id).delete();
      break;
    case ADD_PRODUCT_CATEGORY:
      ProductCategory.create(payload);
      break;
    case REMOVE_PRODUCT_CATEGORY:
      ProductCategory.withId(payload.id).products.delete();
      ProductCategory.withId(payload.id).delete();
      break;
    case UPDATE_PRODUCT_CATEGORY:
      ProductCategory.withId(payload.id).update(payload);
      break;
    case ADD_SLIDER_IMAGE:
      SliderImage.create(payload);
      break;
    case REMOVE_SLIDER_IMAGE:
      SliderImage.withId(payload.id).delete();
      break;
    case UPDATE_SLIDER_IMAGE:
      SliderImage.withId(payload.id).update(payload);
      break;
    case ADD_CART_ITEM:
      CartItem.create(payload);
      break;
    case REMOVE_CART_ITEM:
      CartItem.withId(payload.id).delete();
      break;
    case UPDATE_CART_ITEM:
      CartItem.withId(payload.id).update(payload);
      break;
    case ADD_ORDER:
      Order.create(payload);
      CartItem.all().toModelArray().forEach(item => item.delete());
      break;
    case REMOVE_ORDER:
      Order.withId(payload.id).delete();
      break;
    case UPDATE_ORDER:
      Order.withId(payload.id).update(payload);
      break;
    default:
      break;
  }

  /* the state property of Session always points to the current database.
  Updates don't mutate the original state, so this reference is not
  equal to `dbState` that was an argument to this reducer. */
  return sess.state;
}
