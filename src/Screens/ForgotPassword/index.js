import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import COLORS from '../../Assets/Style/Color';
import ButtonComp from '../../Components/ReusableComponent/Button';
import Heading from '../../Components/ReusableComponent/Heading';
import Input from '../../Components/ReusableComponent/Input';
import * as yup from 'yup';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import { GoogleAuth } from '../../Components/GoogleAuth';
import { FaceBookAuth } from '../../Components/FaceBook';
import { AudioRecording } from '../../Components/AudioRecording';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import { BASE_URL } from '../../App/api';
import { Loader } from '../../Components/ReusableComponent/Loader';
import { postRequest } from '../../App/fetch';

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [valueEmail, onChangeTextEmail] = useState('');
  const [error, onChangeError] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  let loginValidationScheme = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required '),
  });

  const simpleLogin = value => {
    console.log('Values: ', value);
  };

  const Navigation = useNavigation();

  function isValidEmail(valueEmail) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(valueEmail);
  }

  function ForgetPassword() {
    if (valueEmail.trim() === '') {
      setErrorEmail('Email Id should not be Empty');
    } else if (!isValidEmail(valueEmail)) {
      setErrorEmail('Invalid email format');
    } else {
      const formattedEmail = valueEmail.charAt(0).toUpperCase() + valueEmail.slice(1);
      console.log('formattedEmail', formattedEmail)
      console.log('valueEmail', valueEmail)
      var formdataEmail = new FormData();
      formdataEmail.append('email', formattedEmail);

      setLoading(true);

      //Email Check Start
      postRequest(`${BASE_URL}/users/verify-email-exists/`, formdataEmail)
        .then(result => {
          // setLoading(false);
          console.log('Result: ', result.success);

          if (result.success) {
            setLoading(false);

            var formdata = new FormData();
            formdata.append('email', formattedEmail);

            setLoading(true);

            postRequest(`${BASE_URL}/users/registration/resend-otp/`, formdata)
              .then(result => {
                console.log('resuld', result);
                setLoading(false);
                if (result.success) {
                  const data = {
                    valueEmail: valueEmail,
                  };
                  Navigation.navigate('OtpScreen', data);
                } else {
                  Alert.alert('', 'User does not exist');
                }
              })
              .catch(error => {
                console.log('error', error);
                Alert.alert('Error', 'Something went wrong please try again');
                setLoading(false);
              });
          } else {
            setLoading(false);
            Alert.alert('', "Account Doesn't Exists");
          }
        })
        .catch(error => {
          setLoading(false);
          console.log('error', error);
          onChangeTextEmail('');
        });
      setErrorEmail('');
    }
  }

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validateOnMount={true}
        onSubmit={values => {
          simpleLogin(values);
        }}
        validationSchema={loginValidationScheme}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          isValid,
        }) => (
          <>
            {loading ? (
              <Loader />
            ) : (
              <ImageBackground
                source={require('../../Assets/Images/bg.png')}
                resizeMode="cover"
                style={{ flex: 1 }}>
                <ScrollView
                  contentContainerStyle={{ flexGrow: 1, marginTop: '10%' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: '8%',
                      marginTop: Platform.OS === 'ios' ? '8%' : 10,
                      marginBottom: Platform.OS === 'ios' ? '8%' : '8%',
                      // margin: '8%',
                      // marginTop: Platform.OS === 'ios' ? '8%' : 5,
                    }}>
                    <Pressable
                      onPress={() => {
                        Navigation.goBack();
                      }}>
                      <Image
                        source={require('../../Assets/Images/back.png')}
                        style={{
                          width: 30,
                          height: 30,
                          alignContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}
                      />
                    </Pressable>
                  </View>
                  <View style={{ alignItems: 'center' }}></View>
                  <View
                    style={{
                      flexGrow: 1,
                      marginHorizontal: '5%',
                      padding: 15,
                      borderRadius: 15,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginHorizontal: 35,
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 24,
                          color: '#514C4A',
                        }}>
                        Forgot Password
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: '55%',
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#514C4A',
                          textAlign: 'center',
                        }}>
                        Please enter your email to reset your password
                      </Text>
                    </View>

                    <View>
                      <View style={{ marginBottom: '1%', marginTop: '14%' }}>
                        <Input
                          title={'Email ID'}
                          urlImg={require('../../Assets/Images/emailIcon.png')}
                          placeholder={'John Doe@domain.com'}
                          pass={false}
                          value={valueEmail}
                          onChangeText={onChangeTextEmail}
                          keyboardType={'email-address'}
                          autoCapitalize={'none'}
                        />
                        {!!errorEmail && (
                          <Text
                            style={{
                              fontSize: 12,
                              color: 'red',
                              marginTop: 5,
                              // marginBottom: 15,
                              marginLeft: 37,
                            }}>
                            {'*' + errorEmail}
                          </Text>
                        )}
                      </View>
                    </View>

                    <View>
                      {error && (
                        <>
                          <InteractParagraph p={error} mv={4} color={'red'} />
                        </>
                      )}
                    </View>

                    <View
                      style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        flexDirection: 'row',
                        marginVertical: '4%',
                      }}>
                      <ButtonComp
                        btnwidth={'97%'}
                        btnHeight={56}
                        btnText={'Continue'}
                        justify={'center'}
                        align={'center'}
                        fontSize={16}
                        radius={15}
                        txtwidth={'100%'}
                        txtColor={COLORS.white}
                        color={isValid ? COLORS.primary : COLORS.border_color}
                        press={() => {
                          ForgetPassword();
                        }}
                      />
                    </View>
                  </View>
                </ScrollView>
              </ImageBackground>
            )}
          </>
        )}
      </Formik>
      {/* </SafeArea> */}
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 8,
    flexDirection: 'row',
  },
  colorSection: {
    flex: 1,
  },
});