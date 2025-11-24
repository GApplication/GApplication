import type { JSX } from 'react';

import EventMap from './event';

const SetPage = (Component: JSX.Element) =>
{
    EventMap.Emit('App.Page', Component);
};

export default { SetPage };
