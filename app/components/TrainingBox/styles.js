import styled, { css } from 'styled-components';

export const TrainWrapper = styled.div`
  width: 100%;
  background: #fafafa;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

export const TrainTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 5px;
`;

export const TrainSubTitle = styled.div`
  margin-bottom: 20px;
`;

export const TrainMiaResponseInput = styled.input`
  background: rgb(238, 238, 238);
  width: 100%;
  height: 35px;
  margin-bottom: 15px;
  border: none;
  outline: none;
  border-bottom: 1px solid #ccc;
  padding-left: 5px;
  font-size: 18px;

  ::placeholder {
    color: #aaa;
    font-style: normal;
  }
`;

export const TrainerUserInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 35px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const TrainerUserInputPlaceHolder = styled.div`
  position: absolute;
  color: #aaa;
  margin-left: 5px;
  font-size: 18px;
`;

export const TrainUserInput = styled.div`
  background: rgb(238, 238, 238);
  width: 100%;
  height: 35px;
  border: none;
  outline: none;
  border-bottom: 1px solid #ccc;
  padding-left: 5px;
  padding-top: 7.5px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const TrainBtn = styled.button`
  box-shadow: none;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7.5px 10px;
  font-size: 16px;
  transition: .3s ease;
  margin-top: 5px;
  & > i:before {
    margin-right: 5px;
    font-weight: bold;
  }
`;

export const TrainValidateBtn = styled(TrainBtn)`

  ${props => props.active ? css`
    background: #90cb66;
    color: #003a02;
  ` : css`
    background: #eee;
    color: #ccc;
  `}

  &:hover {
    ${props => props.active ? css`
      /* background: #7ea861; */
      color: #fff;
  ` : css``}
  }
`;

export const TrainAddResponseBtn = styled(TrainBtn)`
  margin-right: 20px;
  ${props => props.active ? css`
    background: #9cb1e5;
  ` : css`
    background: #eee;
    color: #ccc;
  `}

  &:hover {
    ${props => props.active ? css`
      color: #fff;
  ` : css``}
  }
`;

export const TrainBtnGroup = styled.div`
  display: flex;
`;

export const TrainEntityInput = styled.input`
  border: none;
  background: none;
  height: 30px;
  padding-left: 5px;
  font-size: 16px;
  ::placeholder {
    color: #aaa;
    font-style: normal;
  }
`;

export const TrainAddEntityBtn = styled.button`
  background: black;
  border: none;
  box-shadow: none;
  outline: none;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  i:before {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
`;

export const TrainEntityWrapper = styled.div`
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 10px;

  &:last-child {
    margin-right: 0px;
  }
`;

export const TrainResponseWrapper = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;

export const TrainSelectWrapper = styled.div`
  display: flex;
  width: 100%;
`;
