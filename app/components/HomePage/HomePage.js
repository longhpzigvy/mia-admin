import React from 'react';
import {
  MiaWrapper,
  MiaTitle,
  MiaIntro,
  MiaIntroStatic,
  MiaMessengerLink,
  MiaMessengerImg,
  MiaLinkText,
  MiaLoginText,
  MiaFBLogin,
} from './styles';

const HomePage = () => (
  <MiaWrapper>
    <MiaTitle>Mia Consults</MiaTitle>
    <MiaIntro>
      <MiaIntroStatic>More than a chat bot</MiaIntroStatic>
    </MiaIntro>
    <MiaMessengerLink
      href="https://www.messenger.com/t/1620637394734647"
      target="_blank"
      rel="noopener noreferrer"
    >
      <MiaMessengerImg src="/assets/images/fb-messenger-icon.png" alt="Messenger Logo" />
      <MiaLinkText>Chat with Mia</MiaLinkText>
    </MiaMessengerLink>
    <MiaFBLogin>
      Or
      <MiaLoginText href="api/auth/login/facebook">
        Login with Facebook
      </MiaLoginText>
    </MiaFBLogin>
  </MiaWrapper>
);


export default HomePage;
