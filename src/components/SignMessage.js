import React, { useState } from 'react';
import styled from 'styled-components/native';

const SignMessageButton = styled.TouchableOpacity`
  margin-top: 50px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: center;
`;
export const SignMessageButtonText = styled.Text`
  color: #268596;
  font-size: 16px;
`;
export const SignMessageButtonTextBold = styled.Text`
  color: #268596;
  font-weight: bold;
  margin-left: 5px;
  font-size: 16px;
`;


export default ({ msg, bold, onPress }) => {
  return (
    <SignMessageButton onPress={onPress}>
      <SignMessageButtonText>{ msg }</SignMessageButtonText>
      <SignMessageButtonTextBold>{ bold }</SignMessageButtonTextBold>
    </SignMessageButton>
  );
}