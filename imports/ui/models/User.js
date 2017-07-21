import { Model } from 'redux-orm';
import propTypesMixin from 'redux-orm-proptypes';

const ValidatingModel = propTypesMixin(Model);

export default class User extends ValidatingModel {}
User.modelName = 'User';

