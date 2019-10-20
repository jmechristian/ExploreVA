import { createContext } from 'react';

const PinContext = createContext({
  draft: null,
  pins: [],
  currentPin: null,
  editMode: null,
  secureUrls: ['not written']
});

export default PinContext;
