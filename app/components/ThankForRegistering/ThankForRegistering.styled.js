import styled from 'styled-components';

export const ThankForRegisteringStyled = styled.div`
  max-width: 960px;
  width: calc(100% - 80px);
  margin: 20px auto 0;
  height: auto;
  margin-top: 130px;
  @media (max-width: 640px) {
    width: calc(100% - 30px);
  }
`;

export const MessageStyled = styled.p`
  line-height: 30px;
`;
export const TextLinkStyled = styled.button`
  color: #0b67a5;
  cursor: pointer;
`;
export const ThankForHeader = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const ErrorStyled = styled.div`
  color: red;
`;
