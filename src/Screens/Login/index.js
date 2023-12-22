import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {ActivityIndicator, Button, Switch, Text} from 'react-native-paper';
import COLORS from '../../Assets/Style/Color';
import ButtonComp from '../../Components/ReusableComponent/Button';
import Heading from '../../Components/ReusableComponent/Heading';
import Input from '../../Components/ReusableComponent/Input';
import * as yup from 'yup';
import {GoogleAuth} from '../../Components/GoogleAuth';
import {FaceBookAuth} from '../../Components/FaceBook';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../../App/api';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import {
  getDataFromAsync,
  setDataToAsync,
} from '../../Utils/getAndSetAsyncStorage';
import {userDataFromAsyncStorage} from '../../Store/Reducers/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../../Components/ReusableComponent/Loader';
import {postRequest} from '../../App/fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = () => {
  const [passHide, setPassHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valueEmail, onChangeTextEmail] = useState('');
  const [valuePass, onChangeTextPass] = useState('');
  const [error, onChangeError] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Added state for "Remember Me"

  const dispatch = useDispatch();

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  console.log('rememberMe: ', rememberMe);

  let loginValidationScheme = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required '),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required '),
  });

  function isValidEmail(valueEmail) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(valueEmail);
  }

  function hasValidPassword(valuePass) {
    // Password must be at least 8 characters long
    if (valuePass.length < 8) {
      return false;
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(valuePass)) {
      return false;
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(valuePass)) {
      return false;
    }

    // Check for at least one digit
    if (!/\d/.test(valuePass)) {
      return false;
    }

    // Check for at least one special character (non-alphanumeric)
    if (!/[^A-Za-z0-9]/.test(valuePass)) {
      return false;
    }

    return true;
  }

  function Login() {
    let isValid = true;

    if (!valueEmail) {
      setErrorEmail('Email cannot be empty.');
      isValid = false;
    } else if (!isValidEmail(valueEmail)) {
      setErrorEmail('Enter valid email');
      isValid = false;
    } else {
      setErrorEmail('');
    }

    if (!valuePass) {
      setErrorPass('Password cannot be empty');
      isValid = false;
    } else if (!hasValidPassword(valuePass)) {
      setErrorPass(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
      );
      isValid = false;
    } else {
      setErrorPass('');
    }

    if (isValid) {
      console.log('valueEmail: ', valueEmail);
      console.log('valuePass: ', valuePass);
      console.log('Match');

      var formdataEmail = new FormData();
      formdataEmail.append('email', valueEmail);

      setLoading(true);

      postRequest(`${BASE_URL}/users/verify-email-exists/`, formdataEmail)
        .then(result => {
          // setLoading(false);
          console.log('Result: ', result.success);
          if (result.success) {
            setLoading(false);
            var formdata = new FormData();
            formdata.append('username', valueEmail);
            formdata.append('password', valuePass);

            setLoading(true);
            postRequest(`${BASE_URL}/users/login/token/`, formdata)
              .then(result => {
                console.log(result);
                setLoading(false);
                if (result?.non_field_errors) {
                  console.log('Not found');
                  Alert.alert('', 'Password is incorrect');
                  // onChangeTextEmail('')
                  // onChangeTextPass('')
                } else {
                  if (rememberMe) {
                    try {
                      setDataToAsync(
                        'rememberedUser',
                        JSON.stringify(
                          result,
                          //   {
                          //   email: valueEmail,
                          //   password: valuePass,
                          // }
                        ),
                      );
                      console.log('aaaaaaaaa');
                      getDataFromAsync('rememberedUser')
                        .then(res => {
                          dispatch(userDataFromAsyncStorage(JSON.parse(res)));
                          console.log('res in dispatch: ', res);
                        })
                        .catch(err => {
                          console.log(
                            'Error From getting from local storage: ',
                            err,
                          );
                        });
                    } catch (error) {
                      console.error('Error saving credentials:', error);
                    }
                  } else {
                    console.log('result in dispatch: ', result);
                    // dispatch(result);
                    dispatch(userDataFromAsyncStorage(result));
                  }

                  // setDataToAsync('token', JSON.stringify(result.token));
                  // setDataToAsync('user', JSON.stringify(result));

                  // Navigation.navigate('SimpleBottomTab', result);
                }
                // onChangeTextEmail('');
                // onChangeTextPass('');
              })
              .catch(error => {
                console.log('error ff', error);
                setLoading(false);
              });
          } else {
            setLoading(false);
            onChangeError('');
            Alert.alert('', 'Invalid Email');
            // onChangeTextEmail('')
            // onChangeTextPass('')
          }
        })
        .catch(error => {
          setLoading(false);
          console.log('error', error);
          // onChangeTextEmail('');
        });
      // onChangeError('');
    }
  }

  const Navigation = useNavigation();

  return (
    <>
      {/* <SafeArea> */}
      <Formik
        initialValues={{email: '', password: ''}}
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
                style={{flex: 1}}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                  {/* Add this line */}
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: Platform.OS === 'ios' ? '25%' : 45,
                    }}>
                    <Image
                      // source={require('../../Assets/Images/logIcon.png')}
                      source={require('../../Assets/Images/logicon2.png')}
                      style={{width: 140, height: 150}}
                      resizeMode={'contain'}
                    />
                  </View>
                  <View
                    style={{
                      flexGrow: 1,
                      marginHorizontal: '3%',
                      padding: 15,
                      borderRadius: 15,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 35,
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 20,
                          color: '#BA7607',
                        }}>
                        Sign In
                      </Text>
                      <Pressable
                        onPress={() => {
                          Navigation.navigate('SignUp');
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: '#A8A8A8',
                          }}>
                          Sign Up
                        </Text>
                      </Pressable>
                    </View>

                    <View style={styles.line}>
                      <View
                        style={[
                          styles.colorSection,
                          {flex: 1, backgroundColor: '#BA7607'},
                        ]}
                      />
                      <View
                        style={[
                          styles.colorSection,
                          {flex: 1, backgroundColor: '#A8A8A8'},
                        ]}
                      />
                    </View>

                    <View>
                      <View style={{marginBottom: '1%', marginTop: '4%'}}>
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
                      <View style={{marginVertical: '3%'}}>
                        <Input
                          title={'Password'}
                          urlImg={require('../../Assets/Images/passIcon.png')}
                          placeholder={'************0'}
                          pass={'true'}
                          value={valuePass}
                          onChangeText={onChangeTextPass}
                        />
                        {!!errorPass && (
                          <Text
                            style={{
                              fontSize: 12,
                              color: 'red',
                              marginTop: 5,
                              // marginBottom: 15,
                              marginLeft: 37,
                            }}>
                            {'*' + errorPass}
                          </Text>
                        )}
                      </View>

                      <View
                        style={{
                          justifyContent: 'space-between',
                          alignContent: 'center',
                          flexDirection: 'row',
                          marginHorizontal: -15,
                        }}>
                        <View
                          style={{
                            alignSelf: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Switch
                            trackColor={{false: 'black', true: '#BA7607'}}
                            thumbColor={isEnabled ? 'white' : '#f4f3f4'}
                            onValueChange={value => {
                              setRememberMe(value);
                              toggleSwitch();
                            }}
                            value={rememberMe} // Updated value to rememberMe
                            style={{
                              transform: [{scaleX: 0.6}, {scaleY: 0.6}],
                            }}
                          />
                          <Text style={{color: '#667080', fontSize: 14}}>
                            Remember me
                          </Text>
                        </View>

                        <Button
                          textColor={'#667080'}
                          onPress={() => Navigation.navigate('ForgotPassword')}>
                          <Text style={{color: '#667080', fontSize: 14}}>
                            {' '}
                            Forgot Password?
                          </Text>
                        </Button>
                      </View>
                    </View>

                    <View
                      style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        flexDirection: 'row',
                        marginVertical: '4%',
                      }}>
                      <ButtonComp
                        btnText={'Sign In'}
                        press={() => {
                          // Navigation.navigate('SimpleBottomTab');
                          Login();
                        }}
                      />
                    </View>
                    <View style={{marginTop: -5}}>
                      {error && (
                        <>
                          <InteractParagraph
                            txtAlign={'center'}
                            p={error}
                            mv={4}
                            color={'red'}
                          />
                        </>
                      )}
                    </View>
                    <View style={styles.container}>
                      <View style={styles.line2} />
                      <Text style={styles.text}>or</Text>
                      <View style={styles.line2} />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        alignSelf: 'center',
                      }}>
                      <GoogleAuth />
                      <FaceBookAuth />
                      <Pressable
                        onPress={() => {
                          // Navigation.navigate('SimpleBottomTab');
                        }}>
                        <Image
                          source={require('../../Assets/Images/twiterIcon.png')}
                          style={{width: 70, height: 70}}
                        />
                      </Pressable>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        alignSelf: 'center',
                      }}>
                      <Heading
                        Fontsize={15}
                        as={'center'}
                        Heading={"Don't have an account?"}
                        color={COLORS.dark}
                      />
                      <Button
                        textColor={'#514C4A'}
                        style={{marginLeft: -8}}
                        onPress={() => Navigation.navigate('SignUp')}>
                        <Text
                          style={{
                            textDecorationLine: 'underline',
                            color: '#514C4A',
                            fontWeight: 'bold',
                          }}>
                          Sign Up
                        </Text>
                      </Button>
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
    height: 4,
    flexDirection: 'row',
  },
  colorSection: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line2: {
    flex: 1,
    height: 1,
    backgroundColor: '#D0CBBB',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
