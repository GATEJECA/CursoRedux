import schema from '../schemas/index.js';
import { fromJS } from 'immutable';
import { SEARCH_VIDEO } from '../actions-types/index';

const initialState = fromJS({
  entities: schema.entities,
  categories: schema.result.categories,
  search: '',
})



function data(state = initialState, action) {
  switch (action.type) {
    case SEARCH_VIDEO: {
      return state.set('search', action.payload.query)
    }
    default:
      return state
  }
}

export default data;
