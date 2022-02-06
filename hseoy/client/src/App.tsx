import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import Uri from './constants/uri';
import HomePage from './pages/HomePage';

const App: FC = () => {
  return (
    <Switch>
      <Route path={Uri.home} exact component={HomePage} />
    </Switch>
  );
};

export default App;
