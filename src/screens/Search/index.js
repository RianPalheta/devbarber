import React, { useState, useEffect } from 'react';
import { RefreshControl, ToastAndroid, useWindowDimensions, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TabView, SceneMap } from 'react-native-tab-view';

import BarberTab from './Tabs/barbers';
import ServiceTab from './Tabs/services';

import * as C from './styles';
import Api from '../../services/Api';

const renderScene = SceneMap({
  first: BarberTab,
  second: ServiceTab
});

export default () => {
  const layout = useWindowDimensions();

  const [ page, setPage ] = useState(1);
  const [ list, setList ] = useState([]);
  const [ coords, setCoords ] = useState(null);
  const [ searchText, setSearchText ] = useState('');
  const [ refreshing, setRefreshing ] = useState(false);

  const [ tabIndex, setTabIndex ] = useState(0);
  const [ routes ] = useState([
    { key: 'barbers', title: 'Barbeiros' },
    { key: 'services', title: 'Serviços' },
  ]);

  useEffect(() => {
    const getCoords = async () => {
      setCoords(JSON.parse(await AsyncStorage.getItem('coords')));
    } 
    getCoords();
  }, []);

  const getSearchBarbes = async () => {
    if(loading) return;

    let data = { q: searchText, lat: coords.latitude, lng: coords.longitude }
    alert('oi')
    if(searchText !== '') {
      setLoading(true);
      let res = await Api.search(data);
      console.log(res);
      if(res.error === '') {
        setPage(page + 1);
        setList([ ...list, ...res.data ]);
        if(res.data.length === 0) setFinishList(true);
      } else if(res.error !== 'OFFLINE') {
        ToastAndroid.show(res.error, ToastAndroid.SHORT);
      } else if(res.error === 'OFFLINE') {
        ToastAndroid.show("Falha na conexão! Tente novamente mais tarde.", ToastAndroid.SHORT);
      }
      setLoading(false);
    } else {
      ToastAndroid.show("Digite algo para buscar.", ToastAndroid.SHORT);
    }
  }

  const handleRefreshing = () => {}
  const handleSearchBarber = () => {
    getSearchBarbes();
  }

  return (
    <C.Container>
      <C.SearchArea>
        <C.SearchInput 
          autoFocus
          selectTextOnFocus
          value={searchText}
          returnKeyType="search"
          placeholderTextColor="#FFF"
          onEndEditing={handleSearchBarber}
          onChangeText={t => setSearchText(t)}
          placeholder="Busque por um barbeiro ou serviço"
        />
      </C.SearchArea>

      <TabView
        navigationState={{ tabIndex, routes }}
        renderScene={renderScene}
        onIndexChange={setTabIndex}
        initialLayout={{ width: layout.width }}
      />

      {/* <C.Scoller 
        refreshControl={
          <RefreshControl 
            colors={["#4EADBE"]}
            refreshing={refreshing}
            onRefresh={handleRefreshing}
          />
        }
      >

      </C.Scoller> */}
    </C.Container>
  );
}