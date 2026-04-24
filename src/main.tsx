import { DevSupport } from '@react-buddy/ide-toolbox';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app';
import './index.css';
import { ComponentPreviews, useInitial } from './dev';
import { enableMocking } from './testing/mocks';

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <DevSupport ComponentPreviews={ComponentPreviews} useInitial={useInitial}>
        <App />
      </DevSupport>
    </React.StrictMode>,
  );
});
