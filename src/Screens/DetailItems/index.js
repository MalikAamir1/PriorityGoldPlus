import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useSelector} from 'react-redux';
import COLORS from '../../Assets/Style/Color';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import Entypo from 'react-native-vector-icons/Entypo';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import Heading from '../../Components/ReusableComponent/Heading';
import {PieChartComponent} from '../../Components/ReusableComponent/PieChart';
import {BezierLineChart} from '../../Components/ReusableComponent/BezierLineChart';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {Header} from '../../Components/ReusableComponent/Header';
import DropdownComponent from '../../Components/ReusableComponent/DropDown';
import Input from '../../Components/ReusableComponent/Input';
import ButtonComp from '../../Components/ReusableComponent/Button';
import LinearGradient from 'react-native-linear-gradient';
import {ModalView} from '../../Components/ReusableComponent/Modal';
import {BASE_URL} from '../../App/api';
import {Loader} from '../../Components/ReusableComponent/Loader';
import {deleteRequest, getRequestWithOutBody} from '../../App/fetch';
import {useDispatch} from 'react-redux';
import { portfolio } from '../../Store/Reducers/PortfolioReducer';

export const DetailItem = ({route}) => {
  const Navigation = useNavigation();
  const [dataFromApi, setDataFromApi] = useState([]);
  const [metalId, setMetalId] = useState({});
  const dispatch = useDispatch();

  console.log('route: ', route.params);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [route.params]);

  function getData() {
    setLoading(true);
    getRequestWithOutBody(
      `${BASE_URL}/portfolio/user-portfolio-by-metal/?metal_id=${route.params.metalId}`,
      AuthReducer.userData.token,
    )
      .then(result => {
        console.log('result: ', result);
        setDataFromApi(result);
        // setLoading(false);
        PortfolioSummary()
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  }

  const renderItem = ({item}) => (
    <>
      <View>
        <LinearGradient
          colors={
            item?.metal_name == 'Platinum'
              ? ['#9b9b6e', '#ffffff00']
              : item?.metal_name == 'Palladium'
              ? ['#b9b9b9', '#ffffff00']
              : item?.metal_name == 'Silver'
              ? ['#b5b4b4', '#bbbbbb00']
              : ['#f7e58f', '#ffffff00']
          }
          start={{x: 0, y: 0.5}} // Horizontal start from left
          end={{x: 1, y: 0.5}} // Horizontal end to right
          style={{
            flex: 1,
            padding: 13,
            borderRadius: 10,
            marginBottom: 10,
          }}>
          <View
            style={{
              // backgroundColor: '#FCF6DA',
              // marginTop: 10,
              borderRadius: 25,
              // padding: 10,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 1,
            }}>
            <View
              style={{
                // marginVertical: '2%',
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Heading
                Heading={item?.product_name}
                Fontsize={18}
                color={COLORS.dark}
                Fontweight={'bold'}
              />
            </View>

            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                // backgroundColor: 'red',
                // padding:10
                marginVertical: 10,
              }}>
              <View
                style={{
                  alignItems: 'flex-start',
                  alignContent: 'center',
                  alignSelf: 'center',
                  // backgroundColor: 'pink',
                }}>
                <Heading
                  Heading={item?.metal_quantity + ' x (' + item?.ounces + ')'}
                  Fontsize={14}
                  color={COLORS.dark}
                  txtAlign={'center'}
                  // Fontweight={'bold'}
                />
                <Heading
                  Heading={
                    item?.purchase_date
                      ? new Date(item.purchase_date).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          },
                        )
                      : ''
                  }
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
                  Heading={item?.acquisition_cost}
                  Fontsize={14}
                  color={COLORS.dark}
                  txtAlign={'center'}
                />
                <Heading
                  Heading={
                    `${(item?.difference_value || 0).toFixed(1)} ` +
                    '(' +
                    `${
                      item?.difference_value > 0
                        ? (item?.percentage_change || 0).toFixed(1)
                        : (-item?.percentage_change || 0).toFixed(1)
                    }%)`
                  }
                  Fontsize={14}
                  color={item?.difference_value > 0 ? '#17A72A' : '#F80608'}
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
                  {item?.difference_value > 0 ? (
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
                        item?.difference_value > 0 ? '#B5EFCD' : '#FEBFC0',
                      padding: 5,
                      borderRadius: 10,
                      minWidth: 80,
                    }}>
                    <Heading
                      Heading={'$' + item?.current_value}
                      Fontsize={14}
                      color={item?.difference_value > 0 ? '#17A72A' : '#F80608'}
                      txtAlign={'center'}
                      Fontweight={'bold'}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginHorizontal: 20}}>
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
                  width: 157,
                  borderRadius: 30,
                }}
                onPress={() => {
                  setMetalId(item.id);
                  setModalVisible(true);
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Delete
                </Text>
              </TouchableOpacity>
              <LinearGradient
                colors={['#BA7607', '#EDCC45']}
                style={{
                  flex: 1,
                  marginLeft: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 8,

                  // width: 190,
                  borderRadius: 30,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    Navigation.navigate('EditMetal', {
                      item: item,
                      metalId: route.params.metalId,
                      metalName: route.params.metalName,
                    });
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 14,
                      fontWeight: 'bold',
                      // backgroundColor: 'pink',
                      padding: 8,
                      width: 120,
                      alignContent: 'center',
                      alignSelf: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );

  const [modalVisible, setModalVisible] = useState(false);

  function PortfolioSummary() {
    // setloader(true);
    getRequestWithOutBody(
      `${BASE_URL}/portfolio/user-portfolio-summary/`,
      AuthReducer.userData.token,
    )
      .then(result => {
        setLoading(false);
        console.log('result on home', result);
        dispatch(portfolio(result));
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
      });
  }

  return (
    <>
      <ModalView
        set={setModalVisible}
        get={modalVisible}
        cross={() => setModalVisible(false)}
        txt={'Are you sure you want to Delete?'}
        no={() => {
          setModalVisible(false);
          console.log('aaaaa', metalId.id);
        }}
        yes={() => {
          setModalVisible(false);
          console.log('metalid', metalId);
          console.log('AuthReducer.token: ', AuthReducer.token);

          setLoading(true);
          deleteRequest(
            `${BASE_URL}/portfolio/delete-portfolio/?id=${metalId}`,
            AuthReducer.userData.token,
          )
            .then(result => {
              if (result.status == 'Portfolio deleted successfully') {
                alert('Successfully Deleted');
                setLoading(false);
                getData();
              } else {
                alert('Something went wrong');
              }
            })
            .catch(error => {
              console.log('error', error);
              setLoading(false);
              // setMetalId(null)
            });
        }}
      />

      <SafeArea>
        {loading ? (
          <Loader />
        ) : (
          <>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: '5%',
                marginHorizontal: '5%',
              }}>
              <View style={{alignSelf: 'center'}}>
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
                  {/* <MaterialIcons name="menu-open" size={30} color={'black'} /> */}
                </Pressable>
              </View>
              <View style={{alignSelf: 'center'}}>
                <Heading
                  Heading={route.params.metalName}
                  Fontsize={20}
                  color={COLORS.dark}
                  Fontweight={'bold'}
                  // txtAlign={'center'}
                />
              </View>
              <View style={{alignSelf: 'center'}}>
                <Heading
                  Heading={'          '}
                  Fontsize={20}
                  color={COLORS.dark}
                  Fontweight={'bold'}
                  // txtAlign={'center'}
                />
              </View>
            </View>

            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                backgroundColor: 'transparent',
                marginTop: '5%',
                marginHorizontal: '8%',
                marginBottom: '-3%',
              }}>
              <View>
                <Heading
                  Heading={'Quantity'}
                  Fontsize={14}
                  color={COLORS.dark}
                  as={'center'}
                  Fontweight={'bold'}
                />
              </View>
              <View style={{marginStart: '7.5%'}}>
                <Heading
                  Heading={'Acquisition Cost'}
                  Fontsize={14}
                  color={COLORS.dark}
                  // as={'flex-end'}
                  Fontweight={'bold'}
                />
              </View>
              <View>
                <Heading
                  Heading={'Current Value'}
                  Fontsize={14}
                  color={COLORS.dark}
                  as={'flex-end'}
                  Fontweight={'bold'}
                />
              </View>
            </View>
            <View
              style={{
                marginHorizontal: '5%',
                marginTop: '3%',
                // marginBottom: '5%',
                backgroundColor: 'white',
              }}>
              <View style={{marginTop: '5%'}}>
                <FlatList
                  data={dataFromApi}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  contentContainerStyle={{
                    flexDirection: 'column',
                    paddingBottom: 40,
                  }}
                  extraData={dataFromApi.length}
                  // ListHeaderComponent={ListHeaderComponent}
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={loading}
                      onRefresh={() => {
                        // setRefreshing(true); // Start the refresh animation
                        getData(); // Fetch new data
                      }}
                    />
                  }
                />
              </View>
            </View>
          </>
        )}
      </SafeArea>
    </>
  );
};

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: '#25241C',
    opacity: 0.9,
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
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
    borderColor: 'black',
    // borderWidth: 1,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
