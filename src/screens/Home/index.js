import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions';
import AsyncStorage from '@react-native-community/async-storage';
import { Platform, ToastAndroid, RefreshControl } from 'react-native';

import * as C from './styles';

import Api from '../../services/Api';
import BarberItem from '../../components/BarberItem';
import BarberItemSketeton from '../../components/BarberItemSketeton';

import SearchIcon from '../../assets/search.svg';
import AccessDenied from '../../assets/access_denied.svg';
import MyLocationIcon from '../../assets/my_location.svg';

export default () => {
  const navigation = useNavigation();

  const [ list, setList ] = useState([]);
  const [ coords, setCoords ] = useState(null);
  const [ page, setPage ] = useState(1);
  const [ loading, setLoading ] = useState(false);
  const [ refreshing, setRefreshing ] = useState(false);
  const [ finishList, setFinishList ] = useState(false);
  const [ locationText, setLocationText ] = useState('');
  const [ locationFinderloading, setLocationFinderLoading ] = useState(false);

  const handleLocationFinder = async () => {
    setCoords(null);
    let result = await request(
      Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );
    if(result === 'granted') {
      setLocationFinderLoading(true);
      setLoading(true);
      setList([]);
      
      Geolocation.getCurrentPosition(async info => {
        setCoords(info.coords);
        await AsyncStorage.setItem('coords', JSON.stringify(info.coords));
      }, async (err) => {
        setCoords(JSON.parse(await AsyncStorage.getItem('coords')));
      }, {
        timeout: 2000,
        maximumAge: 3600000
      });
    }
  }
  const handleLocationSearch = () => {
    setCoords(null);
    setList([]);
    setPage(1);
    getBarbers(locationText);
  }

  const getBarbers = async (address = null, geo = null) => {
    if(loading || finishList) return;
    
    let data = { page };  
    // if(geo) data.geo = true;
    if(coords && address) {
      data.lat = coords.latitude;
      data.lng = coords.longitude;
    } else if(address) {
      data.city = address;
    } else {
      let coordsLocal = JSON.parse(await AsyncStorage.getItem('coords'));
      data.lat = coordsLocal.latitude;
      data.lng = coordsLocal.longitude;
    }

    setLoading(true);
    let res = await Api.getBarbers(data);
    if(res.error === '') {
      setList([ ...list, ...res.data ]);
      setPage(page + 1);
      if(res.loc) setLocationText(res.loc);
      if(res.data.length === 0) setFinishList(true);
    } else if(res.error !== 'OFFLINE') {
      ToastAndroid.show(res.error, ToastAndroid.SHORT);
    } else if(res.error === 'OFFLINE') {
      ToastAndroid.show("Falha na conexão! Tente novamente mais tarde.", ToastAndroid.SHORT);
    }
    setLoading(false);
    setLocationFinderLoading(false);
  }
  const onRefresh = async () => {
    setRefreshing(false);
    setList([]);
    setPage(1);
    getBarbers();
  }
  const onEndReached = async () => {
    if(loading || refreshing) return;
    setLoading(true);
    setPage(page + 1);
    getBarbers();
  }

  useEffect(() => {
    handleLocationFinder();
  }, []);
  useEffect(() => {
    getBarbers(null, true);
  }, [coords]);

  const HeaderArea = () => (
    <>
      <C.HeaderArea>
        <C.HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</C.HeaderTitle>
        <C.SearchButton onPress={ () => navigation.navigate('Search') }>
          <SearchIcon width="26" height="26" stroke="#FFF" />
        </C.SearchButton>
      </C.HeaderArea>
      <C.LocationArea>
        <C.LocationInput 
          placeholder="Onde você está?"
          placeholderTextColor="#FFF"
          value={locationText}
          onChangeText={t=>setLocationText(t)}
          onEndEditing={handleLocationSearch}
        />
        { locationFinderloading
          ? <C.LoadingIcon size="small" color="#FFF" />
          : <C.LocationFinder onPress={handleLocationFinder} disabled={loading}>
              <MyLocationIcon width="24" height="24" fill="#FFF" />
            </C.LocationFinder>
        }
      </C.LocationArea>
    </>
  );
  const NoneLocationFinder = () => (
    <>
      { !loading && !refreshing && page !== 1 &&
        <C.NoneLocationFinder>
          <AccessDenied width="100%" height="220" />
          <C.NoneLocationFinderText>
            Ops! Não temos acesso a sua localização.
          </C.NoneLocationFinderText>
        </C.NoneLocationFinder>
      }
    </>
  );
  const FooterArea = () => (
    <>
      { !finishList &&
        <C.FooterArea>
          { list.length === 0 ?
            <>  
              {Array.from({length: 4}).map((_, k) => (
                <BarberItemSketeton key={k}/>
              ))}
            </>
            : <BarberItemSketeton />
          }
        </C.FooterArea>
      }
    </>
  );
  
  return (
    <C.Container>
        <C.Scroller 
          refreshControl={
            <RefreshControl
              colors={["#4EADBE"]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={list}
          initialNumToRender={20}
          keyExtractor={i => i.id}
          onEndReachedThreshold={0.2}
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={NoneLocationFinder}
          getItemLayout={(data, index) => (
            { length: 130, offset: 130 * index, index }
          )}
          ListHeaderComponent={HeaderArea}
          ListFooterComponent={FooterArea}
          renderItem={data => <BarberItem item={data.item} navigation={navigation} />}
        />
    </C.Container>
  );
}