import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, RadioButton, Text} from 'react-native-paper';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useDispatch, useSelector} from 'react-redux';
import COLORS from '../../Assets/Style/Color';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import Heading from '../../Components/ReusableComponent/Heading';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {ModalView} from '../../Components/ReusableComponent/Modal';
import MultiLineChart from '../../Components/ReusableComponent/MultiLineChart';
import {getRequestWithOutBody} from '../../App/fetch';
import {BASE_URL} from '../../App/api';
import {Loader} from '../../Components/ReusableComponent/Loader';
import PortfolioReducer, { portfolio } from '../../Store/Reducers/PortfolioReducer';

export const PortfolioMain = ({route}) => {
  const Navigation = useNavigation();
  const [userDataFromFacebook, setUserDataFromFacebook] = useState([]);
  // console.log('route.params', route.params);
  const [focus, setFocus] = useState(1);
  const [secondFocus, setSecondFocus] = useState(1);
  const [dataPortfolioSummary, setDataPortfolioSummary] = useState([]);
  const portfoliofromReducer = useSelector(
    state => state.PortfolioReducer.data,
  );
  const [loading, setLoading] = useState(false);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setDataPortfolioSummary(portfoliofromReducer);
  }, [portfoliofromReducer]);

  const [checked, setChecked] = React.useState('first');

  // const {AuthReducer} = useSelector(state => state);
  // console.log('reducerData: ', AuthReducer.userData);

  const [modalVisible, setModalVisible] = useState(false);

  const data = [
    {
      id: 1,
      first1: 'Gold',
      first2: 'MM/DD/YYYY',
      Second1: '$2,980',
      Second2: '+340 (+5,041)',
      third1: '$3,050',
      third2: '(5 min ago)',
      status: 'up',
    },
    {
      id: 2,
      first1: 'Platinum',
      first2: 'MM/DD/YYYY',
      Second1: '$2,980',
      Second2: '+340 (+5,041)',
      third1: '$3,050',
      third2: '(2 min ago)',
      status: 'up',
    },
    {
      id: 3,
      first1: 'Pallidium',
      first2: 'MM/DD/YYYY',
      Second1: '$2,980',
      Second2: '+340 (+5,041)',
      third1: '$3,050',
      third2: '(1 min ago)',
      status: 'down',
    },
    {
      id: 4,
      first1: 'Silver',
      first2: 'MM/DD/YYYY',
      Second1: '$2,980',
      Second2: '+340 (+5,041)',
      third1: '$3,050',
      third2: '(3 min ago)',
      status: 'down',
    },
  ];

  function PortfolioSummary() {
    setLoading(true);
    getRequestWithOutBody(
      `${BASE_URL}/portfolio/user-portfolio-summary/`,
      AuthReducer.userData.token,
    )
      .then(result => {
        setLoading(false);

        console.log(result);
        setDataPortfolioSummary(result);
        console.log('dataPortfolioSummary: ', dataPortfolioSummary);
        dispatch(portfolio(result));
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
      });
  }

  const renderItem = ({item}) => (
    <>
      <Pressable
        onPress={() => {
          Navigation.navigate('DetailItem', {
            metalName: item?.metal_name,
            metalId: item?.metal_id,
          });
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: 'transparent',
          }}>
          <View
            style={{
              alignItems: 'flex-start',
              alignContent: 'center',
              alignSelf: 'center',
              // backgroundColor: 'pink',
            }}>
            <Heading
              Heading={item?.metal_name}
              Fontsize={20}
              color={COLORS.dark}
              txtAlign={'center'}
              Fontweight={'bold'}
            />
            <Heading
              Heading={item?.total_ounces + ' ounces'}
              Fontsize={14}
              color={COLORS.dark}
              txtAlign={'center'}
            />
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              // backgroundColor: 'pink',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <Heading
              Heading={item?.total_acquisition_value}
              Fontsize={14}
              color={COLORS.dark}
              txtAlign={'center'}
            />
            <Heading
              Heading={
                `${item?.total_difference_value} ` +
                '(' +
                `${
                  item?.total_difference_value > 0
                    ? item?.total_percentage_change
                    : -item?.total_percentage_change
                }` +
                '%)'
              }
              Fontsize={14}
              color={item?.total_difference_value > 0 ? '#17A72A' : '#F80608'}
              txtAlign={'center'}
            />
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              // flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              {item?.total_difference_value > 0 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: '100%',
                    marginHorizontal: 5,
                  }}>
                  <Image
                    source={require('../../Assets/Images/upIconGreen.png')}
                  />
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: '100%',
                    marginHorizontal: 5,
                  }}>
                  <Image
                    source={require('../../Assets/Images/downIconRed.png')}
                  />
                </View>
              )}
              <View
                style={{
                  backgroundColor:
                    item?.total_difference_value > 0 ? '#B5EFCD' : '#FEBFC0',
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Heading
                  Heading={item?.total_current_value}
                  // txtAlign="center"
                  minWidth={50}
                  Fontsize={14}
                  color={
                    item?.total_difference_value > 0 ? '#17A72A' : '#F80608'
                  }
                  txtAlign={'center'}
                  Fontweight={'bold'}
                />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            marginVertical: '3%',
          }}
        />
      </Pressable>
    </>
  );

  const ListHeaderComponent = () => {
    return (
      <>
        <View
          style={{
            marginHorizontal: '1%',
            // marginTop: '3%',
            marginTop: Platform.OS === 'ios' ? 0 : '7%',
            // marginBottom: 20,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{alignSelf: 'center'}}>
              <Pressable
                onPress={() => {
                  Navigation.navigate('DetailItem', {
                    metalId: route.params.metalId,
                    metalName: route.params.metalName,
                  });
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
                {/* <MaterialIcons name="menu-open" size={30} color={'black'} /> */}
              </Pressable>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Heading
                Heading={'Portfolio'}
                Fontsize={20}
                color={COLORS.dark}
                Fontweight={'bold'}
                txtAlign={'center'}
              />
            </View>
            <View
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '15%',
              }}>
              <Pressable
                onPress={() => {
                  setModalVisible(true);
                }}>
                <AntDesign name="delete" size={20} color={'#514C4A'} />
              </Pressable>

              <Pressable
                onPress={() => {
                  Navigation.navigate('EditMetal');
                }}>
                <Feather name="edit" size={20} color={'#514C4A'} />
              </Pressable>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#FDF8E2',
              borderRadius: 20,
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 20,
              shadowColor: 'black',
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 5,
              marginTop: 20,
            }}>
            <View style={{marginVertical: 10}}>
              <Heading
                Heading={route.params.metalName}
                Fontsize={24}
                color={COLORS.dark}
                Fontweight={'bold'}
                txtAlign={'center'}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Heading
                  Heading={'Grams'}
                  Fontsize={16}
                  color={COLORS.dark}
                  Fontweight={'bold'}
                  mt={5}
                  //   as={'flex-end'}
                />
                <Heading
                  Heading={'Purchase Date'}
                  Fontsize={16}
                  color={COLORS.dark}
                  Fontweight={'bold'}
                  mt={5}

                  //   as={'flex-end'}
                />
                <Heading
                  Heading={'Acquisition Cost'}
                  Fontsize={16}
                  color={COLORS.dark}
                  Fontweight={'bold'}
                  as={'flex-end'}
                  mt={5}
                />
                <Heading
                  Heading={'Current Value'}
                  Fontsize={16}
                  color={COLORS.dark}
                  Fontweight={'bold'}
                  //   as={'flex-end'}
                  mt={5}
                />
              </View>

              <View
                style={{marginVertical: 10, justifyContent: 'space-between'}}>
                <Heading
                  Heading={'45'}
                  Fontsize={12}
                  color={'#A8A8A8'}
                  // Fontweight={'bold'}
                  as={'flex-end'}
                  mt={5}
                />

                <Heading
                  Heading={'MM/DD/YYYY'}
                  Fontsize={14}
                  color={'#514C4A'}
                  Fontweight={'bold'}
                  as={'flex-end'}
                  mt={9}
                />
                <Heading
                  Heading={'$2,905'}
                  Fontsize={14}
                  color={'#17A72A'}
                  Fontweight={'bold'}
                  as={'flex-end'}
                  mt={9}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginLeft: 18,
                    alignContent: 'space-between',
                    marginTop: 5,
                  }}>
                  <Image
                    source={require('../../Assets/Images/upIconGreen.png')}
                    style={{width: 8, marginRight: 4}}
                    resizeMode={'contain'}
                  />
                  <Heading
                    Heading={'$3,050'}
                    Fontsize={14}
                    color={'#17A72A'}
                    Fontweight={'bold'}
                    as={'flex-end'}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'center',
              marginVertical: 15,
              width: '100%',
              backgroundColor: 'white',
              borderRadius: 20,
              shadowColor: 'black',
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 5,
            }}>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <View
                style={{
                  marginHorizontal: 2,
                  marginVertical: 10,
                  width: '22%',
                  borderRadius: 100,
                }}>
                <Pressable
                  onPress={() => {
                    setFocus(1);
                  }}>
                  {focus == 1 ? (
                    <ImageBackground
                      source={require('../../Assets/Images/CTASMALL.png')}
                      resizeMode={'contain'}
                      style={{width: '100%'}}>
                      <Button
                        style={{width: '100%'}}
                        textColor="white"
                        // onPress={() => Navigation.navigate('ProfileCreateStart')}
                      >
                        <Text style={{fontWeight: 'bold', color: 'white'}}>
                          Day
                        </Text>
                      </Button>
                    </ImageBackground>
                  ) : (
                    <ImageBackground
                      source={require('../../Assets/Images/CTAWHITESMALL.png')}
                      resizeMode={'contain'}
                      style={{width: '100%'}}>
                      <Button
                        style={{width: '100%'}}
                        textColor="black"
                        // onPress={() => Navigation.navigate('ProfileCreateStart')}
                      >
                        <Text style={{fontWeight: 'bold', color: 'black'}}>
                          Day
                        </Text>
                      </Button>
                    </ImageBackground>
                  )}
                </Pressable>
              </View>

              <View
                style={{
                  marginHorizontal: 2,
                  marginVertical: 10,
                  width: '22%',
                }}>
                <Pressable
                  onPress={() => {
                    setFocus(2);
                  }}>
                  {focus == 2 ? (
                    <ImageBackground
                      source={require('../../Assets/Images/CTASMALL.png')}
                      resizeMode={'contain'}
                      style={{width: '100%'}}>
                      <Button
                        style={{width: '100%'}}
                        textColor="white"
                        // onPress={() => Navigation.navigate('ProfileCreateStart')}
                      >
                        <Text style={{fontWeight: 'bold', color: 'white'}}>
                          Week
                        </Text>
                      </Button>
                    </ImageBackground>
                  ) : (
                    <ImageBackground
                      source={require('../../Assets/Images/CTAWHITESMALL.png')}
                      resizeMode={'contain'}
                      style={{width: '100%'}}>
                      <Button
                        style={{width: '100%'}}
                        textColor="black"
                        // onPress={() => Navigation.navigate('ProfileCreateStart')}
                      >
                        <Text style={{fontWeight: 'bold', color: 'black'}}>
                          Week
                        </Text>
                      </Button>
                    </ImageBackground>
                  )}
                </Pressable>
              </View>

              <View
                style={{
                  marginHorizontal: 2,
                  marginVertical: 10,
                  width: '24%',
                }}>
                <Pressable
                  onPress={() => {
                    setFocus(3);
                  }}>
                  {focus == 3 ? (
                    <ImageBackground
                      source={require('../../Assets/Images/CTASMALL.png')}
                      resizeMode={'contain'}
                      style={{width: '100%'}}>
                      <Button
                        style={{width: '100%'}}
                        textColor="white"
                        // onPress={() => Navigation.navigate('ProfileCreateStart')}
                      >
                        <Text style={{fontWeight: 'bold', color: 'white'}}>
                          Month
                        </Text>
                      </Button>
                    </ImageBackground>
                  ) : (
                    <ImageBackground
                      source={require('../../Assets/Images/CTAWHITESMALL.png')}
                      resizeMode={'contain'}
                      style={{width: '100%'}}>
                      <Button
                        style={{width: '100%'}}
                        textColor="black"
                        // onPress={() => Navigation.navigate('ProfileCreateStart')}
                      >
                        <Text style={{fontWeight: 'bold', color: 'black'}}>
                          Month
                        </Text>
                      </Button>
                    </ImageBackground>
                  )}
                </Pressable>
              </View>

              <View
                style={{
                  marginHorizontal: 2,
                  marginVertical: 10,
                  width: '22%',
                }}>
                <Pressable
                  onPress={() => {
                    setFocus(4);
                  }}>
                  {focus == 4 ? (
                    <ImageBackground
                      source={require('../../Assets/Images/CTASMALL.png')}
                      resizeMode={'contain'}
                      style={{width: '100%'}}>
                      <Button
                        style={{width: '100%'}}
                        textColor="white"
                        // onPress={() => Navigation.navigate('ProfileCreateStart')}
                      >
                        <Text style={{fontWeight: 'bold', color: 'white'}}>
                          Year
                        </Text>
                      </Button>
                    </ImageBackground>
                  ) : (
                    <ImageBackground
                      source={require('../../Assets/Images/CTAWHITESMALL.png')}
                      resizeMode={'contain'}
                      style={{width: '100%'}}>
                      <Button
                        textColor="black"
                        // onPress={() => Navigation.navigate('ProfileCreateStart')}
                      >
                        <Text style={{fontWeight: 'bold', color: 'black'}}>
                          Year
                        </Text>
                      </Button>
                    </ImageBackground>
                  )}
                </Pressable>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'start',
                alignItems: 'center',
                // paddingRight: 65,
                paddingRight: '20%',
              }}>
              <MultiLineChart />
            </View>
          </View>

          <View style={{alignSelf: 'flex-start', margin: 5}}>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <View
                style={{
                  // marginHorizontal: 2,
                  marginVertical: 10,
                  width: '24%',
                  borderRadius: 100,
                }}>
                <Pressable
                  onPress={() => {
                    setSecondFocus(1);
                  }}>
                  {secondFocus == 1 ? (
                    <ImageBackground
                      source={require('../../Assets/Images/CTASMALL.png')}
                      resizeMode={'contain'}
                      style={{width: '100%'}}>
                      <Button
                        style={{width: '100%'}}
                        textColor="white"
                        // onPress={() => Navigation.navigate('ProfileCreateStart')}
                      >
                        <Text style={{fontWeight: 'bold', color: 'white'}}>
                          Day
                        </Text>
                      </Button>
                    </ImageBackground>
                  ) : (
                    <ImageBackground
                      source={require('../../Assets/Images/CTAWHITESMALL.png')}
                      resizeMode={'contain'}
                      style={{width: '100%'}}>
                      <Button
                        style={{width: '100%'}}
                        textColor="black"
                        // onPress={() => Navigation.navigate('ProfileCreateStart')}
                      >
                        <Text style={{fontWeight: 'bold', color: 'black'}}>
                          Day
                        </Text>
                      </Button>
                    </ImageBackground>
                  )}
                </Pressable>
              </View>

              <View
                style={{
                  marginHorizontal: 2,
                  marginVertical: 10,
                  width: '24%',
                }}>
                <Pressable
                  onPress={() => {
                    setSecondFocus(2);
                  }}>
                  {secondFocus == 2 ? (
                    <ImageBackground
                      source={require('../../Assets/Images/CTASMALL.png')}
                      resizeMode={'contain'}
                      style={{width: '100%'}}>
                      <Button
                        style={{width: '100%'}}
                        textColor="white"
                        // onPress={() => Navigation.navigate('ProfileCreateStart')}
                      >
                        <Text style={{fontWeight: 'bold', color: 'white'}}>
                          Week
                        </Text>
                      </Button>
                    </ImageBackground>
                  ) : (
                    <ImageBackground
                      source={require('../../Assets/Images/CTAWHITESMALL.png')}
                      resizeMode={'contain'}
                      style={{width: '100%'}}>
                      <Button
                        style={{width: '100%'}}
                        textColor="black"
                        // onPress={() => Navigation.navigate('ProfileCreateStart')}
                      >
                        <Text style={{fontWeight: 'bold', color: 'black'}}>
                          Week
                        </Text>
                      </Button>
                    </ImageBackground>
                  )}
                </Pressable>
              </View>

              <View
                style={{
                  marginHorizontal: 2,
                  marginVertical: 10,
                  width: '24%',
                }}>
                <Pressable
                  onPress={() => {
                    setSecondFocus(3);
                  }}>
                  {secondFocus == 3 ? (
                    <ImageBackground
                      source={require('../../Assets/Images/CTASMALL.png')}
                      resizeMode={'contain'}
                      style={{width: '100%'}}>
                      <Button
                        style={{width: '100%'}}
                        textColor="white"
                        // onPress={() => Navigation.navigate('ProfileCreateStart')}
                      >
                        <Text style={{fontWeight: 'bold', color: 'white'}}>
                          Month
                        </Text>
                      </Button>
                    </ImageBackground>
                  ) : (
                    <ImageBackground
                      source={require('../../Assets/Images/CTAWHITESMALL.png')}
                      resizeMode={'contain'}
                      style={{width: '100%'}}>
                      <Button
                        style={{width: '100%'}}
                        textColor="black"
                        // onPress={() => Navigation.navigate('ProfileCreateStart')}
                      >
                        <Text style={{fontWeight: 'bold', color: 'black'}}>
                          Month
                        </Text>
                      </Button>
                    </ImageBackground>
                  )}
                </Pressable>
              </View>

              <View
                style={{
                  marginHorizontal: 2,
                  marginVertical: 10,
                  width: '24%',
                }}>
                <Pressable
                  onPress={() => {
                    setSecondFocus(4);
                  }}>
                  {secondFocus == 4 ? (
                    <ImageBackground
                      source={require('../../Assets/Images/CTASMALL.png')}
                      resizeMode={'contain'}
                      style={{width: '100%'}}>
                      <Button
                        style={{width: '100%'}}
                        textColor="white"
                        // onPress={() => Navigation.navigate('ProfileCreateStart')}
                      >
                        <Text style={{fontWeight: 'bold', color: 'white'}}>
                          Year
                        </Text>
                      </Button>
                    </ImageBackground>
                  ) : (
                    <ImageBackground
                      source={require('../../Assets/Images/CTAWHITESMALL.png')}
                      resizeMode={'contain'}
                      style={{width: '100%'}}>
                      <Button
                        textColor="black"
                        // onPress={() => Navigation.navigate('ProfileCreateStart')}
                      >
                        <Text style={{fontWeight: 'bold', color: 'black'}}>
                          Year
                        </Text>
                      </Button>
                    </ImageBackground>
                  )}
                </Pressable>
              </View>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              backgroundColor: 'transparent',
            }}>
            <View>
              <Heading
                Heading={'Metals'}
                Fontsize={16}
                color={COLORS.dark}
                as={'center'}
                Fontweight={'bold'}
              />
            </View>
            <View style={{marginStart: '7.5%'}}>
              <Heading
                Heading={'Acquisition Cost'}
                Fontsize={16}
                color={COLORS.dark}
                // as={'flex-end'}
                Fontweight={'bold'}
              />
            </View>
            <View>
              <Heading
                Heading={'Current Value'}
                Fontsize={16}
                color={COLORS.dark}
                as={'flex-end'}
                Fontweight={'bold'}
              />
            </View>
          </View>

          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginVertical: '3%',
            }}
          />
        </View>
      </>
    );
  };

  return (
    <>
      <ModalView
        set={setModalVisible}
        get={modalVisible}
        cross={() => setModalVisible(false)}
        txt={'Are you sure you want to Delete?'}
        no={() => {
          setModalVisible(!modalVisible);
        }}
        yes={() => {
          setModalVisible(!modalVisible);
          Navigation.navigate('DetailItem');
        }}
      />

      <SafeArea>
        {/* <ScrollView style={{marginBottom: 20}}> */}
        {/* <View
          style={{
            marginHorizontal: '5%',
            // marginTop: '5%',
            // marginBottom: 20,
          }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{flexDirection: 'column'}}
            extraData={data.length}
            ListHeaderComponent={<ListHeaderComponent />}
            showsVerticalScrollIndicator={false}
          />
        </View> */}
        {/* </ScrollView> */}
        {loading ? (
          <Loader />
        ) : (
          // <ScrollView>
          <View style={{marginHorizontal: '3%', marginTop: '5%'}}>
            <FlatList
              data={dataPortfolioSummary}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={{flexDirection: 'column'}}
              extraData={data.length}
              ListHeaderComponent={ListHeaderComponent}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => {
                    // setRefreshing(true); // Start the refresh animation
                    PortfolioSummary(); // Fetch new data
                  }}
                />
              }
            />
          </View>
          // </ScrollView>
        )}
      </SafeArea>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: '#25241C',
    opacity: 0.9,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
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