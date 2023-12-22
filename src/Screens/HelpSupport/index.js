import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../Assets/Style/Color';
import Heading from '../../Components/ReusableComponent/Heading';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Text, TextInput} from 'react-native-paper';
import Input from '../../Components/ReusableComponent/Input';
import {Formik} from 'formik';
import * as yup from 'yup';
import ButtonComp from '../../Components/ReusableComponent/Button';
import {width} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import LinearGradient from 'react-native-linear-gradient';

export const HelpSupport = () => {
  const Navigation = useNavigation();

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

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{margin: 18}}>
              <Image
                source={require('../../Assets/Images/SuccessIcon.png')}
                style={{
                  alignContent: 'center',
                  alignSelf: 'center',
                  marginTop: -25,
                  marginBottom: 10,
                }}
              />
              <Heading
                Heading={'Success'}
                Fontsize={20}
                color={COLORS.dark}
                Fontweight={'bold'}
                txtAlign={'center'}
                mv={10}
              />
              <Heading
                Heading={'your message has been submitted'}
                Fontsize={16}
                color={'#514C4A'}
                // Fontweight={'bold'}
                txtAlign={'center'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                alignContent: 'center',
                alignItems: 'center',
                width: 150,
                marginBottom: -18,
              }}>
              <LinearGradient
                colors={['#BA7607', '#EDCC45']}
                style={{
                  flex: 1,
                  padding: 10,
                  marginLeft: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    Navigation.navigate('Home');
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Back to home
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            {/* </View> */}
          </View>
        </View>
      </Modal>
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
            <ScrollView>
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
                      <Ionicons name="chevron-back" size={27} color={'black'} />
                    </Pressable>
                  </View>
                  <View style={{alignSelf: 'center'}}>
                    <Heading
                      Heading={'Help & Support'}
                      Fontsize={20}
                      color={COLORS.dark}
                      Fontweight={'bold'}
                      txtAlign={'center'}
                    />
                  </View>
                  <View style={{alignSelf: 'center'}}>
                    <Heading
                      Heading={'     '}
                      Fontsize={20}
                      color={COLORS.dark}
                      Fontweight={'bold'}
                      txtAlign={'center'}
                    />
                  </View>
                </View>

                <View
                  style={{
                    alignContent: 'center',
                    alignSelf: 'center',
                    marginTop: 15,
                  }}>
                  <Image
                    source={require('../../Assets/Images/HelpAndSupport.png')}
                    style={{width: 320, height: 220}}
                    resizeMode={'contain'}
                  />
                </View>

                <View style={{marginTop: 30}}>
                  <Heading
                    Heading={'Call Now (+1) 123456789'}
                    Fontsize={20}
                    color={COLORS.dark}
                    Fontweight={'bold'}
                  />
                </View>

                <View style={{marginTop: 10}}>
                  <Heading
                    Heading={
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae vulputate velit. Nulla facilisi. Fusce interdum ornare arcu, quis accumsan sapien tincidunt vel. Donec tempus nibh a lectus eleifend, at aliquam quam pharetra. Aliquam blandit risus nunc, viverra porttitor ex mattis et. Maecenas accumsan felis et sem pellentesque faucibus. Aliquam facilisis facilisis est, vitae ultricies tortor auctor eget. Aenean ac metus porttitor, interdum mauris iaculis, commodo erat.'
                    }
                    Fontsize={14}
                    color={'grey'}
                  />
                </View>

                <View style={{marginVertical: '2%'}}>
                  <Input
                    title={'First Name'}
                    urlImg={require('../../Assets/Images/profileBlack.png')}
                    placeholder={'Enter your name'}
                  />
                  {errors.fullName && touched.fullName && (
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'red',
                        marginTop: 5,
                        marginBottom: 5,
                        marginLeft: 15,
                      }}>
                      {errors.fullName}
                    </Text>
                  )}
                </View>

                <View style={{marginVertical: '2%'}}>
                  <Input
                    title={'Email ID'}
                    urlImg={require('../../Assets/Images/emailIcon.png')}
                    placeholder={'John Doe@domain.com'}
                    pass={false}
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
                  <Heading
                    // Fontweight={'bold'}
                    Fontsize={15}
                    Heading={'Message'}
                    color={'black'}
                  />
                  <View>
                    <TextInput
                      editable
                      // multiline
                      // onChangeText={text => onChangeText(text)}
                      // value={value}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        paddingHorizontal: 0,
                        // paddingVertical: 0,
                        height: 37,
                        fontSize: 13,
                      }}
                      placeholder={'Type your message here...'}
                      placeholderTextColor={'grey'}
                      underlineColor={'transparent'}
                      activeOutlineColor={'transparent'}
                      // under
                    />
                  </View>
                  {errors.message && touched.message && (
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'red',
                        marginTop: 5,
                        marginBottom: 5,
                        marginLeft: 15,
                      }}>
                      {errors.message}
                    </Text>
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
                    btnHeight={56}
                    btnText={'Submit'}
                    justify={'center'}
                    align={'center'}
                    fontSize={16}
                    radius={30}
                    txtwidth={'100%'}
                    txtColor={COLORS.white}
                    // bgcolor={'#BA7607'}
                    press={() => {
                      setModalVisible(true);
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          </SafeArea>
        )}
      </Formik>
    </>
  );
};

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25241C',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
