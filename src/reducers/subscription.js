import {HANDLE_SUBSCRIBTION} from '../actions/subscription'

const initialState = {isStreamSubscribed: false}

export default (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_SUBSCRIBTION:
      return {...state, isStreamSubscribed: action.payload}
    default:
      return state
  }
}
