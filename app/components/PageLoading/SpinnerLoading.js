import React from 'react';
import { SpinnerWrapperStyled } from './PageLoading.styled';

export default function SpinnerLoading() {
  return (
    <SpinnerWrapperStyled className="spinner-container">
      <div className="main-circle" />
      <div className="sub-circle" />
    </SpinnerWrapperStyled>
  );
}
