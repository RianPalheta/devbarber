import React from 'react';

import styled from 'styled-components/native';

import Stars from './Stars';

export const Area = styled.View`
  background-color: #FFF;
  padding: 15px;
  flex-direction: row;
  margin-bottom: 20px;
  border-radius: 20px;
  opacity: ${props => props.open ? 1 : .8};
`;
export const Avatar = styled.Image`
  width: 88px;
  height: 88px;
  border-radius: 20px;
  background-color: #E7E7E7;
`;
export const InfoArea = styled.View`
  margin-left: 20px;
  justify-content: space-between;
`;
export const UserName = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;
export const SeeProfileButton = styled.TouchableOpacity`
  width: 85px;
  height: 26px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  border: 1px solid #4EADBE;
`;
export const SeeProfileButtonText = styled.Text`
  font-size: 13px;
  color: #268596;
`;

export default ({ item, navigation }) => {
  const handleProfileBarber = () => {
    navigation.navigate('Barber', {
      id: item.id,
      avatar: item.avatar,
      name: item.name,
      stars: item.stars,
    });
  }

  return (
    <Area open={item.open}>
      <Avatar source={{ uri: item.avatar }} />
      <InfoArea>
        <UserName>{ item.name }</UserName>

        <Stars stars={item.stars} showNumber />
        
        <SeeProfileButton onPress={handleProfileBarber}>
          <SeeProfileButtonText>Ver Perfil</SeeProfileButtonText>
        </SeeProfileButton>
      </InfoArea>
    </Area>
  );
}