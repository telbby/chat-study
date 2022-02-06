import React from 'react';
import { RecoilRoot } from 'recoil';

import { render, screen } from '@testing-library/react';

import CountPage from '.';

it('should render "Count"', () => {
  render(
    <RecoilRoot>
      <CountPage />
    </RecoilRoot>,
  );
  screen.getByText('Count');
});
