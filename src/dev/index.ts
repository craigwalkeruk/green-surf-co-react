import React from 'react';

import { useInitial } from './use-initial';

const ComponentPreviews = React.lazy(() => import('./previews'));

export { ComponentPreviews, useInitial };
