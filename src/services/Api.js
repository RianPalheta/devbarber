import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from '@react-native-community/netinfo';
import { ToastAndroid } from 'react-native';

const BASE_URL = 'https://mercadotucujur.com/apis/devbarber/public/api';

let online = true;
NetInfo.addEventListener(state => {
  online = state.isConnected;
});

const request = async (method, endpoint, params, token = null) => {
  if(!online) return ToastAndroid.show("Você não está conectado a internet!", ToastAndroid.SHORT);

  method = method.toLowerCase();
  let fullUrl = `${BASE_URL}/${endpoint}`;
  let headers = {'Content-Type': 'application/json'};
  let body = null;

  if(token) headers.Authorization = `Bearer ${token}`;

  switch(method) {
    case 'get':
      let queryString = new URLSearchParams(params).toString();
      fullUrl += `?${queryString}`;
    break;
    case 'post':
    case 'put':
    case 'delete':
      body = JSON.stringify(params);
    break;
  }

  let req = await fetch(fullUrl, { body, method, headers });

  return await req.json();
}

export default {
  async getToken() {
    return await AsyncStorage.getItem('token');
  },
  async checkToken(token) {
    try {
      return await request('POST', 'auth/refresh', {}, token);
    } catch (error) { return { error: 'OFFLINE' } }
  },
  async signIn(data) {
    try {
      return await request('POST', 'auth/login', data);
    } catch (error) { return { error: 'OFFLINE' } }
  },
  async signUp(data) {
    try {
      return await request('POST', 'auth/register', data);
    } catch (error) { return { error: 'OFFLINE' } }
  },
  async getBarbers(data) {
    let token = await this.getToken();
    try {
      return await request('GET', 'barbers', data, token);
    } catch (error) { return { error: 'OFFLINE' } }
  },
};