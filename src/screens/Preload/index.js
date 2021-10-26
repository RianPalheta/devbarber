import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import * as C from './styles';
import BarberLogo from '../../assets/barber.svg';

export default () => {
  const navigation = useNavigation();
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if(token) {
        // validar o token
        
      } 

      return navigation.navigate('SignIn');
    }
    checkToken();
  }, []);

  return (
    <C.Container>
      <BarberLogo width="100%" height="160" />
      <C.LoadingIcon size="large" color="#FFF" />
    </C.Container>
  );
}