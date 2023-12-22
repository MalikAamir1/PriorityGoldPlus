import {Formik} from 'formik';
import React, {useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import COLORS from '../../Assets/Style/Color';
import ButtonComp from '../../Components/ReusableComponent/Button';
import Heading from '../../Components/ReusableComponent/Heading';
import Input from '../../Components/ReusableComponent/Input';
import * as yup from 'yup';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import { Loader } from '../../Components/ReusableComponent/Loader';

export const CreateProfile = () => {
  const [passHide, setPassHide] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const simpleLogin = value => {
    console.log('Values: ', value);
  };
  return (
    <>
      <SafeArea>
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
            <SafeArea>
              {loading ? (
                <Loader />
              ) : (
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                  <View style={{alignItems: 'center', marginTop: '20%'}}>
                    <Image
                      source={require('../../Assets/Images/placeHolder.png')}
                      style={{width: 100, height: 100}}
                    />
                  </View>

                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexGrow: 1,
                      margin: '5%',
                      backgroundColor: COLORS.white,
                      padding: 15,
                      borderRadius: 15,
                    }}>
                    <View>
                      <Heading
                        Stylefont={'normal'}
                        Fontweight={'bold'}
                        Fontsize={34}
                        txtAlign={'center'}
                        p={10}
                        lh={40}
                        Heading={'Create Profile'}
                      />
                    </View>
                    <View style={{marginTop: 0}}>
                      <Heading
                        Fontsize={15}
                        txtAlign={'center'}
                        Heading={'Please enter your new password'}
                      />
                    </View>
                    <View style={{marginTop: 0}}>
                      <View>
                        <Input
                          iconFunction={() => setPassHide(!passHide)}
                          rightIcon={true}
                          IconName={
                            passHide ? 'eye-outline' : 'eye-off-outline'
                          }
                          Onchange={handleChange('password')}
                          Onblur={handleBlur('password')}
                          Value={values.password}
                          Pass={passHide ? false : true}
                          outline={COLORS.border_color}
                          mode={'outlined'}
                          label="Password"
                          // IconName="check"
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

                      <View style={{marginVertical: '2%'}}>
                        <Input
                          iconFunction={() => setPassHide(!passHide)}
                          rightIcon={true}
                          IconName={
                            passHide ? 'eye-outline' : 'eye-off-outline'
                          }
                          Onchange={handleChange('confirmPassword')}
                          Onblur={handleBlur('confirmPassword')}
                          Value={values.confirmPassword}
                          Pass={passHide ? false : true}
                          outline={COLORS.border_color}
                          mode={'outlined'}
                          label="Confirm Password"
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

                      <View style={{marginVertical: '2%'}}>
                        <Input
                          Onchange={handleChange('email')}
                          Onblur={handleBlur('email')}
                          Value={values.email}
                          Keyboard={'email-address'}
                          outline={COLORS.border_color}
                          mode={'outlined'}
                          label="Email address"
                        />
                        {errors.email && touched.email && (
                          <Text
                            style={{
                              fontSize: 12,
                              color: 'red',
                              marginTop: 5,
                              marginBottom: 5,
                              marginLeft: 15,
                            }}>
                            {errors.email}
                          </Text>
                        )}
                      </View>
                      <View style={{marginVertical: '2%'}}>
                        <Input
                          Onchange={handleChange('Address')}
                          Onblur={handleBlur('Address')}
                          Value={values.Address}
                          outline={COLORS.border_color}
                          mode={'outlined'}
                          label="Address"
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

                    <View
                      style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        flexDirection: 'row',
                        marginTop: '4%',
                      }}>
                      <ButtonComp
                        btnwidth={'97%'}
                        btnHeight={56}
                        btnText={'Submit'}
                        justify={'center'}
                        align={'center'}
                        fontSize={16}
                        radius={15}
                        txtwidth={'100%'}
                        txtColor={COLORS.white}
                        // color={isValid ? COLORS.primary : COLORS.border_color}
                        // enable={!isValid}
                        press={handleSubmit}
                      />
                    </View>
                  </View>
                </ScrollView>
              )}
            </SafeArea>
          )}
        </Formik>
      </SafeArea>
    </>
  );
};
