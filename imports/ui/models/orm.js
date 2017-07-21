import { ORM } from 'redux-orm';
import User from './User';
import Product from './Product';
import ProductCategory from './ProductCategory';

const orm = new ORM();
orm.register(Product, ProductCategory, User);

export default orm;
