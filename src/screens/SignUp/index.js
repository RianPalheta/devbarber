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
import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext);

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordConfirmation, setPasswordConfirmation ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const handleMessageButtonPress = () => {
    navigation.goBack();
  }
  const handleSignPress = async () => {
    if(name && email && password && passwordConfirmation) {
      setLoading(true);
      let res = await Api.signUp({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation
      });
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
          IconSvg={PersonIcon} 
          placeholder="seu nome"
          value={name}
          onChangeText={t => setName(t)}
        />
        <SignInput 
          IconSvg={EmailIcon} 
          placeholder="seumelhor@email.com"
          value={email}
          onChangeText={t => setEmail(t)}
        />
        <SignInput 
          IconSvg={LockIcon}
          placeholder="sua senha"
          value={password}
          onChangeText={t => setPassword(t)}
          password
        />
        <SignInput 
          IconSvg={LockIcon}
          placeholder="confirme sua sennha"
          value={passwordConfirmation}
          onChangeText={t => setPasswordConfirmation(t)}
          password
        />

        <SingButton value="Cadastra-se" loading={loading} onPress={handleSignPress} />
      </InputArea>

      <SignMessage
        onPress={handleMessageButtonPress}
        msg="Já possui uma conta?"
        bold="Faça Login"
      />
    </Container>
  );
}