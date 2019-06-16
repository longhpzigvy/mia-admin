import styled, { keyframes } from 'styled-components';

export const LoginWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginCard = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 3px 10px 3px #e7e7e7;
  padding: 50px;
  color: #000;
`;

export const LoginTitle = styled.div`
  text-align: center;
  font-size: 32px;
  font-family: Countryside, sans-serif;
  margin-bottom: 55px;
`;

export const LoginInputWrapper = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 55px;
`;

export const LoginInput = styled.input`
  width: 100%;
  height: 27.5px;
  border: 0;
  outline: 0 none;
  -webkit-transition: border-color .2s linear;
  transition: border-color .2s linear;
  border-bottom: 1px solid #000;
  -webkit-font-smoothing: antialiased;
`;

export const LoginLabel = styled.div`
  margin-bottom: 7.5px;
  color: #000;
`;

export const LoginBtn = styled.button`
  height: 40px;
  border: 1px solid black;
  transition: .3s ease;
  background: #fff;
  cursor: pointer;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  

  &:hover {
    background: #000;
    color: #fff;
  }
  &:hover div {
    border-color: white white white transparent !important;
  }
`;

export const LoginFBBtn = styled.a`
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 5;
  transition: .3s ease;
  background: #3b5998;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  color: #fff;

  & > i {
    position: absolute;
    left: 12px;
  }

  & > i::before {
    color: #fff;
  }

  &:hover {
    background: #2f477a;
  }
`;

export const LoginFooter = styled.div`
  margin-top: 15px;
  text-align: center;
`;

export const LoginFooterText = styled.span`
`;

export const LoginFooterLink = styled.a`
  margin-left: 3px;
  text-decoration: none;
  color: black;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const spin = keyframes`
  100% {
    transform:rotate(360deg);
  }
`;

export const LoginSpinner = styled.div`
  border: 2px solid;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border-color:black black black transparent;
  animation: ${spin} 2s linear infinite;
  margin-right: 5px;
  display: inline-block;
`;

export const LoginErrorMessage = styled.div`
  color: crimson;
  text-align: center;
  margin-bottom: 15px;
`;
