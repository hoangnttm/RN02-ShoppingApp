import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, SignupScreen, ProductDetail, UserInfo } from '../screens/index';
import { getAccessToken } from '../ultils/storage';
import { getAccessTokenSelector, getWasLogginStatusSelector } from '../redux/selectors/loginSelector';
import { useDispatch, useSelector } from 'react-redux';
import rootTabNavigation from './rootTabNavigation';
import { userCheckLogin } from '../redux/actions/userAction'

const Stack = createStackNavigator();
const RootNavigation = (state) => {

  const [isLogin, setIsLogin] = useState(false)
  const accessToken = useSelector(getAccessTokenSelector);
  const isWasLogin = useSelector(getWasLogginStatusSelector);
  
  const dispatch = useDispatch();

  useEffect(async () => {
    const token = await getAccessToken();
    if (token) {
      dispatch({ type: 'SET_ACCESS_TOKEN', payload: { accessToken: token } });
      dispatch(userCheckLogin())
    }

  }, [])
  useEffect(() => {
    if (!!accessToken) {
      dispatch(userCheckLogin())
    }
    return () => {
    };
  }, [accessToken])

  useEffect(() => {
    console.log("isWasLogin" +{isWasLogin});
    setIsLogin(isWasLogin);
    return () => {
    };
  }, [isWasLogin])
  return (
    <NavigationContainer >
      <Stack.Navigator headerMode="none" mode='modal'>
        {!isLogin ?
          (
            <>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="SignupScreen" component={SignupScreen} />
            </>) : (
            <>
              <Stack.Screen name="HomeScreen" component={rootTabNavigation} />
              <Stack.Screen name="DetailProductScreen" component={ProductDetail} />
              <Stack.Screen name="UserInfoScreen" component={UserInfo} />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
