import {
  GET_TRANSFERS_FAILED,
  GET_TRANSFERS_FETCHING,
  GET_TRANSFERS_SUCCEED,
  TRANSFER_FAILED,
  TRANSFER_FETCHING,
  TRANSFER_SUCCEED
} from "../actions/types";

const INITIAL_STATE = {
  received: [],
  sent: [],
  pending: [],
  isFetching: false,
  error: {},
  isEmpty: true
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_TRANSFERS_FETCHING:
      return { ...state, isFetching: true };
    case GET_TRANSFERS_SUCCEED:
      return {
        ...action.payload,
        isFetching: false,
        error: "",
        isEmpty: false
      };
    case GET_TRANSFERS_FAILED:
      return { ...state, error: action.payload, isFetching: false };
    default:
      return state;
  }
}
