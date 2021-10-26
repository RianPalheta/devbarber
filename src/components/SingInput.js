import React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
  width: 100%;
  height: 60px;
  border-radius: 30px;
  padding-left: 15px;
  margin-bottom: 15px;
  align-items: center;
  flex-direction: row;
  background-color: #83D6E3;
`;
const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  margin-left: 10px;
  color: #268596;
`;


export default ({ IconSvg, placeholder, value, onChangeText, password }) => {
  return (
    <InputArea>
      <IconSvg width="24" height="24" fill="#268596" />
      <Input
        placeholder={placeholder}
        placeholderTextColor="#268596"
        value={value}
        secureTextEntry={password}
        onChangeText={onChangeText}
      />
    </InputArea>
  );
}