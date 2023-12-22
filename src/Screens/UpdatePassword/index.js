import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import COLORS from '../../Assets/Style/Color';
// import ButtonComp from '../../Components/ReusableComponent/Button';
import Heading from '../../Components/ReusableComponent/Heading';
import Input from '../../Components/ReusableComponent/Input';
import * as yup from 'yup';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import {useNavigation} from '@react-navigation/native';
import {Loader} from '../../Components/ReusableComponent/Loader';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import {BASE_URL} from '../../App/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonComp from '../../Components/ReusableComponent/Button';
import {useSelector} from 'react-redux';
import {postRequestWithToken} from '../../App/fetch';

export const UpdatePassword = ({route}) => {
  const AuthReducer = useSelector(state => state.AuthReducer.userData);
  const [passHide, setPassHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oldPass, onChangeOldPass] = useState('');
  const [valuePass, onChangeTextPass] = useState('');
  const [valueConfirmPass, onChangeTextConfirmPass] = useState('');
  const [error, onChangeError] = useState('');

  let loginValidationScheme = yup.object().shape({
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required '),
  });

  const simpleLogin = value => {
    console.log('Values: ', value);
  };
  const Navigation = useNavigation();
  // console.log('route.params at password change', route.params);
  function hasValidPassword(password) {
    // Password must be at least 8 characters long
    if (password.length < 8) {
      return false;
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }

    // Check for at least one digit
    if (!/\d/.test(password)) {
      return false;
    }

    // Check for at least one special character (non-alphanumeric)
    if (!/[^A-Za-z0-9]/.test(password)) {
      return false;
    }

    return true;
  }

  function changePassword() {
    if (oldPass !== '') {
      if (valuePass !== '') {
        if (valueConfirmPass !== '') {
          if (valuePass === valueConfirmPass) {
            if (hasValidPassword(oldPass)) {
              if (hasValidPassword(valuePass)) {
                console.log('Current Password: ', oldPass);
                console.log('valuePass: ', valuePass);
                console.log('valueConfirmPass: ', valueConfirmPass);
                console.log('Match');

                
                // var formdata = new FormData();
                var formdata = new FormData();
                formdata.append('old_password', oldPass);
                formdata.append('new_password', valuePass);


                setLoading(true);

                postRequestWithToken(
                  `${BASE_URL}/users/change-password/`,
                  formdata,
                  AuthReducer.token,
                )
                  .then(result => {
                    if (result.message) {
                      console.log(result.message);
                      Alert.alert('Success', 'Password change successfully');
                      setLoading(false);
                      Navigation.navigate('Settings');
                    } else {
                      Alert.alert('Error', 'Invalid Old Password');
                      setLoading(false);
                    }
                    setLoading(false);
                  })
                  .catch(error => {
                    console.log('error', error);
                    // Alert.alert('Error', 'Invalid Old Password');
                    setLoading(false);
                  });
                onChangeError('');
              } else {
                console.log('Not Match');
                onChangeError(
                  'New Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
                );
              }
            } else {
              console.log('Not Match');
              onChangeError(
                'Current Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
              );
            }
          } else {
            console.log('Not Match');
            onChangeError('New Password and confirm Password do not match');
          }
        } else {
          onChangeError('Confirm Password should not be Empty');
        }
      } else {
        onChangeError('New Password should not be Empty');
      }
    } else {
      onChangeError('Current Password should not be Empty');
    }
  }

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
              <SafeArea>
                <ScrollView style={{flex: 1}}>
                  <View style={{marginHorizontal: '5%', marginVertical: '8%'}}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          alignSelf: 'center',
                          backgroundColor: '#EDCC45',
                          borderRadius: 10,
                        }}>
                        <Pressable
                          onPress={() => {
                            Navigation.navigate('Settings');
                          }}>
                          <Ionicons
                            name="chevron-back"
                            size={27}
                            color={'black'}
                          />
                        </Pressable>
                      </View>
                      <View style={{alignSelf: 'center'}}>
                        <Heading
                          Heading={'Change Password'}
                          Fontsize={20}
                          color={COLORS.dark}
                          Fontweight={'bold'}
                          txtAlign={'center'}
                        />
                      </View>
                      <View style={{alignSelf: 'center'}}>
                        <Text> </Text>
                      </View>
                    </View>
                    <View>
                      <View style={{marginTop: '14%', marginBottom: '5%'}}>
                        <Input
                          title={'Current Password'}
                          urlImg={require('../../Assets/Images/passIcon.png')}
                          placeholder={'************0'}
                          pass={'true'}
                          value={oldPass}
                          onChangeText={onChangeOldPass}
                        />
                        {errors.password && touched.password && (
                          <Text
                            style={{
                              fontSize: 12,
                              color: 'red',
                              marginTop: 5,
                              marginBottom: 5,
                              marginLeft: 15,
                            }}>
                            {errors.password}
                          </Text>
                        )}
                      </View>

                      <View style={{marginTop: '4%', marginBottom: '5%'}}>
                        <Input
                          title={'New Password'}
                          urlImg={require('../../Assets/Images/passIcon.png')}
                          placeholder={'************0'}
                          pass={'true'}
                          value={valuePass}
                          onChangeText={onChangeTextPass}
                        />
                        {errors.password && touched.password && (
                          <Text
                            style={{
                              fontSize: 12,
                              color: 'red',
                              marginTop: 5,
                              marginBottom: 5,
                              marginLeft: 15,
                            }}>
                            {errors.password}
                          </Text>
                        )}
                      </View>

                      <View style={{marginTop: '4%', marginBottom: '5%'}}>
                        <Input
                          title={'Confirm New Password'}
                          urlImg={require('../../Assets/Images/passIcon.png')}
                          placeholder={'************0'}
                          pass={'true'}
                          value={valueConfirmPass}
                          onChangeText={onChangeTextConfirmPass}
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                          <Text
                            style={{
                              fontSize: 12,
                              color: 'red',
                              marginTop: 5,
                              marginBottom: 5,
                              marginLeft: 15,
                            }}>
                            {errors.confirmPassword}
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
                        marginTop: '4%',
                      }}>
                      <ButtonComp
                        btnwidth={'97%'}
                        btnHeight={560}
                        btnText={'Update Password'}
                        justify={'center'}
                        align={'center'}
                        fontSize={16}
                        radius={15}
                        txtwidth={'100%'}
                        txtColor={COLORS.white}
                        color={isValid ? COLORS.primary : COLORS.border_color}
                        // enable={!isValid}
                        press={() => {
                          // Navigation.navigate('login');
                          changePassword();
                        }}
                        // bgcolor={'#BA7607'}
                      />
                    </View>
                  </View>
                </ScrollView>
              </SafeArea>
            )}
          </>
        )}
      </Formik>
      {/* </SafeArea> */}
    </>
  );
};