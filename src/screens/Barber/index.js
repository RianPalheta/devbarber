import React, { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

import * as C from './styles';

import Api from '../../services/Api';
import Stars from '../../components/Stars';
import BarberModal from '../../components/BarberModal';

import FavoriteIcon from '../../assets/heart.svg';
import BackIcon from '../../assets/back.svg';
import NextIcon from '../../assets/nav_next.svg';
import PrevIcon from '../../assets/nav_prev.svg';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [ userInfo, setUserInfo ] = useState({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name,
    stars: route.params.stars,
    favorited: false,
    latitude: null,
    longitude: null,
    open: false,
    photos: [],
    services: [],
    available: [],
    testimonials: []
  });
  const [ loading, setLoaging ] = useState(false);
  const [ favorited, setFavorited ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ selectedService, setSelectedService ] = useState(null);

  const handleBackButton = () => navigation.goBack();
  const handleFavorite = async () => {
    setFavorited(!favorited);
    await Api.toggleFavoriteBarber(userInfo.id);
  }
  const handleServiceChoose = async (key) => {
    setSelectedService(key);
    setShowModal(true);
  }

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoaging(true);
      let res = await Api.getBarber(userInfo.id);
      setLoaging(false);
      if(res.error === '') {
        setUserInfo(res.data);
        setFavorited(res.data.favorited);
      } else if(res.error !== 'OFFLINE') {
        ToastAndroid.show(res.error, ToastAndroid.SHORT);
      } else if(res.error === 'OFFLINE') {
        ToastAndroid.show("Falha na conexão! Tente novamente mais tarde.", ToastAndroid.SHORT);
      }
    }
    getBarberInfo();
  }, []);

  return (
    <C.Container>
      <C.Scroller>
        { userInfo.photos && userInfo.photos.length > 0 ?
          <Swiper 
            autoplay
            dot={<C.SwiperDot />}
            style={{ height: 240 }}
            activeDot={<C.SwiperActiveDot />}
            paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
          >
            {userInfo.photos.map((i, k) => (
              <C.SwiperItem key={k}>
                <C.SwiperImage source={{ uri: i.url }} resizeMode='cover' />
              </C.SwiperItem>
            ))}
          </Swiper>
          : 
          <C.FakerSwiper></C.FakerSwiper>
        }
        <C.PageBody>
          <C.UserInfoArea>
            <C.UserAvatar source={{ uri: userInfo.avatar }} />
            <C.UserInfo>
              <C.UserName>{ userInfo.name }</C.UserName>
              <Stars stars={ userInfo.stars } showNumber />
            </C.UserInfo>
            <C.UserFavoriteButton onPress={handleFavorite}>
              <FavoriteIcon width="24" height="24" fill={ favorited && "#ED4956" } stroke={ !favorited && "#ED4956" } />
            </C.UserFavoriteButton>
          </C.UserInfoArea>

          <C.ServiceArea>
            <C.ServiceTitle>Lista de serviços</C.ServiceTitle>

            { loading &&
              <>
                <C.ServiceLoadinglArea>
                  { Array.from({ length: 4 }).map((_, k) => (
                    <C.ServiceItem key={k}>
                      <C.ServiceInfo>
                        <ShimmerPlaceHolder style={{ borderRadius: 20 }} width={120} height={20}/>
                        <ShimmerPlaceHolder style={{ borderRadius: 20, marginTop: 5 }} width={50} height={20}/>
                      </C.ServiceInfo>
        
                      <ShimmerPlaceHolder style={{ borderRadius: 10 }} width={85} height={40}/>
                    </C.ServiceItem>
                  )) }
                </C.ServiceLoadinglArea>
                <C.TestimonialArea>
                  <ShimmerPlaceHolder style={{ borderRadius: 10 }} width={275} height={95}/>
                </C.TestimonialArea>             
              </>
            }

            {userInfo.services.map((i, k) => (
              <C.ServiceItem key={k}>
                <C.ServiceInfo>
                  <C.ServiceName numberOfLines={1} ellipsizeMode="tail">{ i.name }</C.ServiceName>
                  <C.ServicePrice>R$ { i.price.toFixed(2).replace('.', ',') }</C.ServicePrice>
                </C.ServiceInfo>

                <C.ServiceChooseButton onPress={() => handleServiceChoose(k)}>
                  <C.ServiceChooseButtonText>Agendar</C.ServiceChooseButtonText>
                </C.ServiceChooseButton>
              </C.ServiceItem>
            ))}
          </C.ServiceArea>

          { userInfo.testimonials && userInfo.testimonials.length > 0 &&
            <C.TestimonialArea>
              <Swiper
                style={{ height: 110 }}
                autoplay
                showsButtons
                autoplayTimeout={5}
                showsPagination={false}
                prevButton={<PrevIcon width="35" height="35" stroke="#83D6E3" />}
                nextButton={<NextIcon width="35" height="35" stroke="#83D6E3" />}
              >   
                {userInfo.testimonials.map((i, k) => (
                  <C.TestimonialItem key={k}>
                    <C.TestimonialInfo>
                      <C.TestimonialName>{ i.name }</C.TestimonialName>
                      <Stars stars={i.rate} />
                    </C.TestimonialInfo>
                    <C.TestimonialBody numberOfLines={3} ellipsizeMode="tail">{ i.body }</C.TestimonialBody>
                  </C.TestimonialItem>
                ))}
              </Swiper>
            </C.TestimonialArea>
          }
        </C.PageBody>
      </C.Scroller>

      <C.BackButton onPress={handleBackButton}>
        <BackIcon width="44" height="44" stroke="#FFF" />
      </C.BackButton>

      <BarberModal 
        show={showModal}
        setShowModal={setShowModal}
        user={userInfo}
        service={selectedService}
        navigation={navigation}
      />
    </C.Container>
  );
}