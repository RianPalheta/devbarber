import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, Button } from 'react-native';

import * as C from './styles';

import Api from '../../services/Api';
import Container from '../../components/Container';

export default () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    await Api.logout();
    await AsyncStorage.removeItem('token');
    navigation.reset({
      routes: [{name: 'SignIn'}]
    });
  }

  return (
    <Container>
      <Text>Profile</Text>  
      <Button title="Sair" onPress={handleLogout}/>
    </Container>
  );
}