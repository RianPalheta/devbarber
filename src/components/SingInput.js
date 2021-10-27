import React, { useState } from 'react';
import styled from 'styled-components/native';

import EyeIcon from '../assets/eye.svg';
import EyeOffIcon from '../assets/eye-off.svg';

const InputArea = styled.View`
  width: 100%;
  height: 60px;
  border-radius: 30px;
  padding: 0 15px;
  margin-bottom: 15px;
  align-items: center;
  flex-direction: row;
  background-color: #83D6E3;
`;
const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  margin: 0 10px;
  color: #268596;
`;
const EyeButton = styled.TouchableOpacity``;


export default ({ IconSvg, placeholder, value, onChangeText, password }) => {
  const [ eye, setEye ] = useState(password);

  return (
    <InputArea>
      <IconSvg width="24" height="24" stroke="#268596" />
      <Input
        placeholder={placeholder}
        placeholderTextColor="#268596"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={eye}
      />
      { password &&
        <>
          {
            eye 
            ? <EyeButton onPress={() => setEye(!eye)}><EyeIcon width="24" height="24" stroke="#268596"/></EyeButton>
            : <EyeButton onPress={() => setEye(!eye)}><EyeOffIcon width="24" height="24" stroke="#268596"/></EyeButton>
          }
        </>
      }
    </InputArea>
  );
}