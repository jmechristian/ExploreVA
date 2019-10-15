import { createContext } from 'react';

const PinContext = createContext({
  draft: null,
  pins: [],
  currentPin: null,
  editMode: null
});

export default PinContext;
