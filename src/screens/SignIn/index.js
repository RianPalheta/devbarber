import React, { useState, useContext } from 'react';
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { UserContext } from '../../contexts/UserContext';

import Api from '../../services/Api';

import SignInput from '../../components/SingInput';
import SingButton from '../../components/SingButton';
import SignMessage from '../../components/SignMessage';
import Container from '../../components/Container';
import InputArea from '../../components/InputArea';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext);

  const [ email, setEmail ] = useState('rianpalheta_@hotmail.com');
  const [ password, setPassword ] = useState('1234');
  const [ loading, setLoading ] = useState(false);

  const handleMessageButtonPress = () => {
    navigation.navigate('SignUp');
  }
  const handleSignPress = async () => {
    if(email && password) {
      setLoading(true);
      let res = await Api.signIn({ email, password });
      setLoading(false);

      if(res.error === '') {
        await AsyncStorage.setItem('token', res.token);

        userDispatch({
          type: 'setAvatar',
          payload: { avatar: res.data.avatar }
        });

        navigation.reset({
          routes: [{ name: 'MainTab' }]
        });
      } else if(res.error !== 'OFFLINE') {
        ToastAndroid.show(res.error, ToastAndroid.SHORT);
      } else if(res.error === 'OFFLINE') {
        ToastAndroid.show("Falha na conexão! Tente novamente mais tarde.", ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show("Preencha os campos!", ToastAndroid.SHORT);
    }
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput 
          IconSvg={EmailIcon} 
          placeholder="seu@email.com"
          value={email}
          onChangeText={t => setEmail(t)}
        />
        <SignInput 
          IconSvg={LockIcon}
          placeholder="*******"
          value={password}
          onChangeText={t => setPassword(t)}
          password
        />

        <SingButton value="Entrar" loading={loading} onPress={handleSignPress} />
      </InputArea>

      <SignMessage
        onPress={handleMessageButtonPress}
        msg="Ainda não possui uma conta?"
        bold="Cadastra-se"
      />
    </Container>
  );
}