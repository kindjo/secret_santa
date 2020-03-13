import * as actionTypes from '../actions/actionTypes';

const initialState = {
  location: '',
  ammount: '',
  date: new Date()
};

const setDate = (state, action) => {
  if (action.type === actionTypes.DATE){
    return {
      ...state,
      date: action.date
    }
  }
  return state;
};

const setLocation = (state, action) => {
  if (action.type === actionTypes.LOCATION){
    return {
      ...state,
      location: action.location
    }
  }
  return state;
};

const setAmmount = (state, action) => {
  if (action.type === actionTypes.AMMOUNT){
    return {
      ...state,
      ammount: action.ammount
    }
  }
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.DATE: return setDate( state, action );
    case actionTypes.LOCATION: return setLocation( state, action );
    case actionTypes.AMMOUNT: return setAmmount( state, action );
    default: return state;
  }
};

export default reducer;