import React, { useContext } from 'react';
import styled from 'styled-components/native';

import { UserContext } from '../contexts/UserContext';

import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import CalendarIcon from '../assets/calendar.svg';
import HeartIcon from '../assets/heart.svg';
import ProfileIcon from '../assets/person.svg';

export const TabArea = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #4EADBE;
`;
export const TabItem = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  align-items: center;
  justify-content: center;
  background-color: #FFF;
  border: 3px solid #4EADBE;
  margin-top: -35px;
`;
export const AvatarIcon = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;

export default ({ state, navigation }) => {
  const { state: user } = useContext(UserContext);
  const goTo = (screenName) => navigation.navigate(screenName);

  return (
    <TabArea>
      <TabItem onPress={() => goTo('Home')}>
        <HomeIcon style={{ opacity: state.index === 0 ? 1 : 0.7 }} width="24" height="24" stroke="#FFF" />
      </TabItem>
      <TabItem onPress={() => goTo('Search')}>
        <SearchIcon style={{ opacity: state.index === 1 ? 1 : 0.7 }} width="24" height="24" stroke="#FFF" />
      </TabItem>
      <TabItemCenter onPress={() => goTo('Appointments')}>
        <CalendarIcon width="32" height="32" stroke="#4EADBE" />
      </TabItemCenter>
      <TabItem onPress={() => goTo('Favorites')}>
        <HeartIcon style={{ opacity: state.index === 3 ? 1 : 0.7 }} width="24" height="24" stroke="#FFF" />
      </TabItem>
      <TabItem onPress={() => goTo('Profile')}>
        {user.avatar != ''
          ? <AvatarIcon source={{ uri: user.avatar }} />
          : <ProfileIcon style={{ opacity: state.index === 4 ? 1 : 0.7 }} width="24" height="24" stroke="#FFF" />
        }
      </TabItem>
    </TabArea>
  );
}