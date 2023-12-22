import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AsyncStorageConstants } from "../constants/CommonConsstats";
import NetInfo from '@react-native-community/netinfo';
import { showMessage } from "react-native-flash-message";
import { Alert } from "react-native";
import i18next from "i18next";

//localhost
// const baseUrl = "http://localhost:5001/api/mobile/v1/"
//work
// const baseUrl = "http://192.168.1.111:5001/api/mobile/v1/"
//phone a33
// const baseUrl = "http://192.168.131.228:5001/api/mobile/v1/"
//server
const baseUrl = process.env.EXPO_PUBLIC_API_PRO || "https://yamak-kw.com/api/mobile/v1/"



export const client = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

client.interceptors.request.use(async req => {
  let token = await AsyncStorage.getItem("auth")
  if (!token) return
  token = JSON.parse(token)
  req.headers["Authorization"] = `Bearer ${token?.state?.token}`
  return req;
});

client.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});


const setAuthorizationHeader = async (config: any) => {
  let token = await AsyncStorage.getItem('auth');
  if (token) {
    token = JSON.parse(token);
    config.headers['Authorization'] = `Bearer ${token?.state?.token}`;
  }
  return config;
};

const setDynamicBaseURL = async (config) => {
  let baseURL = await AsyncStorage.getItem(AsyncStorageConstants.env);
  baseURL = baseURL ? JSON.parse(baseURL)?.url : null
  // baseURL = "http://192.168.23.228:5001/api/mobile/v1/"
  config.baseURL = baseURL || "https://yamak-kw.com/api/mobile/v1/"
  return config;
};


let lockedApi = false
export const makeApiCall = async ({ method, url, data, params }: apiCallProps) => {
  lockedApi = false
  try {
    const config = {
      method,
      url,
      headers: {
        'Content-type': 'application/json',
      },
      data,
      params
    };

    const state = await NetInfo.fetch()
    if (state.isConnected) {
      // Set Authorization header
      await setAuthorizationHeader(config);

      // Set dynamic base URL
      await setDynamicBaseURL(config);

      console.log("Api request ==> " + JSON.stringify(config))
      const response = await client(config);

      console.log("Api response ==> " + JSON.stringify(response.data))

      return response.data;
    } else {
      if (lockedApi) return


      lockedApi = true
      Alert.alert(i18next.t('No_internet_connection'), '', [
        {
          text: i18next.t('ok') as string,
          onPress: () => {
            lockedApi = false;
          },
        },
      ]);


    }


  } catch (error) {
    if (error?.response?.data?.message == "user not registered") { throw error?.response?.data?.message }
    console.log({ error: error?.response?.data });

    // throw error;
  }
};

export interface apiCallProps { method: "get" | "post" | "patch" | "delete", url: string, data?: any, params?: any, itemId?: string, isRefetch?: boolean }