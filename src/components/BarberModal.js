import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { Modalize } from 'react-native-modalize';

import CloseIcon from '../assets/expand.svg';
import NextIcon from '../assets/nav_next.svg';
import PrevIcon from '../assets/nav_prev.svg';

export const ModalArea = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(38, 38, 38, .5);
`;
export const ModalBody = styled.View`
  min-height: 550px;
  padding: 10px 20px 40px 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #83D6E3;
`;
export const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;
export const ModalItem = styled.View`
  margin-top: 15px;
  padding: 15px 10px;
  border-radius: 10px;
  background-color: #FFF;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const UserAvatar = styled.Image`
  width: 55px;
  height: 55px;
  margin-right: 20px;
  border-radius: 10px;
  background-color: #E7E7E7;
`;
export const UserName = styled.Text`
  color: #262626;
  font-size: 18px;
  font-weight: bold;
`;

export const ServiceInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const ServiceName = styled.Text`
  color: #262626;
  font-size: 16px;
  font-weight: bold;
`;
export const ServicePrice = styled.Text`
  color: #262626;
  font-size: 16px;
  font-weight: bold;
`;

export const DateInfo = styled.View`
  flex-direction: row;
`;
export const DatePrevArea = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
  opacity: ${props => props.disabled ? .3 : 1};
`;
export const DateNextArea = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-start;
  opacity: ${props => props.disabled ? .3 : 1};
`;
export const DateTitleArea = styled.View`
  width: 140px;
  align-items: center;
  justify-content: center;
`;
export const DateTitle = styled.Text`
  color: #262626;
  font-size: 17px;
  font-weight: bold;
`;
export const DateList = styled.ScrollView``;
export const DateItem = styled.TouchableOpacity`
  width: 45px;
  padding: 5px 0;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${ props => props.selected ? '#4EADBE' : 'transparent' };
  opacity: ${ props => props.disabled ? .5 : 1 };
`;
export const DateItemWeekDay = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${ props => props.selected ? '#FFF' : '#262626' };
`;
export const DateItemNumber = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${ props => props.selected ? '#FFF' : '#262626' };
`;

export const TimeList = styled.ScrollView``;
export const TimeItem = styled.TouchableOpacity`
  width: 75px;
  height: 40px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${ props => props.selected ? '#4EADBE' : 'transparent' };
`;
export const TimeItemText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${ props => props.selected ? '#FFF' : '#262626' };
`;

export const FinishButton = styled.TouchableOpacity`
  margin-top: 15px;
  padding: 20px 10px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: #268596;
`;
export const FinishButtonText = styled.Text`
  color: #FFF;
  font-size: 17px;
  font-weight: bold;
`;

const months = [ 
  'Janeiro', 'Fevereiro', 'Março',
  'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro',
  'Outubro', 'Novembro', 'Dezembro'
];
const days = [
  'Dom', 'Seg',
  'Ter', 'Qua',
  'Qui', 'Sex',
  'Sáb'
];

export default ({ show, setShowModal, user, service, navigation }) => {
  const modalRef = useRef(null);

  const [ selectedYear, setSelectedYear ] = useState(0);
  const [ selectedMonth, setSelectedMonth ] = useState(0);
  const [ selectedDay, setSelectedDay ] = useState(0);
  const [ selectedHour, setSelectedHour ] = useState(null);
  const [ listDays, setListDays ] = useState([]);
  const [ listHours, setListHours ] = useState([]);

  const [ disabledPrev, setDisabledPrev ] = useState(false);
  const [ disabledNext, setDisabledNext ] = useState(false);

  useEffect(() => {
    let today = new Date();
    setSelectedYear( today.getFullYear() );
    setSelectedMonth( today.getMonth() );
    setSelectedDay( today.getDate() );

  }, []);
  useEffect(() => {
    let month = new Date().getMonth();
    if(month === selectedMonth)
      setDisabledPrev(true);
    else 
      setDisabledPrev(false);

    let nextMonth = new Date();
    nextMonth.setMonth( month + 6 );

    if(nextMonth.getMonth() === selectedMonth) 
      setDisabledNext(true);
    else 
      setDisabledNext(false);

    if(user.available) {
      let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      let newListDays = [];

      for(let i = 1; i <= daysInMonth; i++) {
        let d = new Date(selectedYear, selectedMonth, i);
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
        let selDate = `${year}-${month}-${day}`;

        let availability = user.available.filter( e => e.date === selDate );

        newListDays.push({
          status: availability.length > 0,
          weekDay: days[d.getDay()],
          number: i
        });
      }
      setListDays(newListDays);
      setSelectedHour(null);
      setSelectedHour(0);
      setSelectedDay(0);
    }
  }, [user, selectedMonth, selectedYear]);
  useEffect(() => {
    if(selectedDay > 0 && user.available) {
      let d = new Date(selectedYear, selectedMonth, selectedDay);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;
      let selDate = `${year}-${month}-${day}`;

      let availability = user.available.filter( e => e.date === selDate );

      if(availability.length > 0) setListHours( availability[0].hours );
    }
    setSelectedHour(null);
  }, [user, selectedDay]);

  useEffect(() => {
    if(show) 
      modalRef.current?.open();
    else
      modalRef.current?.close();
  }, [show]);

  const handleCloseModal = () => setShowModal(false);
  const handlePrevDate = () => {
    if(disabledPrev) return;

    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth( mountDate.getMonth() - 1 );
    setSelectedYear( mountDate.getFullYear() );
    setSelectedMonth( mountDate.getMonth() );
    setSelectedDay(0);
  }
  const handleNextDate = () => {
    if(disabledNext) return;

    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth( mountDate.getMonth() + 1 );
    setSelectedYear( mountDate.getFullYear() );
    setSelectedMonth( mountDate.getMonth() );
    setSelectedDay(0);
  }
  const handleFinish = () => {
    alert('Finalizar agendamento');
  }

  return (
    <Modalize
      ref={modalRef}
      // snapPoint={550}
      modalHeight={550}
      onClose={() => setShowModal(false)}
    >
      <ModalArea>
        <ModalBody>
          <CloseButton onPress={handleCloseModal}>
            <CloseIcon width="40" height="40" stroke="#FFF" />
          </CloseButton>

          <ModalItem>
            <UserInfo>
              <UserAvatar source={{ uri: user.avatar }} />
              <UserName>{ user.name }</UserName>
            </UserInfo>
          </ModalItem>

          { service !== null &&
            <ModalItem>
              <ServiceInfo>
                <ServiceName numberOfLines={1} ellipsizeMode="tail">{ user.services[service].name }</ServiceName>
                <ServicePrice>R$ { user.services[service].price.toFixed(2).replace('.', ',') }</ServicePrice>
              </ServiceInfo>
            </ModalItem>
          }

          <ModalItem>
            <DateInfo>
              <DatePrevArea onPress={handlePrevDate} disabled={disabledPrev}>
                <PrevIcon width="35" height="35" stroke="#83D6E3" />
              </DatePrevArea>

              <DateTitleArea>
                <DateTitle>{ months[selectedMonth] } { selectedYear }</DateTitle>
              </DateTitleArea>

              <DateNextArea onPress={handleNextDate} disabled={disabledNext}>
                <NextIcon width="35" height="35" stroke="#83D6E3" />
              </DateNextArea>
            </DateInfo>

            <DateList horizontal showsHorizontalScrollIndicator={false}>
              { listDays.map((i, k) => (
                <DateItem 
                  key={k} 
                  disabled={!i.status}
                  selected={ selectedDay === i.number }
                  onPress={() => i.status && setSelectedDay(i.number)} 
                >
                  <DateItemWeekDay 
                    selected={ selectedDay === i.number }
                  >{ i.weekDay }</DateItemWeekDay>
                  <DateItemNumber 
                    selected={ selectedDay === i.number }
                  >{ i.number }</DateItemNumber>
                </DateItem>
              )) }
            </DateList>
          </ModalItem>

          { selectedDay > 0 && listHours.length > 0 &&
            <ModalItem>
              <TimeList horizontal showsHorizontalScrollIndicator={false}>
                {listHours.map((i, k) => (
                  <TimeItem 
                    key={ k } 
                    selected={ selectedHour === i }
                    onPress={() => setSelectedHour(i)} 
                  >
                    <TimeItemText 
                      selected={ selectedHour === i }
                    >{ i }</TimeItemText>
                  </TimeItem>
                ))}
              </TimeList>
            </ModalItem>
          }

          <FinishButton onPress={handleFinish}>
            <FinishButtonText>Finalizar Agendamento</FinishButtonText>
          </FinishButton>
        </ModalBody>
      </ModalArea>
    </Modalize>
  );
}