import type {ReactElement} from 'react';
import React from 'react';

import App from './src/App';
import {ThemeProvider} from 'dooboo-ui';

const Root = (): ReactElement => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default Root;
