import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import Navigation from '.';

it('should render Navigation', () => {
  render(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>,
  );
  screen.getByText('HOME');
  screen.getByText('COUNT');
});
