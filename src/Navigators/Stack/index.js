import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Splash} from '../../Screens/Splash';
import {Login} from '../../Screens/Login';
import {SignUp} from '../../Screens/SignUp';
import {TermCondition} from '../../Screens/TermCondition';
import SimpleBottomTab from '../SimpleBottomScreen';
import {EditProfile} from '../../Screens/EditProfile';
import {ProfileDetail} from '../../Screens/ProfileDetail';
import {CreateProfile} from '../../Screens/CreateProfile';
import {PasswordChange} from '../../Screens/PasswordChange';
import {Welcome} from '../../Screens/Welcome';
import {Settings} from '../../Screens/Settings';
import {Drawer} from '../../Screens/Drawer';
import {Notifications} from '../../Screens/Notifications';
import {AboutApp} from '../../Screens/AboutApp';
import {PrivacyPolicy} from '../../Screens/PrivacyPolicy';
import {TermsAndCondition} from '../../Screens/TermsAndCondition';
import {HelpSupport} from '../../Screens/HelpSupport';
import {ForgotPassword} from '../../Screens/ForgotPassword';
import {ProfileCreateStart} from '../../Screens/ProfileCreateStart';
import {DetailItem} from '../../Screens/DetailItems';
import {EditMetal} from '../../Screens/EditMetal';
import {PortfolioMain} from '../../Screens/PortfolioMain';
import {OtpScreen} from '../../Components/OtpScreen';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userDataFromAsyncStorage} from '../../Store/Reducers/AuthReducer';
import {UpdatePassword} from '../../Screens/UpdatePassword';
import DeviceInfo from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';
import Geocoder from 'react-native-geocoding';
import StackedArea from '../../Components/ReusableComponent/StackedAreaChart';
import {VictoryPieChart} from '../../Components/ReusableComponent/VictoryPie';
import News from '../../Screens/News';
import NewsScreen from '../../Screens/NewsScreen';

export default function StackNavigator({route, navigation}) {
  const Stack = createStackNavigator();

  const [loader, setLoader] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Get device brand (e.g., Apple, Samsung)
    async function fetchData() {
      const deviceBrand = DeviceInfo.getBrand();
      console.log('deviceBrand', deviceBrand);

      // Get device model (e.g., iPhone X, Galaxy S10)
      const deviceModel = DeviceInfo.getModel();
      console.log('deviceModel', deviceModel);

      // Get device manufacturer (e.g., Apple, Samsung)
      const deviceManufacturer = await DeviceInfo.getManufacturer();
      console.log('deviceManufacturer', deviceManufacturer);

      // Get device name (e.g., "John's iPhone")
      // const deviceName = DeviceInfo.getDeviceName();
      // console.log('deviceName', deviceName);

      // Get device unique ID
      const deviceId = await DeviceInfo.getUniqueId();
      console.log('deviceId', deviceId);

      // Get system name (e.g., iOS, Android)
      const systemName = DeviceInfo.getSystemName();
      console.log('systemName', systemName);

      // Get system version (e.g., 14.5)
      const systemVersion = DeviceInfo.getSystemVersion();
      console.log('systemVersion', systemVersion);

      // Get app version (from package.json)
      const appVersion = DeviceInfo.getVersion();
      console.log('appVersion', appVersion);

      // Get app build number (from package.json)
      const appBuildNumber = DeviceInfo.getBuildNumber();
      console.log('appBuildNumber', appBuildNumber);
    }
    fetchData();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (error) {
        console.error('Error requesting location permission:', error);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Now you have the latitude and longitude
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);

        // Proceed with reverse geocoding
        reverseGeocode(latitude, longitude);
      },
      error => {
        console.error('Error getting current location:', error);
      },
      {enableHighAccuracy: true, timeout: 30000, maximumAge: 1000},
    );
  };

  const reverseGeocode = (latitude, longitude) => {
    // Set your API key (required for some geocoding services)
    Geocoder.init('AIzaSyDtp3OKKerq7d8LiZjKwo78fm9QEg8MMZk');

    // Perform reverse geocoding
    Geocoder.from(latitude, longitude)
      .then(response => {
        const address = response.results[0].formatted_address;
        const city = response.results[0].address_components.find(component =>
          component.types.includes('locality'),
        ).long_name;
        const country = response.results[0].address_components.find(component =>
          component.types.includes('country'),
        ).long_name;

        console.log('Address:', address);
        console.log('City:', city);
        console.log('Country:', country);
      })
      .catch(error => {
        console.error('Error during reverse geocoding:', error);
      });
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  const getData = async () => {
    try {
      let value = await AsyncStorage.getItem('rememberedUser').then(res => {
        return res;
      });
      return value;
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    (async () => {
      let value = getData().then(res => {
        // console.log('this is res in APp');
        console.log(res);
        let v = JSON.parse(res);

        console.log('v:', v);

        if (v?.user.id) {
          dispatch(userDataFromAsyncStorage(v));
          //  SplashScreen.hide();
        } else {
          //  SplashScreen.hide();
        }
      });
    })().catch(err => {
      console.error(err);
    });
  }, []);

  // const userCheck = useSelector(state => state.userCheck);
  const userAuth = useSelector(state => state.AuthReducer);
  const otpScreenBool = useSelector(state => state.ScreenReducer.userData);
  // console.log('userAuth: ', userAuth?.userData?.user?.id);

  React.useEffect(() => {
    if (userAuth.userData?.user?.id) {
      setUserData(userAuth.userData);
    } else {
      setUserData(null);
    }
  }, [userAuth.userData]);

  useEffect(() => {
    console.log('userData:', userData);
  }, [userData]);
  useEffect(() => {
    console.log('otpScreenBool:', otpScreenBool);
  }, [otpScreenBool]);

  if (loader) return <SplashScreenPage />;

  function SplashScreenPage() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Group>
            <Stack.Screen name="splash" component={Splash} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {userData == null ? (
          <>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="TermCondition" component={TermCondition} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="PasswordChange" component={PasswordChange} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        ) : otpScreenBool ? (
          <Stack.Screen
            name="ProfileCreateStart"
            component={ProfileCreateStart}
          />
        ) : (
          <>
            <Stack.Screen name="SimpleBottomTab" component={SimpleBottomTab} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Drawer" component={Drawer} />
            <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
            <Stack.Screen name="AboutApp" component={AboutApp} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen
              name="TermsAndCondition"
              component={TermsAndCondition}
            />
            <Stack.Screen name="HelpSupport" component={HelpSupport} />
            <Stack.Screen name="DetailItem" component={DetailItem} />
            <Stack.Screen name="EditMetal" component={EditMetal} />
            <Stack.Screen name="CreateProfile" component={CreateProfile} />
            <Stack.Screen name="PortfolioMain" component={PortfolioMain} />
            <Stack.Screen name="StackedArea" component={StackedArea} />
            <Stack.Screen name='News' component={News}/>
            <Stack.Screen name='NewsScreen' component={NewsScreen}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
