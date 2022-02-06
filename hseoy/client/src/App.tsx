import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { css } from '@emotion/react';

import Navigation from './components/Navigation';
import Uri from './constants/uri';
import CountPage from './pages/CountPage';
import HomePage from './pages/HomePage';

const appTitleStyle = css`
  color: red;
`;

const App: FC = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <h1 css={appTitleStyle}>Hello Hello</h1>
        <div>
          <Navigation />
        </div>
        <div>
          <Switch>
            <Route path={Uri.home} exact component={HomePage} />
            <Route path={Uri.count} exact component={CountPage} />
          </Switch>
        </div>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
