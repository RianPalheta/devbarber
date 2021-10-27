import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #63C2D1;
`;


export default ({ children }) => {
  return (
    <Container>
      { children }
    </Container>
  );
}