import { ORM } from 'redux-orm';
import User from './User';
import Product from './Product';
import ProductCategory from './ProductCategory';
import SliderImage from './SliderImage';

const orm = new ORM();
orm.register(Product, ProductCategory, User, SliderImage);

export default orm;
