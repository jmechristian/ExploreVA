import { createContext } from 'react';

const PinContext = createContext({
  draft: null,
  pins: [],
  currentPin: null,
  editMode: null,
  classname: 'font-color-secondary'
});

export default PinContext;
