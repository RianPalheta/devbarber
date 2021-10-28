import React from 'react';
import styled from 'styled-components/native';

const ButtonArea = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: #268596;
  opacity: ${props => props.disabled ? .8 : 1};
`;
const ButtonText = styled.Text`
  color: #fff;
  text-transform: uppercase;
  font-size: 18px;
`;
const LoadingIcon = styled.ActivityIndicator``;

export default ({ value, onPress, loading }) => {
  return (
    <ButtonArea onPress={onPress} disabled={loading}>
      <ButtonText>
        { loading
          ? <LoadingIcon color="#fff" size="large" />
          : value
        }
      </ButtonText>
    </ButtonArea>
  );
}