import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 20px;
  background-color: #63C2D1;
`;

export const SearchArea = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 20px;
  margin: 30px 0;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  background-color: #4EADBE;
`;
export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #FFF;
`;

export const Scoller = styled.FlatList`
  flex: 1;
`;