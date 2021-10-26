import React, { useState } from 'react';

import * as C from './styles';
import BarberLogo from '../../assets/barber.svg';
import SignInput from '../../components/SingInput';

import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);

  return (
    <C.Container>
      <BarberLogo width="100%" height="160" />

      <C.InputArea>
        <SignInput 
          IconSvg={EmailIcon} 
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={t => setEmail(t)}
        />
        <SignInput 
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={password}
          onChangeText={t => setPassword(t)}
          password
        />

        <C.CustomButton>
          <C.CustomButtonText>Entrar</C.CustomButtonText>
        </C.CustomButton>
      </C.InputArea>

      <C.SignMessageButton>
        <C.SignMessageButtonText>Ainda não possui uma conta?</C.SignMessageButtonText>
        <C.SignMessageButtonTextBold>Cadastra-se</C.SignMessageButtonTextBold>
      </C.SignMessageButton>
    </C.Container>
  );
}