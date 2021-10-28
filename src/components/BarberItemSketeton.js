import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import Stars from './Stars';

export const Area = styled.View`
  background-color: #FFF;
  padding: 15px;
  flex-direction: row;
  margin-bottom: 20px;
  border-radius: 20px;
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

export default () => {
  return (
    <Area>
       <ShimmerPlaceHolder style={{ borderRadius: 20 }} width={88} height={88}/>
      <InfoArea>
        <ShimmerPlaceHolder style={{ borderRadius: 10 }} width={130}/>

        <ShimmerPlaceHolder style={{ borderRadius: 10 }} width={120}/>

        <ShimmerPlaceHolder style={{ borderRadius: 10 }} width={85} height={26}/>
      </InfoArea>
    </Area>
  );
}