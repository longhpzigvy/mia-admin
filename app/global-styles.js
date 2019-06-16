import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  body *{
    box-sizing: border-box;
  }
  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    @media (max-width: 480px){
      font-size: 12px;
    }
  }
  body.fontLoaded {
    font-family: 'Open Sans', sans-serif;
  }
  html {
    scroll-behavior: smooth;
  }
  .ReactModal__Body--open{
    overflow: hidden;
  }
  html, body {
    height: 100%;
    min-height: 100%;
    min-width: 100%;
  }
  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
  .Popover {
    z-index: 9;
    color: #fff;
    left: calc(100% - 500px)!important;
  }
  .ReactModalPortal {
    position: fixed;
    z-index: 1000;
  }
  .Popover-tip{
    transform: translateX(400.078px)!important;
    @media (max-width: 960px) {
      transform: translateX(426.078px)!important;      
    }
  }
  input{
    &:focus {
      outline: 0;
    }
    &[type='number'] {
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
    &::-webkit-input-placeholder {
      color: #262626;
      font-style: italic;
    }
    &::-moz-placeholder {
      color: #262626;
      font-style: italic;
    }
    &::-moz-placeholder {
      color: #262626;
      font-style: italic;
    }
    &::-ms-input-placeholder {
      color: #262626;
      font-style: italic;
    }
  }
`;

export default GlobalStyle;
