import * as actionTypes from '../actions/actionTypes';

const initialState = {
  formIsValid: false
}

const setFormValidity = ( state, action ) => {
  if (action.type === actionTypes.CHECK_FORM_VALIDITY){
    return {
      ...state,
      formIsValid: action.v
    }
  }
}

const reducer = (state = initialState, action) => {
  switch ( action.type ) {
    case actionTypes.CHECK_FORM_VALIDITY: return setFormValidity(state, action);
    default: return state;
  }
}

export default reducer;