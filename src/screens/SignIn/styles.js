import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #63C2D1;
`;

export const InputArea = styled.View`
  width: 100%;
  padding: 40px;
`;

export const Input = styled.TextInput``;

export const CustomButton = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: #268596;
`;
export const CustomButtonText = styled.Text`
  color: #fff;
  text-transform: uppercase;
  font-size: 18px;
`;

export const SignMessageButton = styled.TouchableOpacity`
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