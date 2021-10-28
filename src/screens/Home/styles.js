import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #63C2D1;
`;
export const Scroller = styled.FlatList`
  flex: 1;
  padding: 20px;
`;

export const HeaderArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const HeaderTitle = styled.Text`
  width: 250px;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;

export const SearchButton = styled.TouchableOpacity`
  width: 26px;
  height: 26px;
`;

export const LocationArea = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 20px;
  margin: 30px 0;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  background-color: #4EADBE;
`;
export const LocationInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #FFF;
`;
export const LocationFinder = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`;

export const LoadingIcon = styled.ActivityIndicator``;

export const NoneLocationFinder = styled.View`
  flex: 1;
  min-height: 550px;
  align-items: center;
  justify-content: center;
`;
export const NoneLocationFinderText = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-top: 20px;
  font-weight: bold;
  text-align: center;
`;

export const FooterArea = styled.View`
  margin-bottom: 30px;
`;