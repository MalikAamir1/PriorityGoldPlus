import React, {useEffect, useState} from 'react';
import {FlatList, Image, ImageBackground, Pressable, View} from 'react-native';
import COLORS from '../../Assets/Style/Color';
import Heading from '../../Components/ReusableComponent/Heading';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {Button, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../../Components/ReusableComponent/Loader';
import {BASE_URL} from '../../App/api';
import {deleteRequest, getRequestWithOutBody} from '../../App/fetch';
import {portfolio} from '../../Store/Reducers/PortfolioReducer';
import LinearGradient from 'react-native-linear-gradient';
import {ModalView} from '../../Components/ReusableComponent/Modal';
import {portfolioUser} from '../../Store/Reducers/PortfolioReducerByUser';

export const ProfileDetail = () => {
  const Navigation = useNavigation();
  const [dataPortfolioSummary, setDataPortfolioSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(4);
  const portfolioData = useSelector(state => state.PortfolioReducer.data);
  console.log('portfoliodata on profile', portfolioData);
  const [modalVisible, setModalVisible] = useState(false);
  const [metalId, setMetalId] = useState({});

  const portfoliofromReducer = useSelector(
    state => state.PortfolioReducerByUser.data,
  );

  const dispatch = useDispatch();
  // console.log('portfolio', portfolio);

  const AuthReducer = useSelector(state => state.AuthReducer);
  // console.log(
  //   'AuthReducer?.user?.profile?.profile_pic: ',
  //   AuthReducer?.userData?.user?.profile?.profile_pic,
  // );
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

  useEffect(() => {
    setDataPortfolioSummary(portfoliofromReducer);
  }, [portfoliofromReducer]);

  console.log('portfoliofromReducer', portfoliofromReducer);

  const renderItem = ({item}) => (
    <>
      <Pressable
        onPress={() => {
          console.log('itemmmmmmmmm', item);
          // Navigation.navigate('DetailItem', {
          //   metalName: item?.metal_name,
          //   metalId: item?.metal_id,
          // });
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: 'transparent',
          }}>
          <View style={{width: 80, justifyContent: 'center'}}>
            <Text style={{fontSize: 12, color: COLORS.dark}}>
              {item.product_name}
            </Text>
          </View>
          <View style={{width: 50, justifyContent: 'center'}}>
            <Text
              style={{fontSize: 12, color: COLORS.dark, textAlign: 'center'}}>
              {item.metal_quantity}
            </Text>
          </View>
          <View style={{width: 70, justifyContent: 'center'}}>
            <Text
              style={{fontSize: 12, color: COLORS.dark, textAlign: 'center'}}>
              {item?.ounces * item.metal_quantity + ' oz'}
            </Text>
          </View>
          <View style={{width: 80, justifyContent: 'center'}}>
            <Text
              style={{fontSize: 12, color: COLORS.dark, textAlign: 'center'}}>
              {'$' + item?.acquisition_cost * item.metal_quantity}
            </Text>
          </View>
          <View
            style={{
              width: 60,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{fontSize: 12, color: COLORS.dark, textAlign: 'center'}}>
              {Math.floor(item?.current_value)}
            </Text>
          </View>
          {/* <View
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
          </View> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 4,
          }}>
          <Pressable
            onPress={() => {
              console.log('itedddd', item);
              Navigation.navigate('EditMetal', {
                item: item,
                metalId: item.id,
                metalName: item.metal_Name,
              });
            }}>
            <Text
              style={{
                color: 'green',
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              }}>
              Edit
            </Text>
          </Pressable>
          <View style={{width: 12}} />
          <Pressable
            onPress={() => {
              console.log('fsd', item.id);
              setMetalId(item.id);
              setModalVisible(true);
            }}>
            <Text
              style={{
                color: 'red',
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              }}>
              Delete
            </Text>
          </Pressable>
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

  // const ListHeaderComponent = () => {
  //   return (
  //     <>
  //       <View style={{marginHorizontal: '0'}}>
  //         <View
  //           style={{
  //             justifyContent: 'space-between',
  //             flexDirection: 'row',
  //           }}>
  //           <View
  //             style={{
  //               alignSelf: 'center',
  //               backgroundColor: '#EDCC45',
  //               borderRadius: 10,
  //             }}>
  //             <Pressable
  //               onPress={() => {
  //                 Navigation.navigate('Drawer');
  //               }}>
  //               <Ionicons name="chevron-back" size={27} color={'black'} />
  //             </Pressable>
  //           </View>
  //           <View style={{alignSelf: 'center'}}>
  //             <Heading
  //               Heading={'Profile'}
  //               Fontsize={20}
  //               color={COLORS.dark}
  //               Fontweight={'bold'}
  //               txtAlign={'center'}
  //             />
  //           </View>
  //           <View style={{alignSelf: 'center'}}>
  //             <Pressable
  //               onPress={() => {
  //                 Navigation.navigate('EditProfile');
  //               }}>
  //               <Feather name="edit" size={22} color={'black'} />
  //             </Pressable>
  //           </View>
  //         </View>

  //         <View
  //           style={{
  //             alignSelf: 'center',
  //             marginTop: '8%',
  //             marginBottom: '8%',
  //           }}>
  //           <Image
  //             source={{
  //               uri: https://jbpl.pythonanywhere.com${AuthReducer?.userData?.user?.profile?.profile_pic},
  //             }}
  //             style={{
  //               width: 140,
  //               height: 140,
  //               borderWidth: 7,
  //               borderColor: '#7D7D7D',
  //               borderRadius: 75,
  //             }}
  //             resizeMode={'cover'}
  //           />
  //           <Pressable
  //             onPress={() => {
  //               console.log('log');
  //               // rbSheetRef.open();
  //               // rbSheetRef.current.open();
  //             }}
  //             style={{
  //               position: 'absolute',
  //               alignSelf: 'flex-end',
  //             }}>
  //             <Image
  //               source={require('../../Assets/Images/imgIcon.png')}
  //               style={{
  //                 width: 40,
  //                 height: 40,
  //                 position: 'absolute',
  //                 alignSelf: 'flex-end',
  //                 marginTop: 100,
  //               }}
  //             />
  //           </Pressable>
  //         </View>

  //         {/* <View style={{alignSelf: 'center', marginTop: '10%'}}>
  //           <Image
  //             // source={require('../../Assets/Images/profileIcon.png')}
  //             source={{
  //               uri: https://jbpl.pythonanywhere.com${AuthReducer?.userData?.user?.profile?.profile_pic},
  //             }}
  //             style={{
  //               width: 140,
  //               height: 140,
  //               borderWidth: 7,
  //               borderColor: '#7D7D7D',
  //               borderRadius: 75,
  //             }}
  //           />
  //         </View> */}

  //         <View style={{alignSelf: 'center'}}>
  //           <Heading
  //             Heading={AuthReducer?.userData?.user?.profile?.display_name}
  //             Fontsize={20}
  //             color={COLORS.dark}
  //             Fontweight={'bold'}
  //             txtAlign={'center'}
  //           />
  //         </View>

  //         <View style={{alignSelf: 'center', marginTop: '2%'}}>
  //           <Heading
  //             Heading={AuthReducer?.userData?.user?.email}
  //             Fontsize={14}
  //             color={COLORS.dark}
  //             txtAlign={'center'}
  //           />
  //         </View>

  //         <View
  //           style={{
  //             alignSelf: 'center',
  //             marginTop: '2%',
  //             // flexDirection: 'row',
  //           }}>
  //           <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //             <MaterialCommunityIcons name="phone" size={22} color={'black'} />
  //             <Heading
  //               Heading={AuthReducer?.userData?.user?.profile?.telephone}
  //               Fontsize={14}
  //               color={COLORS.dark}
  //               txtAlign={'center'}
  //               ml={6}
  //             />
  //           </View>
  //           {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //             <MaterialCommunityIcons
  //               name="map-marker"
  //               size={20}
  //               color={'black'}
  //             />
  //             <Heading
  //               Heading={AuthReducer?.userData?.user?.profile?.street}
  //               Fontsize={14}
  //               color={COLORS.dark}
  //               txtAlign={'center'}
  //             />
  //           </View> */}
  //         </View>

  //         <View
  //           style={{
  //             borderBottomColor: 'grey',
  //             borderBottomWidth: 1,
  //             marginVertical: '3%',
  //           }}
  //         />

  //         <View style={{marginTop: '2%'}}>
  //           <Heading
  //             Heading={'Asset Information'}
  //             Fontsize={20}
  //             color={COLORS.dark}
  //             Fontweight={'bold'}
  //           />

  //           <View style={{flexDirection: 'row'}}>
  //             <View
  //               style={{
  //                 marginLeft: 4,
  //                 paddingleft: 4,
  //                 marginRight: -10,
  //                 marginVertical: 10,
  //                 width: '24%',
  //                 borderRadius: 100,
  //               }}>
  //               <Pressable
  //                 onPress={() => {
  //                   setFocus(1);
  //                 }}>
  //                 {focus == 1 ? (
  //                   <ImageBackground
  //                     source={require('../../Assets/Images/CTASMALL.png')}
  //                     resizeMode={'contain'}
  //                     style={{width: '100%'}}>
  //                     <Button
  //                       style={{width: '100%'}}
  //                       textColor="white"
  //                       // onPress={() => Navigation.navigate('ProfileCreateStart')}
  //                     >
  //                       <Text
  //                         style={{
  //                           fontWeight: 'bold',
  //                           color: 'white',
  //                           width: '80%',
  //                         }}>
  //                         6 Months
  //                       </Text>
  //                     </Button>
  //                   </ImageBackground>
  //                 ) : (
  //                   <ImageBackground
  //                     source={require('../../Assets/Images/CTAWHITESMALL.png')}
  //                     resizeMode={'contain'}
  //                     style={{width: '100%'}}>
  //                     <Button
  //                       style={{width: '100%'}}
  //                       textColor="black"
  //                       // onPress={() => Navigation.navigate('ProfileCreateStart')}
  //                     >
  //                       <Text
  //                         style={{
  //                           fontWeight: 'bold',
  //                           color: 'black',
  //                           width: '80%',
  //                         }}>
  //                         6 Months
  //                       </Text>
  //                     </Button>
  //                   </ImageBackground>
  //                 )}
  //               </Pressable>
  //             </View>

  //             <View
  //               style={{
  //                 marginLeft: 12,
  //                 marginVertical: 10,
  //                 paddingleft: 4,
  //                 width: '24%',
  //               }}>
  //               <Pressable
  //                 onPress={() => {
  //                   setFocus(2);
  //                 }}>
  //                 {focus == 2 ? (
  //                   <ImageBackground
  //                     source={require('../../Assets/Images/CTASMALL.png')}
  //                     resizeMode={'contain'}
  //                     style={{width: '100%'}}>
  //                     <Button
  //                       style={{width: '100%'}}
  //                       textColor="white"
  //                       // onPress={() => Navigation.navigate('ProfileCreateStart')}
  //                     >
  //                       <Text style={{fontWeight: 'bold', color: 'white'}}>
  //                         1 Year
  //                       </Text>
  //                     </Button>
  //                   </ImageBackground>
  //                 ) : (
  //                   <ImageBackground
  //                     source={require('../../Assets/Images/CTAWHITESMALL.png')}
  //                     resizeMode={'contain'}
  //                     style={{width: '100%'}}>
  //                     <Button
  //                       style={{width: '100%'}}
  //                       textColor="black"
  //                       // onPress={() => Navigation.navigate('ProfileCreateStart')}
  //                     >
  //                       <Text style={{fontWeight: 'bold', color: 'black'}}>
  //                         1 Year
  //                       </Text>
  //                     </Button>
  //                   </ImageBackground>
  //                 )}
  //               </Pressable>
  //             </View>

  //             <View
  //               style={{
  //                 marginLeft: 3,
  //                 marginVertical: 10,
  //                 paddingleft: 4,
  //                 width: '24%',
  //               }}>
  //               <Pressable
  //                 onPress={() => {
  //                   setFocus(3);
  //                 }}>
  //                 {focus == 3 ? (
  //                   <ImageBackground
  //                     source={require('../../Assets/Images/CTASMALL.png')}
  //                     resizeMode={'contain'}
  //                     style={{width: '100%'}}>
  //                     <Button
  //                       style={{width: '100%'}}
  //                       textColor="white"
  //                       // onPress={() => Navigation.navigate('ProfileCreateStart')}
  //                     >
  //                       <Text style={{fontWeight: 'bold', color: 'white'}}>
  //                         5 Years
  //                       </Text>
  //                     </Button>
  //                   </ImageBackground>
  //                 ) : (
  //                   <ImageBackground
  //                     source={require('../../Assets/Images/CTAWHITESMALL.png')}
  //                     resizeMode={'contain'}
  //                     style={{width: '100%'}}>
  //                     <Button
  //                       style={{width: '100%'}}
  //                       textColor="black"
  //                       // onPress={() => Navigation.navigate('ProfileCreateStart')}
  //                     >
  //                       <Text style={{fontWeight: 'bold', color: 'black'}}>
  //                         5 Years
  //                       </Text>
  //                     </Button>
  //                   </ImageBackground>
  //                 )}
  //               </Pressable>
  //             </View>

  //             <View
  //               style={{
  //                 marginLeft: 3,
  //                 marginVertical: 10,
  //                 paddingleft: 4,
  //                 width: '24%',
  //               }}>
  //               <Pressable
  //                 onPress={() => {
  //                   setFocus(4);
  //                 }}>
  //                 {focus == 4 ? (
  //                   <ImageBackground
  //                     source={require('../../Assets/Images/CTASMALL.png')}
  //                     resizeMode={'contain'}
  //                     style={{width: '100%'}}>
  //                     <Button
  //                       style={{width: '100%'}}
  //                       textColor="white"
  //                       // onPress={() => Navigation.navigate('ProfileCreateStart')}
  //                     >
  //                       <Text style={{fontWeight: 'bold', color: 'white'}}>
  //                         All Time
  //                       </Text>
  //                     </Button>
  //                   </ImageBackground>
  //                 ) : (
  //                   <ImageBackground
  //                     source={require('../../Assets/Images/CTAWHITESMALL.png')}
  //                     resizeMode={'contain'}
  //                     style={{width: '100%'}}>
  //                     <Button
  //                       textColor="black"
  //                       // onPress={() => Navigation.navigate('ProfileCreateStart')}
  //                     >
  //                       <Text style={{fontWeight: 'bold', color: 'black'}}>
  //                         All Time
  //                       </Text>
  //                     </Button>
  //                   </ImageBackground>
  //                 )}
  //               </Pressable>
  //             </View>
  //           </View>
  //         </View>

  //         <View
  //           style={{
  //             justifyContent: 'space-between',
  //             flexDirection: 'row',
  //             backgroundColor: 'transparent',
  //             marginTop: 5,
  //           }}>
  //           <View>
  //             <Heading
  //               Heading={'Metal'}
  //               Fontsize={12}
  //               color={COLORS.dark}
  //               txtAlign={'center'}
  //               Fontweight={'bold'}
  //               width={'100%'}
  //               mt={6}
  //               // mr={25}
  //             />
  //           </View>
  //           <View>
  //             <Heading
  //               Heading={'Quantity'}
  //               Fontsize={12}
  //               color={COLORS.dark}
  //               txtAlign={'center'}
  //               Fontweight={'bold'}
  //               width={'100%'}
  //               ml={30}
  //               mt={6}
  //             />
  //           </View>
  //           <View>
  //             <Heading
  //               Heading={'Total Ounces'}
  //               Fontsize={12}
  //               color={COLORS.dark}
  //               txtAlign={'center'}
  //               Fontweight={'bold'}
  //               width={'60%'}
  //               ml={28}
  //             />
  //           </View>
  //           <View>
  //             <Heading
  //               Heading={'Acquisition Metal Cost'}
  //               Fontsize={12}
  //               color={COLORS.dark}
  //               txtAlign={'center'}
  //               Fontweight={'bold'}
  //               width={'60%'}
  //               // ml={'29%'}
  //             />
  //           </View>
  //           <View>
  //             <Heading
  //               Heading={'Current Value*'}
  //               Fontsize={12}
  //               color={COLORS.dark}
  //               txtAlign={'center'}
  //               Fontweight={'bold'}
  //               width={'100%'}
  //               ml={-40}
  //             />
  //           </View>
  //         </View>
  //         <View
  //           style={{
  //             borderBottomColor: 'grey',
  //             borderBottomWidth: 1,
  //             marginVertical: '4%',
  //           }}
  //         />
  //       </View>
  //     </>
  //   );
  // };

  function PortfolioSummary() {
    setLoading(true);
    getRequestWithOutBody(
      `${BASE_URL}/portfolio/user-portfolio-by-user/`,
      AuthReducer.userData.token,
    )
      .then(result => {
        console.log('portfolio-by-userr', result);
        dispatch(portfolioUser(result));
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log('errorhhhhhh', error);
      });
  }

  // useEffect(() => {
  //   PortfolioSummary();
  // }, []);

  const renderData = ({item}) => (
    <>
      <View
        style={
          {
            // flexDirection: 'row',
            // backgroundColor: 'yellow',
            // height: 100,
            // alignItems: 'center',
            // marginVertical: 2,
            // marginHorizontal: 4,
          }
        }>
        <LinearGradient
          colors={['#FFFF99', '#FFFFE0']}
          style={{
            borderRadius: 15,
            marginRight: 18,
            padding: 14,
            marginBottom: 10,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 14}}>
            {item.metal_name}
          </Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontWeight: 'bold', fontSize: 11, marginTop: 6}}>
                Quantity:
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 11, color: 'grey'}}>
                {item.total_metal_quantity}
              </Text>
            </View>
            <View style={{flexDirection: 'column', marginHorizontal: 8}}>
              <Text style={{fontWeight: 'bold', fontSize: 11, marginTop: 6}}>
                Acquisition Cost
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 11,
                  color: 'green',
                  textAlign: 'right',
                }}>
                {'$' + item.total_acquisition_value * item.total_metal_quantity}
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontWeight: 'bold', fontSize: 11, marginTop: 6}}>
                Ounces:
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 11, color: 'grey'}}>
                {item?.total_ounces + ' oz'}
              </Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontWeight: 'bold', fontSize: 11, marginTop: 6}}>
                Current Value
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 11,
                  color: 'green',
                  textAlign: 'right',
                }}>
                {'$' + item.total_current_value}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );

  return (
    <>
      <ModalView
        set={setModalVisible}
        get={modalVisible}
        cross={() => setModalVisible(false)}
        txt={'Are you sure you want to Delete?'}
        no={() => {
          setModalVisible(false);
          // console.log('aaaaa', metalId.id);
        }}
        yes={() => {
          setModalVisible(false);
          console.log('metalid', metalId);
          console.log(
            'AuthReducer.userData.token: ',
            AuthReducer.userData.token,
          );

          setLoading(true);
          deleteRequest(
            `${BASE_URL}/portfolio/delete-portfolio/?id=${metalId}`,
            AuthReducer.userData.token,
          )
            .then(result => {
              console.log('result: ', result);
              if (result.status == 'Portfolio deleted successfully') {
                alert('Successfully Deleted');
                setLoading(false);
                getData();
              } else {
                alert('Something went wrong');
              }
            })
            .catch(error => {
              console.log('error ggggggg', error);
              setLoading(false);
              // setMetalId(null)
            });
        }}
      />
      <SafeArea>
        {loading ? (
          <Loader />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                marginHorizontal: '5%',
                marginTop: '4%',
                marginBottom: '3%',
              }}>
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
                      Navigation.navigate('Drawer');
                    }}>
                    <Ionicons name="chevron-back" size={27} color={'black'} />
                  </Pressable>
                </View>
                <View style={{alignSelf: 'center'}}>
                  <Heading
                    Heading={'Profile'}
                    Fontsize={20}
                    color={COLORS.dark}
                    Fontweight={'bold'}
                    txtAlign={'center'}
                  />
                </View>
                <View style={{alignSelf: 'center'}}>
                  <Pressable
                    onPress={() => {
                      Navigation.navigate('EditProfile');
                    }}>
                    <Feather name="edit" size={22} color={'black'} />
                  </Pressable>
                </View>
              </View>

              <View
                style={{
                  alignSelf: 'center',
                  marginTop: '8%',
                  marginBottom: '8%',
                }}>
                <Image
                  source={{
                    uri: `https://nextgenbulliontool.com${AuthReducer?.userData?.user?.profile?.profile_pic}`,
                  }}
                  style={{
                    width: 140,
                    height: 140,
                    borderWidth: 7,
                    borderColor: '#7D7D7D',
                    borderRadius: 70,
                  }}
                  resizeMode={'cover'}
                />
                {/* <Pressable
                  onPress={() => {
                    console.log('log');
                    // rbSheetRef.open();
                    // rbSheetRef.current.open();
                  }}
                  style={{
                    position: 'absolute',
                    alignSelf: 'flex-end',
                  }}>
                  <Image
                    source={require('../../Assets/Images/imgIcon.png')}
                    style={{
                      width: 40,
                      height: 40,
                      position: 'absolute',
                      alignSelf: 'flex-end',
                      marginTop: 100,
                    }}
                  />
                </Pressable> */}
              </View>

              {/* <View style={{alignSelf: 'center', marginTop: '10%'}}>
            <Image
              // source={require('../../Assets/Images/profileIcon.png')}
              source={{
                uri: https://jbpl.pythonanywhere.com${AuthReducer?.userData?.user?.profile?.profile_pic},
              }}
              style={{
                width: 140,
                height: 140,
                borderWidth: 7,
                borderColor: '#7D7D7D',
              }}
            />
          </View> */}

              <View style={{alignSelf: 'center'}}>
                <Heading
                  Heading={AuthReducer?.userData?.user?.profile?.display_name}
                  Fontsize={20}
                  color={COLORS.dark}
                  Fontweight={'bold'}
                  txtAlign={'center'}
                />
              </View>

              <View style={{alignSelf: 'center', marginTop: '2%'}}>
                <Heading
                  Heading={AuthReducer?.userData?.user?.email}
                  Fontsize={14}
                  color={COLORS.dark}
                  txtAlign={'center'}
                />
              </View>

              <View
                style={{
                  alignSelf: 'center',
                  marginTop: '2%',
                  // flexDirection: 'row',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="phone"
                    size={22}
                    color={'black'}
                  />
                  <Heading
                    Heading={AuthReducer?.userData?.user?.profile?.telephone}
                    Fontsize={14}
                    color={COLORS.dark}
                    txtAlign={'center'}
                    ml={6}
                  />
                </View>
                {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color={'black'}
              />
              <Heading
                Heading={AuthReducer?.userData?.user?.profile?.street}
                Fontsize={14}
                color={COLORS.dark}
                txtAlign={'center'}
              />
            </View> */}
              </View>

              <View
                style={{
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                  marginVertical: '3%',
                }}
              />

              <View style={{marginTop: '2%'}}>
                <Heading
                  Heading={'Asset Information'}
                  Fontsize={20}
                  color={COLORS.dark}
                  Fontweight={'bold'}
                />

                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      marginLeft: 4,
                      paddingleft: 4,
                      marginRight: -10,
                      marginVertical: 10,
                      width: '24%',
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
                            <Text
                              style={{
                                fontWeight: 'bold',
                                color: 'white',
                                width: '80%',
                              }}>
                              6 Months
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
                            <Text
                              style={{
                                fontWeight: 'bold',
                                color: 'black',
                                width: '80%',
                              }}>
                              6 Months
                            </Text>
                          </Button>
                        </ImageBackground>
                      )}
                    </Pressable>
                  </View>

                  <View
                    style={{
                      marginLeft: 12,
                      marginVertical: 10,
                      paddingleft: 4,
                      width: '24%',
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
                              1 Year
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
                              1 Year
                            </Text>
                          </Button>
                        </ImageBackground>
                      )}
                    </Pressable>
                  </View>

                  <View
                    style={{
                      marginLeft: 3,
                      marginVertical: 10,
                      paddingleft: 4,
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
                              5 Years
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
                              5 Years
                            </Text>
                          </Button>
                        </ImageBackground>
                      )}
                    </Pressable>
                  </View>

                  <View
                    style={{
                      marginLeft: 3,
                      marginVertical: 10,
                      paddingleft: 4,
                      width: '24%',
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
                              All Time
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
                              All Time
                            </Text>
                          </Button>
                        </ImageBackground>
                      )}
                    </Pressable>
                  </View>
                </View>
              </View>

              <View style={{marginVertical: '3%'}}>
                <FlatList
                  data={portfolioData}
                  horizontal={true}
                  renderItem={renderData}
                  keyExtractor={item => item.metal_id}
                  contentContainerStyle={{flexDirection: 'row'}}
                  extraData={data.length}
                  // ListHeaderComponent={ListHeaderComponent}
                  showsHorizontalScrollIndicator={false}
                  // scrollEnabled={true}
                  // refreshControl={
                  //   <RefreshControl
                  //     refreshing={loading}
                  //     onRefresh={() => {x
                  //       // setRefreshing(true); // Start the refresh animation
                  //       PortfolioSummary(); // Fetch new data
                  //     }}
                  //   />
                  // }
                />
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                  marginTop: 4,
                }}>
                <View style={{width: '10%'}}>
                  <Heading
                    Heading={'Metal'}
                    Fontsize={12}
                    color={COLORS.dark}
                    // txtAlign={'center'}
                    Fontweight={'bold'}
                    // width={'100%'}
                    mt={6}

                    // mr={25}
                  />
                </View>
                <View style={{width: '16%', marginLeft: 14}}>
                  <Heading
                    Heading={'Quantity'}
                    Fontsize={12}
                    color={COLORS.dark}
                    // txtAlign={'center'}
                    Fontweight={'bold'}
                    // width={'100%'}
                    // ml={15}
                    mt={6}
                  />
                </View>
                <View style={{width: '14%', marginLeft: -4}}>
                  <Heading
                    Heading={'Total Ounces'}
                    Fontsize={12}
                    color={COLORS.dark}
                    txtAlign={'center'}
                    Fontweight={'bold'}
                    // width={'60%'}
                    // ml={28}
                  />
                </View>
                <View style={{width: '20%', marginLeft: 1}}>
                  <Heading
                    Heading={'Acquisition Metal Cost'}
                    Fontsize={12}
                    color={COLORS.dark}
                    txtAlign={'center'}
                    Fontweight={'bold'}
                    // width={'60%'}
                    // ml={'29%'}
                  />
                </View>
                <View style={{width: '14%', marginLeft: 1}}>
                  <Heading
                    Heading={'Current Value*'}
                    Fontsize={12}
                    color={COLORS.dark}
                    txtAlign={'center'}
                    Fontweight={'bold'}
                    // width={'100%'}
                    // ml={-40}
                  />
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                  marginVertical: '4%',
                }}
              />
            </View>
            <View style={{marginHorizontal: '4%', marginTop: '0%'}}>
              <FlatList
                data={portfoliofromReducer}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                // contentContainerStyle={{flexDirection: 'column'}}
                extraData={data.length}
                // ListHeaderComponent={ListHeaderComponent}
                // showsVerticalScrollIndicator={false}
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
          </ScrollView>
        )}
      </SafeArea>
    </>
  );
};