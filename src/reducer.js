export default function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_DRAFT':
      return {
        ...state,
        draft: {
          latitude: 0,
          longitude: 0
        }
      };
    case 'DELETE_DRAFT':
      return {
        ...state,
        draft: null
      };
    case 'UPDATE_DRAFT_LOCATION':
      return {
        ...state,
        draft: action.payload
      };
    case 'SET_PINS':
      return {
        ...state,
        pins: action.payload
      };
    default:
      return state;
  }
}
