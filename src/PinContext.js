import { createContext } from 'react';

const PinContext = createContext({
  draft: null,
  pins: [],
  currentPin: null
});

export default PinContext;
