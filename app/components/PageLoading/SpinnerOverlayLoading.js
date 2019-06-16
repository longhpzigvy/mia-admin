import React from 'react';
import SpinnerLoading from './SpinnerLoading';
import { SpinnerOverlayWrapperStyled } from './PageLoading.styled';

export default function SpinnerOverlayLoading() {
  return (
    <SpinnerOverlayWrapperStyled>
      <SpinnerLoading />
    </SpinnerOverlayWrapperStyled>
  );
}
