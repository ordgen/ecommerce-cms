import { Model } from 'redux-orm';

export default class User extends Model {
  static get modelName() {
    return 'User';
  }
}
