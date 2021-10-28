import React, { useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import * as C from './styles';
import BarberLogo from '../../assets/barber.svg';

import Api from '../../services/Api';
import { UserContext } from '../../contexts/UserContext';

export default () => {
  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if(token) {
        // validar o token
        let req = await Api.checkToken(token);
        if(req.error === '') {
          await AsyncStorage.setItem('token', req.token);

          userDispatch({
            type: 'setAvatar',
            payload: { avatar: req.data.avatar }
          });

          return navigation.reset({ routes: [{ name: 'MainTab' }] });
        }
      }
      navigation.reset({ routes: [{name: 'SignIn'}] });
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