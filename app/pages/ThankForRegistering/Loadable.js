import Loadable from 'react-loadable';
import React from 'react';
import PageLoading from 'components/PageLoading';

export default Loadable({
  loader: () => import('./ThankForRegistering'),
  loading: () => <PageLoading />,
});
