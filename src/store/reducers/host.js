import * as actionTypes from '../actions/actionTypes';

const initialState = {
  hostName: '',
  hostEmail: ''
};

const setHostName = (state, action) => {
  if (action.type === actionTypes.HOST_NAME){
    return {
      ...state,
      hostName: action.hostName
    }
  }
  return state;
};

const setHostEmail = (state, action) => {
  if (action.type === actionTypes.HOST_EMAIL){
    return {
      ...state,
      hostEmail: action.hostEmail
    }
  }
  return state;
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.HOST_NAME: return setHostName( state, action );
    case actionTypes.HOST_EMAIL: return setHostEmail( state, action );
    default: return state;
  }
};

export default reducer;