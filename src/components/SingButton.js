import React, { useState } from 'react';
import styled from 'styled-components/native';

const ButtonArea = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: #268596;
`;
const ButtonText = styled.Text`
  color: #fff;
  text-transform: uppercase;
  font-size: 18px;
`;


export default ({ value, onPress, loading }) => {
  const [ isLoading, setIsLoading ] = useState(loading);

  return (
    <ButtonArea onPress={onPress}>
      <ButtonText>{ value }</ButtonText>
    </ButtonArea>
  );
}