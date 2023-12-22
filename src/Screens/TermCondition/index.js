import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import COLORS from '../../Assets/Style/Color';
import ButtonComp from '../../Components/ReusableComponent/Button';
import Heading from '../../Components/ReusableComponent/Heading';
import Input from '../../Components/ReusableComponent/Input';
import * as yup from 'yup';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {ModalView} from '../../Components/ReusableComponent/Modal';
import LinearGradient from 'react-native-linear-gradient';
import {width} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { BASE_URL } from '../../App/api';
import { Loader } from '../../Components/ReusableComponent/Loader';
import { postRequest } from '../../App/fetch';

export const TermCondition = ({route}) => {
  const [passHide, setPassHide] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log('data From Signup Page', route.params);

  const DataFromSignUp = route.params;

  

  const Navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  function EmailSentForOtp() {

    var formdata = new FormData();

    formdata.append('email', DataFromSignUp.valueEmail);
    formdata.append('password', DataFromSignUp.valuePass);
    formdata.append('profile.display_name', DataFromSignUp.valueEmail);

    setLoading(true);

    postRequest(`${BASE_URL}/users/registration/user/`, formdata)
      .then(result => {
        setLoading(false);
        Navigation.navigate('OtpScreen', DataFromSignUp);
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
        onChangeTextEmail('');
        onChangeTextPass('');
        onChangeTextConfirmPass('');
      });
  }

  return (
    <>
      <ModalView
        set={setModalVisible}
        get={modalVisible}
        cross={() => setModalVisible(false)}
        txt={'Are you sure you want to reject?'}
        no={() => {
          setModalVisible(false);
        }}
        yes={() => {
          setModalVisible(!modalVisible);
          Navigation.navigate('SignUp');
        }}
      />

      {/* <SafeArea>
        <SafeArea> */}
      {loading ? (
        <Loader />
      ) : (
        <ImageBackground
          source={require('../../Assets/Images/bg.png')}
          resizeMode="cover"
          style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
                marginVertical: '8%',
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: '3%',
                    justifyContent: 'space-between',
                    marginTop: Platform.OS === 'ios' ? '10%' : 0,
                  }}>
                  <View>
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
                  <View>
                    <Heading
                      Stylefont={'normal'}
                      Fontweight={'bold'}
                      Fontsize={18}
                      Heading={'Terms Of Service'}
                      color={'black'}
                    />
                  </View>
                  <View>
                    <Heading
                      Stylefont={'normal'}
                      Fontweight={'bold'}
                      Fontsize={18}
                      Heading={'             '}
                      color={'black'}
                    />
                  </View>
                </View>
                <View style={{marginHorizontal: '4%', marginTop: '10%'}}>
                  <Heading
                    //   Stylefont={'normal'}
                    Fontweight={'bold'}
                    Fontsize={18}
                    Heading={'Nullam Porta Diam Id Dolar'}
                    color={COLORS.dark}
                  />
                  <Heading
                    Stylefont={'normal'}
                    Fontsize={13}
                    Heading={
                      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                    }
                    color={COLORS.dark}
                  />
                </View>
                <View style={{marginHorizontal: '4%', marginTop: '5%'}}>
                  <Heading
                    Fontweight={'bold'}
                    Fontsize={18}
                    Heading={'Nullam Porta Diam Id Dolar'}
                    color={COLORS.dark}
                  />
                  <Heading
                    Stylefont={'normal'}
                    Fontsize={13}
                    Heading={
                      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                    }
                    color={COLORS.dark}
                  />
                </View>
              </View>

              <View
                style={{
                  margin: '5%',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      borderColor: '#000000',
                      padding: 8,
                      marginRight: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 175,
                      borderRadius: 30,
                    }}
                    onPress={() => {
                      setModalVisible(true);
                    }}>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 17,
                        fontWeight: 'bold',
                      }}>
                      Reject
                    </Text>
                  </TouchableOpacity>
                  <LinearGradient
                    colors={['#BA7607', '#EDCC45']}
                    style={{
                      flex: 1,
                      marginLeft: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 175,
                      borderRadius: 30,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 190,
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        // Navigation.navigate('OtpScreen',DataFromSignUp);
                        EmailSentForOtp();
                      }}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 17,
                          fontWeight: 'bold',
                        }}>
                        Accept
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      )}
      {/* </SafeArea>
      </SafeArea> */}
    </>
  );
};

const styles = StyleSheet.create({
  mainBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '8%',
    // Bottom:'30%'
    // marginBottom: 30,
    alignSelf: 'center',
    // margin:100
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // margin:10,
    // marginTop: 22,
    backgroundColor: '#25241C',
    opacity: 0.9,
  },
  modalView: {
    margin: 35,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
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