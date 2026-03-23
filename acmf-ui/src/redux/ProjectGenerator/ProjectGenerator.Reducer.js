import { PROJECT_REQUEST, PROJECT_SUCCESS, PROJECT_FAILURE } from './ActionTypes';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const GenerateProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, 
      };
    default:
      return state;
  }
};

export default GenerateProjectReducer;
