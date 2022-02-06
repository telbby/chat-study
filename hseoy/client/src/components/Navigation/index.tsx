import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import Uri from '@/constants/uri';

const Navigation: FC = () => {
  return (
    <>
      <Link to={Uri.home}>HOME</Link>
      <Link to={Uri.count}>COUNT</Link>
    </>
  );
};

export default Navigation;
