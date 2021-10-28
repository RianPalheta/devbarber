import React from 'react';
import styled from 'styled-components/native';

import StarFull from '../assets/star.svg';
import StarHalf from '../assets/star_half.svg';
import StarEmpty from '../assets/star_empty.svg';

export const StartArea = styled.View`
  flex-direction: row;
`;
export const StarView = styled.View``;
export const StarText = styled.Text`
  color: #737373;
  font-size: 12px;
  margin-left: 5px;
  font-weight: bold;
`;

export default ({ stars, showNumber }) => {
  let s = [0, 0, 0, 0, 0];
  let floor = Math.floor(stars);
  let left = stars - floor;

  for(var i = 0; i < floor; i++) {
    s[i] = 2;
  }
  if(left > 0) {
    s[i] = 1;
  }

  return (
    <StartArea>
      {s.map((i, k) => (
        <StarView key={k}>
          { i === 0 && <StarEmpty width="18" height="18" fill="#FF9200" /> }
          { i === 1 && <StarHalf width="18" height="18" fill="#FF9200" /> }
          { i === 2 && <StarFull width="18" height="18" fill="#FF9200" /> }
        </StarView>
      ))}

      { showNumber && <StarText>{ stars }</StarText> }
    </StartArea>
  );
}