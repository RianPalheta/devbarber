import React, { useState } from 'react';

import * as C from './styles';
import SignInput from '../../components/SingInput';
import SingButton from '../../components/SingButton';
import SignMessage from '../../components/SignMessage';
import Container from '../../components/Container';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <C.InputArea>
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

        <SingButton value="Entrar" loading={loading} />
      </C.InputArea>

      <SignMessage
        msg="Ainda não possui uma conta?"
        bold="Cadastra-se"
      />
    </Container>
  );
}