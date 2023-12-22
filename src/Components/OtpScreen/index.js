import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  View,
  Modal,
  I18nManager,
  StyleSheet,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Heading from '../../Components/ReusableComponent/Heading';
import COLORS from '../../Assets/Style/Color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import ButtonComp from '../../Components/ReusableComponent/Button';
import {ScrollView} from 'react-native-gesture-handler';
import {OtpInput} from '../../Components/Otp';
import {BASE_URL} from '../../App/api';
import {
  getDataFromAsync,
  setDataToAsync,
} from '../../Utils/getAndSetAsyncStorage';
import {useDispatch} from 'react-redux';
import {userDataFromAsyncStorage} from '../../Store/Reducers/AuthReducer';
import {otpScreen} from '../../Store/Reducers/ScreenReducer';
// import OTPTimer from '../OtpTimer';
import TimerCircle from '../OtpTimer';
import {Loader} from '../ReusableComponent/Loader';
import { postRequest } from '../../App/fetch';

export const OtpScreen = ({route}) => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(59); // Replace 60 with the initial value of your timer
  // console.log('route params: ', route.params);
  // if (route.params) {
  //   // const {screenName} = route.params;
  //   console.log('Complete Data From Previus Screen ', route.params);
  //   console.log('Screen name', route.params.screenName);
  // }
  // console.log('screenName: ', screenName);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log('modalVisible: ', modalVisible);
  }, [modalVisible]);

  const otpValue = useRef('');

  const otpCheck = () => {
    console.log('otpValue:', otpValue.current.length);
    if (otpValue.current.length === 6) {
      console.log('Length is: ', otpValue.current);
      console.log('Length is: ', otpValue.current.length);

      //OTP Start checking

      var formdata = new FormData();
      formdata.append('email', route.params.valueEmail);
      formdata.append('otp', otpValue.current);

      console.log('formdata:', formdata);

      setLoading(true);

      postRequest(`${BASE_URL}/users/registration/verify-otp/`, formdata)
        .then(result => {
          console.log(result.success);
          console.log('otp result', result);
          if (result.success) {
            Alert.alert('Verified', result.message);
            if (route.params.screenName == 'ProfileCreated') {

              
              var formdata = new FormData();
              formdata.append('username', route.params.valueEmail);
              formdata.append('password', route.params.valuePass);

              setLoading(true);

              postRequest(`${BASE_URL}/users/login/token/`, formdata)
                .then(result => {
                  console.log('result', result);
                  setLoading(false);
                  if (result?.non_field_errors) {
                    console.log('Not found');
                    Alert.alert('', result?.non_field_errors[0]);
                  } else {
                    dispatch(otpScreen(true));
                    setDataToAsync('token', JSON.stringify(result.token));
                    setDataToAsync('user', JSON.stringify(result));

                    getDataFromAsync('user')
                      .then(res => {
                        dispatch(userDataFromAsyncStorage(JSON.parse(res)));
                        console.log('res: ', res);
                      })
                      .catch(err => {
                        console.log(
                          'Error From getting from local storage: ',
                          err,
                        );
                      });

                  }
                })
                .catch(error => {
                  console.log('error', error);
                  setLoading(false);
                });
            } else {
              console.log('token', result.token);
              Navigation.navigate('PasswordChange', result.token);
            }
          } else {
            Alert.alert('Error', result.message);
          }
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.log('error', error);
        });
      //OTP End checking
    } else {
      console.log('Length is: ', otpValue.current);
      console.log('Length is not Equal');
    }
  };

  const ResendOtp = () => {

    var formdata = new FormData();
    formdata.append('email', route.params.valueEmail);

    setLoading(true);
    postRequest(`${BASE_URL}/users/registration/resend-otp/`, formdata)
      .then(result => {
        console.log(result);
        if (result.success) {
          Alert.alert('Successfull', result.message);
          setSeconds(59);
        } else {
          Alert.alert('Error', 'Something went wrong please try again');
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        Alert.alert('Error', 'Something went wrong please try again');
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={{flex: 1}}>
          <ImageBackground
            source={require('../../Assets/Images/bgOtp.png')}
            resizeMode="cover"
            style={{flex: 1}}>
            <ScrollView style={{flex: 1, flexGrow: 1}}>
              {/* Header */}
              <SafeAreaView style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 20,
                    marginTop: Platform.OS === 'ios' ? 35 : 30,
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                      backgroundColor: '#EDCC45',
                      borderRadius: 10,
                    }}>
                    <Pressable
                      onPress={() => {
                        Navigation.goBack();
                      }}>
                      <Ionicons name="chevron-back" size={30} color={'black'} />
                    </Pressable>
                  </View>
                </View>

                {/* Center */}
                <View style={{marginTop: '10%', marginHorizontal: '15%'}}>
                  <Heading
                    Fontsize={30}
                    txtAlign={'center'}
                    Heading={'OTP'}
                    Fontweight={'bold'}
                    color={'#514C4A'}
                  />
                  <Heading
                    Fontsize={16}
                    txtAlign={'center'}
                    Heading={
                      'We have sent you an email containing 6 digits verification code. Please enter the code to verify your identity'
                    }
                    // Fontweight={'bold'}
                    color={'#514C4A'}
                  />
                </View>

                <View style={styles.container}>
                  <OtpInput otpValue={otpValue} />
                </View>
                <View
                  style={{
                    marginTop: '4%',
                    marginBottom: Platform.OS === 'ios' ? 30 : 20,
                    flex: 1,
                    marginHorizontal: '10%',
                  }}>
                  <ButtonComp
                    btnText={'Continue'}
                    press={() => {
                      otpCheck();
                      // if (route.params) {
                      //   Navigation.navigate('PasswordChange');
                      // } else {
                      //   Navigation.navigate('ProfileCreateStart');
                      // }
                    }}
                  />
                </View>

                <View style={{marginBottom: 80}}>
                  <TimerCircle seconds={seconds} setSeconds={setSeconds} />
                  {/* <Image
                    source={require('../../Assets/Images/timer.png')}
                    style={{
                      //   height: '50%',
                      width: '40%',
                      alignSelf: 'center',
                      //   backgroundColor: 'pink',
                    }}
                    resizeMode={'contain'}
                  /> */}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}>
                  <Heading
                    Fontsize={15}
                    as={'center'}
                    Heading={"Code didn't receive?"}
                    color={COLORS.dark}
                  />

                  <Button
                    textColor={'black'}
                    style={{marginLeft: -8}}
                    onPress={() => ResendOtp()}>
                    <Text
                      style={{
                        textDecorationLine: 'underline',
                        fontWeight: 'bold',
                        color: '#514C4A',
                        fontWeight: 'bold',
                      }}>
                      Resend
                    </Text>
                  </Button>
                </View>
              </SafeAreaView>
            </ScrollView>
          </ImageBackground>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
});