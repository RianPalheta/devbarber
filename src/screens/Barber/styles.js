import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #FFF;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
`;

export const FakerSwiper = styled.View`
  height: 240px;
  background-color: #63C2D1;
`;

export const SwiperDot = styled.View`
  margin: 3px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  /* background-color: #63C2D1; */
  background-color: #FFF;
`;

export const SwiperActiveDot = styled.View`
  margin: 3px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #83D6E3;
`;

export const SwiperItem = styled.View`
  flex: 1;
  background-color: #63C2D1;
`;
export const SwiperImage = styled.Image`
  width: 100%;
  height: 240px;
`;

export const PageBody = styled.View`
  background-color: #FFF;
  margin-top: -50px;
  min-height: 400px;
  border-top-left-radius: 50px;
`;

export const UserInfoArea = styled.View`
  flex-direction: row;
  margin-top: -30px;
`;

export const UserAvatar = styled.Image`
  width: 110px;
  height: 110px;
  margin: 0 30px;
  border-radius: 20px;
  border-width: 4px;
  border-color: #FFF;
  background-color: #E7E7E7;
`;

export const UserInfo = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const UserName = styled.Text`
  color: #262626;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const UserFavoriteButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  margin: 10px 20px 0 20px;
  border-radius: 20px;
  background-color: #FFF;
  align-items: center;
  justify-content: center;
  border: 2px solid #E7E7E7;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
`;

export const ServiceLoadinglArea = styled.View`
  flex: 1;
`;

export const ServiceArea = styled.View`
  padding: 0 30px;
`;
export const ServiceTitle = styled.Text`
  color: #268596;
  font-size: 18px;
  font-weight: bold;
  margin: 30px 0;
`;
export const ServiceItem = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;
export const ServiceInfo = styled.View`
  flex: 1;
`;
export const ServiceName = styled.Text`
  color: #268596;
  font-size: 16px;
  font-weight: bold;
  max-width: 200px;
`;
export const ServicePrice = styled.Text`
  color: #268596;
  font-size: 14px;
`;
export const ServiceChooseButton = styled.TouchableOpacity`
  border-radius: 10px;
  padding: 10px 15px;
  align-items: center;
  justify-content: center;
  background-color: #4EADBE;
`;
export const ServiceChooseButtonText = styled.Text`
  color: #FFF;
  font-size: 14px;
  font-weight: bold;
`;

export const TestimonialArea = styled.View`
  margin: 30px 0;
  align-items: center;
`;
export const TestimonialItem = styled.View`
  padding: 15px;
  height: 110px;
  border-radius: 10px;
  justify-content: center;
  background-color: #268596;
  margin: 0 40px;
`;
export const TestimonialInfo = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: space-between;
`;
export const TestimonialName = styled.Text`
  color: #FFF;
  font-size: 14px;
  font-weight: bold;
`;
export const TestimonialBody = styled.Text`
  color: #FFF;
  font-size: 13px;
`;