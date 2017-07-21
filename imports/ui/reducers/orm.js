import { createReducer } from 'redux-orm';
import orm from '../models/orm';

const ormReducer = createReducer(orm);

export default ormReducer;
