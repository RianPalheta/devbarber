import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text``;

export default () => {
  return (
    <Container>
      <Text>barbeiro</Text>
    </Container>
  );
}