import React from 'react';
import styled from 'styled-components/native';

export const InputArea = styled.View`
  width: 100%;
  padding: 40px;
`;

export default ({ children }) => {
  return (
    <InputArea>
      { children }
    </InputArea>
  );
}