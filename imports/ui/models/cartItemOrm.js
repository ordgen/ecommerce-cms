import { ORM } from 'redux-orm';
import CartItem from './CartItem';

const orm = new ORM();
orm.register(CartItem);

export default orm;
