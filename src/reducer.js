export default function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_DRAFT':
      return {
        ...state,
        draft: {
          latitude: 0,
          longitude: 0
        },
        currentPin: null
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
    case 'CURRENT_PIN':
      return {
        ...state,
        currentPin: action.payload,
        draft: null
      };
    case 'DELETE_PIN':
      return {
        ...state,
        currentPin: null
      };
    case 'EDIT_MODE':
      return {
        ...state,
        editMode: true
      };
    case 'UPDATE_PIN':
      return {
        ...state,
        editMode: false,
        currentPin: null
      };
    case 'CANCEL_EDIT':
      return {
        ...state,
        editMode: false,
        currentPin: null
      };
    default:
      return state;
  }
}
