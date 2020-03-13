import * as actionTypes from '../actions/actionTypes';

const initialState = {
  participants: [{
    name: '',
    email: ''
  }]
};

const setParticipants = (state, action) => {
  if (action.type === actionTypes.SET_PARTICIPANTS){
    return {
      ...state,
      participants: action.particips
    }
  }
  return state;
};

const addParticipant = (state, action) => {
  if (action.type === actionTypes.ADD_PARTICIPANT){
    return {
      ...state,
      participants: state.participants.concat(action.blankParticipant)
    }
  }
  return state;
}

const removeParticipant = (state, action) => {
  if (action.type === actionTypes.REMOVE_PARTICIPANT){
    const updatedArray = state.participants.filter((p, pindex) => action.index !== pindex);
    return {
      ...state,
      participants: updatedArray
    }
  }
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.SET_PARTICIPANTS: return setParticipants( state, action );
    case actionTypes.ADD_PARTICIPANT: return addParticipant( state, action );
    case actionTypes.REMOVE_PARTICIPANT: return removeParticipant( state, action );
    default: return state;
  }
};

export default reducer;