import _ from 'lodash';
import { ActionTypes, PayloadStates, payloadCollection, normalize } from 'lore-utils';
/*
 * Blueprint for Find method
 */

export default function find(query = {}, pagination) {
  return function(dispatch) {
    const Collection = lore.collections.<%= modelName %>;
    const collection = new Collection();

    const queryParameters = _.extend({}, query, pagination);

    const combinedQuery = {
      where: query,
      pagination: pagination
    };

    collection.fetch({
      data: queryParameters
    }).then(function() {
      // look through all models in the collection and generate actions for any attributes
      // with nested data that should be normalized
      const actions = normalize(lore, '<%= modelName %>').collection(collection);

      dispatch({
        type: ActionTypes.fetchPlural('<%= modelName %>'),
        payload: payloadCollection(collection, PayloadStates.RESOLVED, null, combinedQuery),
        query: combinedQuery
      });

      // dispatch any actions created from normalizing nested data
      actions.forEach(dispatch);
    }).catch(function(response) {
      const error = response.data;

      dispatch({
        type: ActionTypes.fetchPlural('<%= modelName %>'),
        payload: payloadCollection(collection, PayloadStates.ERROR_FETCHING, error, combinedQuery),
        query: combinedQuery
      });
    });

    return dispatch({
      type: ActionTypes.fetchPlural('<%= modelName %>'),
      payload: payloadCollection(collection, PayloadStates.FETCHING, null, combinedQuery),
      query: combinedQuery
    });
  };
};
