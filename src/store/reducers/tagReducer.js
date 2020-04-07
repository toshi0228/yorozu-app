import _ from 'lodash';
import Tag from '../../models/tag';
import { READ_TAG_EVENTS } from '../actionTypes';

const DEFAULT_STATE = {};
// const DEFAULT_STATE = {
//   ...new Tag({})
// };

const tagReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case READ_TAG_EVENTS:
      // keyとidの値が同じオブジェクトを返す
      return _.mapKeys(action.payload, 'id');
    default:
      return state;
  }
};

export default tagReducer;

// =====================================================================================
// ロダッシュによって、keyとidを同じにする
// _.mapKeys(action.payload, 'id')

// ※※※変更前
// {
//   0: {id: 1, name: "記念日"},
//   1: {id: 2, name: "インスターグラマー"},
//   2: {id: 3, name: "企画"},
// }

// ※※※変更後
// {
//   1: {id: 1, name: "記念日"},
//   2: {id: 2, name: "インスターグラマー"},
//   3: {id: 3, name: "企画"},
// }
// =====================================================================================
