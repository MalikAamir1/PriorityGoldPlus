import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../Assets/Style/Color';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import Heading from '../../Components/ReusableComponent/Heading';
import { PieChartComponent } from '../../Components/ReusableComponent/PieChart';
import { BezierLineChart } from '../../Components/ReusableComponent/BezierLineChart';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from '../../Components/ReusableComponent/Header';
import DropdownComponent from '../../Components/ReusableComponent/DropDown';
import Input from '../../Components/ReusableComponent/Input';
import ButtonComp from '../../Components/ReusableComponent/Button';
import { Calendar } from 'react-native-calendars';
import { ModalView } from '../../Components/ReusableComponent/Modal';
import { BASE_URL } from '../../App/api';
import { Loader } from '../../Components/ReusableComponent/Loader';
import { getRequestWithOutBody, putRequestWithToken } from '../../App/fetch';
import { portfolio } from '../../Store/Reducers/PortfolioReducer';
import { portfolioUser } from '../../Store/Reducers/PortfolioReducerByUser';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const EditMetal = ({ route }) => {
  const Navigation = useNavigation();
  const [userDataFromFacebook, setUserDataFromFacebook] = useState([]);
  // console.log('route.params on edit metal', route.params.item);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dataFromParams = route.params.item;
  console.log('route.params on edit metal', dataFromParams);

  const [selectedMetal, setSelectedMetal] = useState(
    dataFromParams?.metal_name,
  );
  const [arrayOfMetal, setArrayOfMetal] = useState([]);

  const [selectedGrade, setSelectedGrade] = useState('');
  const [arrayOfGrade, setArrayOfGrade] = useState([]);

  const [selectedProductFamily, setSelectedProductFamily] = useState('');
  const [arrayOfProductFamily, setArrayOfProductFamily] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState('');
  const [arrayOfProduct, setArrayOfProduct] = useState([]);

  const [ounce, setOunce] = useState(0);

  const [acquisitionCost, setAcquisitionCost] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState();
  const [quantity, setQuantity] = useState(0);
  const [quantityError, setQuantityError] = useState('');

  const [data, setData] = useState([]);
  const [id, setId] = useState(0);

  const [loader, setloader] = useState(false);

  const [modalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  // const [modalVisible, setModalVisible] = useState(false);
  const [dateSelectedFromProduct, setdateSelectedFromProduct] = useState();

  const [currentValue, setCurrentValue] = useState(0);
  const [differenceValue, setDifferenceValue] = useState(0);

  const [status, setStatus] = useState(false);

  const [percentage, setPercentage] = useState(0);

  const [elapsedTime, setElapsedTime] = useState('');
  const [error, setError] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleDatePicker = () => {
    setDatePickerVisible(!isDatePickerVisible);
  };
  console.log('purchaseDate', purchaseDate)
  const handleConfirm = date => {
    console.log('date', date)
    setPurchaseDate(date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }));
    toggleDatePicker();
  };

  const openCalendar = () => {
    setModalVisible(true);
  };

  const closeCalendar = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    console.log('dataFromParams: ', dataFromParams);
    const valueOfQuantity = dataFromParams.metal_quantity;

    setSelectedMetal(dataFromParams.metal);
    setSelectedGrade(dataFromParams.grade);
    setSelectedProductFamily(dataFromParams.product_family);
    setSelectedProduct(dataFromParams.product);

    setOunce(dataFromParams.ounces);
    setQuantity(dataFromParams.metal_quantity);
    setAcquisitionCost(dataFromParams.acquisition_cost);

    // Create a Date object from the input string
    const dateObject = new Date(dataFromParams.purchase_date);

    // Extract date components (month, day, year)
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const year = dateObject.getFullYear();

    // Create the formatted date string in MM/DD/YYYY format
    const formattedDate = `${month}/${day}/${year}`;
    console.log(formattedDate);
    setPurchaseDate(formattedDate);

    setPercentage(dataFromParams.percentage_change);
    setCurrentValue(dataFromParams.current_value);
    setDifferenceValue(dataFromParams.difference_value);
    setId(dataFromParams.id);
    console.log('id', id);
  }, [route.params]);

  useEffect(() => {
    getRequestWithOutBody(
      `${BASE_URL}/portfolio/product-prices-sku/?product_id=${dataFromParams?.product}`,
      AuthReducer.userData.token,
    )
      .then(result => {
        console.log('result: ', result.results[0]);

        //==================
        const date_object = new Date(result.results[0]?.updated);
        const currentDate = new Date();
        const timeDifference = currentDate - date_object;
        // console.log('timeDifference :', timeDifference);
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        // console.log('days: ', days);

        if (days > 0) {
          setElapsedTime(`${days} days ago`);
        } else if (hours > 0) {
          setElapsedTime(`${hours} hours ago`);
        } else if (minutes > 0) {
          setElapsedTime(`${minutes} minutes ago`);
        } else {
          setElapsedTime(`${seconds} seconds ago`);
        }
        //==================
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  useEffect(() => {
    if (dataFromParams.updated) {
      const date_object = new Date(dataFromParams.created);
      const month = date_object.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = date_object.getDate();
      const year = date_object.getFullYear();
      const formatted_date = `${month.toString().padStart(2, '0')}/${day
        .toString()
        .padStart(2, '0')}/${year}`;
      // let dateSelected = formatted_date;
      setdateSelectedFromProduct(formatted_date);
    }
  }, [dataFromParams]);

  useEffect(() => {
    console.log('quantity: ', quantity);
    if (dataFromParams && quantity) {
      let multiplyData =
        quantity * dataFromParams.ask * dataFromParams.factor_rate;

      const roundedCureentValue = multiplyData.toFixed(1);
      setCurrentValue(roundedCureentValue);
    }
  }, [dataFromParams, quantity, acquisitionCost, quantity]);

  useEffect(() => {
    const differeneceCalculateValue = currentValue - acquisitionCost;
    const differeneceCalculatefixed = differeneceCalculateValue?.toFixed(1);
    setDifferenceValue(differeneceCalculatefixed);

    if (currentValue !== 0 && acquisitionCost !== 0) {
      // console.log('ENtering in this place');
      let calculatePercentage =
        ((currentValue - acquisitionCost) / acquisitionCost) * 100;
      if (calculatePercentage < 0) {
        calculatePercentage = -calculatePercentage;
      }
      const roundedPercentageValue = calculatePercentage?.toFixed(2);
      setPercentage(roundedPercentageValue);
    } else {
      setPercentage(0);
    }

    if (differenceValue > 0) {
      setStatus(true);
    } else {
      setStatus(false);
    }
    // console.log('differenceValue: ', differenceValue);
  }, [currentValue, acquisitionCost, quantity, selectedProduct]);

  const editPortfolio = () => {
    const emptyVariables = [];

    // if (!quantity) emptyVariables.push('Quantity');
    // if (!acquisitionCost) emptyVariables.push('AcquisitionCost');
    // if (!purchaseDate) emptyVariables.push('PurchaseDate');
    if (!quantity) {
      setQuantityError('Quantity cannot be Empty');
    } else if (quantity <= 0) {
      setQuantityError('Quantity must be greater than 0');
    } else {
      const inputDate = purchaseDate;
      const dateParts = inputDate.split('/');
      const formattedDate = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`;

      console.log('formattedDate: ', formattedDate);

      var formdata = new FormData();
      formdata.append('metal_quantity', quantity);
      formdata.append('acquisition_cost', acquisitionCost);
      formdata.append('purchase_date', formattedDate);
      formdata.append('metal_value', acquisitionCost);
      console.log('formdata', formdata)

      if (emptyVariables.length > 0) {
        setError(`Error: ${emptyVariables.join(', ')} Should not be Empty`);
      } else {
        setloader(true);
        putRequestWithToken(
          `${BASE_URL}/portfolio/update-portfolio/?id=${id}`,
          formdata,
          AuthReducer.userData.token,
        )
          .then(result => {
            console.log(result);
            PortfolioSummary();
            alert('Successfully Edit Portfolio');
            Navigation.navigate('Portfolio', {
              metalId: route.params.metalId,
              metalName: route.params.metalName,
            });
          })
          .catch(error => {
            console.log('error', error);
            setloader(false);
          });
      }
    }
  };

  const dispatch = useDispatch();

  function PortfolioSummary() {
    setloader(true);
    getRequestWithOutBody(
      `${BASE_URL}/portfolio/user-portfolio-summary/`,
      AuthReducer.userData.token,
    )
      .then(result => {
        // setLoading(false);

        dispatch(portfolio(result));

        getRequestWithOutBody(
          `${BASE_URL}/portfolio/user-portfolio-by-user/`,
          AuthReducer.userData.token,
        )
          .then(result => {
            console.log('portfolio-by-user', result);
            dispatch(portfolioUser(result));
            setloader(false);
          })
          .catch(error => {
            setloader(false);
            console.log('errorhhhhhh', error);
          });
      })
      .catch(error => {
        setloader(false);
        console.log('error', error);
      });
  }

  const currentDate = new Date();
  const maxDate = currentDate.toISOString().split('T')[0];

  return (
    <>
      <ModalView
        set={setIsModalVisible}
        get={modalVisible}
        cross={() => setIsModalVisible(false)}
        txt={'Are you sure you want to discard the changes?'}
        no={() => {
          setIsModalVisible(!modalVisible);
        }}
        yes={() => {
          setIsModalVisible(!modalVisible);
          Navigation.navigate('Portfolio', {
            metalId: route.params.metalId,
            metalName: route.params.metalName,
          });
        }}
      />

      <Modal
        visible={isModalVisible}
        animationType="none"
        transparent={false}
        onRequestClose={closeCalendar}>
        <View style={styles.modalContainer}>
          <Pressable
            onPress={() => {
              setModalVisible(false);
            }}>
            <View
              style={{
                alignContent: 'flex-end',
                alignSelf: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Entypo name="cross" size={28} color={'black'} />
            </View>
          </Pressable>
          <Calendar
            maxDate={maxDate} // Set maxDate to the current date
            onDayPress={day => {
              // Ensure selected date is not in the future
              const currentDate = new Date();
              const selectedDate = new Date(day.timestamp);

              if (selectedDate <= currentDate) {
                console.log('Selected day:', day);
                const month = String(day.month).padStart(2, '0');
                const formattedDay = String(day.day).padStart(2, '0');
                const formattedDate = `${month}/${formattedDay}/${day.year}`;
                console.log('sdc', formattedDate);
                setPurchaseDate(formattedDate);
                closeCalendar();
              } else {
                console.log('You can only select past dates.');
              }
            }}
          />
        </View>
      </Modal>

      {loader ? (
        <Loader />
      ) : (
        <SafeArea>
          <ScrollView style={{ backgroundColor: '#EDCC4500' }}>
            <View
              style={{
                marginHorizontal: '5%',
                marginTop: '9%',
                marginBottom: '5%',
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <View style={{ alignSelf: 'center' }}>
                  <Pressable
                    onPress={() => {
                      setIsModalVisible(true);
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
                <View style={{ alignSelf: 'center' }}>
                  <Heading
                    Heading={'Edit Metal'}
                    Fontsize={20}
                    color={COLORS.dark}
                    Fontweight={'bold'}
                    txtAlign={'center'}
                  />
                </View>
                <View style={{ alignSelf: 'center' }}>
                  <Heading
                    Heading={'        '}
                    Fontsize={20}
                    color={COLORS.dark}
                    Fontweight={'bold'}
                    txtAlign={'center'}
                  />
                </View>
              </View>
              {error && (
                <View
                  style={{
                    marginTop: 10,
                    borderColor: 'black',
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 20,
                  }}>
                  <Text style={{ textAlign: 'center', color: 'red' }}>
                    {error}
                  </Text>
                </View>
              )}

              <View
              // style={{justifyContent: 'space-between', flexDirection: 'row'}}
              >
                <View
                  style={{ marginTop: '2%', marginBottom: -34, width: '100%' }}>
                  <Heading
                    Heading={'Metal'}
                    Fontsize={14}
                    color={COLORS.dark}
                    Fontweight={'bold'}
                    // mt={10}
                    ml={10}
                  />
                  {arrayOfMetal && (
                    <View style={{ marginTop: 5 }}>
                      <DropdownComponent
                        data={arrayOfMetal}
                        defaultValue={dataFromParams.metal_name}
                        value={selectedMetal}
                        setValue={setSelectedMetal}
                      />
                    </View>
                  )}
                </View>
              </View>
              <View>
                <View
                  style={{ marginTop: '2%', marginBottom: -34, width: '100%' }}>
                  <Heading
                    Heading={' Grade'}
                    Fontsize={14}
                    color={COLORS.dark}
                    Fontweight={'bold'}
                    // mt={10}
                    ml={10}
                  />
                  <View style={{ marginTop: 5 }}>
                    <DropdownComponent
                      data={arrayOfGrade}
                      defaultValue={dataFromParams.grade_name}
                      value={selectedGrade}
                      setValue={setSelectedGrade}
                    />
                  </View>
                </View>
              </View>
              <View style={{ marginTop: '5%' }}>
                <Heading
                  Heading={'Product Family'}
                  Fontsize={14}
                  color={COLORS.dark}
                  Fontweight={'bold'}
                  mb={5}
                  ml={10}
                />
                <DropdownComponent
                  data={arrayOfProductFamily}
                  defaultValue={dataFromParams.product_family_name}
                  value={selectedProductFamily}
                  setValue={setSelectedProductFamily}
                />
              </View>
              <View style={{ marginTop: -20 }}>
                <Heading
                  Heading={'Product'}
                  Fontsize={14}
                  color={COLORS.dark}
                  Fontweight={'bold'}
                  mb={5}
                  ml={10}
                />
                <DropdownComponent
                  data={arrayOfProduct}
                  defaultValue={dataFromParams.product_name}
                  value={selectedProduct}
                  setValue={setSelectedProduct}
                />
              </View>
              <View style={{ flexDirection: 'row', marginTop: -15 }}>
                <Heading
                  Heading={'Ounce'}
                  Fontsize={14}
                  color={COLORS.dark}
                  Fontweight={'bold'}
                  width={'48%'}
                  ml={6}
                />
                <Heading
                  Heading={'Quantity'}
                  Fontsize={14}
                  color={COLORS.dark}
                  Fontweight={'bold'}
                  ml={12}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  // height: 40,
                }}>
                <TextInput
                  placeholder="ounce"
                  keyboardType="number-pad"
                  contextMenuHidden={true}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  autoFocus={false}
                  value={ounce}
                  // disabled={true}
                  editable={false}
                  style={{
                    backgroundColor: 'white',
                    width: '49%',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: 5,
                    borderRadius: 20,
                    height: 48,
                    color: 'black',
                  }}
                  textColor={'#667080'}
                  activeUnderlineColor={'transparent'}
                  underlineColorAndroid={'transparent'}
                  underlineColor={'transparent'}
                  placeholderTextColor={'#667080'}
                />
                <TextInput
                  placeholder="0"
                  value={quantity.toString()}
                  onChangeText={setQuantity}
                  // disabled={true}
                  // editable={false}
                  keyboardType="number-pad"
                  style={{
                    backgroundColor: 'white',
                    width: '49%',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: 5,
                    borderRadius: 20,
                    height: 48,
                    color: 'black',
                  }}
                  textColor={'#667080'}
                  activeUnderlineColor={'transparent'}
                  underlineColorAndroid={'transparent'}
                  underlineColor={'transparent'}
                  placeholderTextColor={'#667080'}
                />
              </View>
              <View style={{ marginLeft: 'auto', width: '48%'}}>
                {quantityError && (
                  <View style={{ top: 10, left: 8 }}>
                    <Text style={{ color: 'red', fontSize: 13 }}>{quantityError}</Text>
                  </View>
                )}
              </View>
              <View
                style={
                  {
                    // flexDirection: 'row',
                    // marginTop: -15
                  }
                }>
                <Heading
                  Heading={'Acquisition Cost'}
                  Fontsize={14}
                  color={COLORS.dark}
                  Fontweight={'bold'}
                  width={'48%'}
                  mt={20}
                  // mb={10}
                  ml={10}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  marginTop: 3,
                  // height: 40,
                }}>
                <TextInput
                  placeholder="0"
                  keyboardType="number-pad"
                  style={{
                    backgroundColor: 'white',
                    width: '98%',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: 5,
                    borderRadius: 20,
                    height: 48,
                    color: 'black',
                    margin: 10,
                    marginLeft: 5,
                  }}
                  textColor={'#667080'}
                  activeUnderlineColor={'transparent'}
                  underlineColorAndroid={'transparent'}
                  underlineColor={'transparent'}
                  placeholderTextColor={'#667080'}
                  value={acquisitionCost}
                  onChangeText={setAcquisitionCost}
                />
              </View>
              <View>
                <Heading
                  Heading={'Purchase Date'}
                  Fontsize={14}
                  color={COLORS.dark}
                  Fontweight={'bold'}
                  ml={10}
                  mt={10}
                />
                <Pressable
                  onPress={() => {
                    console.log('working');
                    toggleDatePicker()
                    // setModalVisible(true);
                  }}>
                  <View
                    style={{
                      width: '98%',
                      backgroundColor: 'white',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginVertical: 10,
                      padding: 17,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.5,
                      shadowRadius: 4,
                      elevation: 5,
                      borderRadius: 35,
                      marginHorizontal: 5
                      // marginLeft: -5
                    }}>
                    <View>
                      <Text style={{ color: '#667080' }}>
                        {purchaseDate ? purchaseDate : 'MM/DD/YYYY'}

                        {/* {purchaseDate
                          ? purchaseDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })
                          : '10/16/2023'} */}
                      </Text>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                      <AntDesign name="down" size={14} color={'#667080'} />
                    </View>
                  </View>
                </Pressable>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={toggleDatePicker}
                  maximumDate={new Date()}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  flexDirection: 'row',
                  marginVertical: '4%',
                }}>
                <ButtonComp
                  btnwidth={'92%'}
                  btnHeight={54}
                  btnText={'Save'}
                  justify={'center'}
                  align={'center'}
                  fontSize={16}
                  radius={15}
                  txtwidth={'100%'}
                  txtColor={COLORS.white}
                  press={() => {
                    // Navigation.navigate('DetailItem');
                    editPortfolio();
                  }}
                />
              </View>
              {selectedProduct && acquisitionCost && quantity && (
                <View>
                  <View
                    style={{
                      backgroundColor: '#FCF6D9',
                      marginTop: 10,
                      borderRadius: 10,
                    }}>
                    <Heading
                      Heading={'Current Value'}
                      Fontsize={20}
                      color={COLORS.dark}
                      Fontweight={'bold'}
                      mt={10}
                      ml={8}
                    />
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        margin: 10,
                      }}>
                      <View
                        style={{
                          alignItems: 'flex-start',
                        }}>
                        <Heading
                          Heading={dataFromParams.metal_name}
                          Fontsize={18}
                          color={COLORS.dark}
                          txtAlign={'center'}
                          Fontweight={'bold'}
                        />
                        <Heading
                          Heading={
                            dateSelectedFromProduct
                              ? dateSelectedFromProduct
                              : 'MM/DD/YYYY'
                          }
                          Fontsize={12}
                          color={COLORS.dark}
                          txtAlign={'center'}
                        />
                      </View>
                      <View
                        style={{
                          alignItems: 'flex-end',
                        }}>
                        <Heading
                          Heading={
                            acquisitionCost ? `$${acquisitionCost}` : '$0'
                          }
                          Fontsize={14}
                          color={COLORS.dark}
                          txtAlign={'center'}
                        />
                        <Heading
                          Heading={`${differenceValue} (${percentage == 'Infinity' ? '0.00' : `${percentage}%`
                            })`}
                          Fontsize={14}
                          color={differenceValue > 0 ? '#17A72A' : '#F80608'}
                          txtAlign={'center'}
                        />
                      </View>
                      <View
                        style={{
                          // alignItems: 'flex-end',
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            // height: '100%',
                            marginRight: 10,
                          }}></View>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              // backgroundColor:'pink'
                            }}>
                            {differenceValue > 0 ? (
                              <Image
                                source={require('../../Assets/Images/upIconGreen.png')}
                                resizeMode={'contain'}
                                style={{ width: 10 }}
                              />
                            ) : (
                              <Image
                                source={require('../../Assets/Images/downIconRed.png')}
                                resizeMode={'contain'}
                                style={{ width: 10 }}
                              />
                            )}

                            <Heading Heading={'   '} txtAlign={'center'} />
                            <View
                              style={{
                                backgroundColor:
                                  differenceValue > 0 ? '#B5EFCD' : '#FEBFC0',
                                paddingVertical: 4,
                                paddingHorizontal: 7,
                                borderRadius: 10,
                              }}>
                              <Heading
                                Heading={`$${currentValue}`}
                                Fontsize={13}
                                color={
                                  differenceValue > 0 ? '#17A72A' : '#F80608'
                                }
                                txtAlign={'center'}
                              // backgroundColor={'#B5EFCD'}
                              // p={6}
                              // borderRadius={30}
                              />
                            </View>
                          </View>
                          <Heading
                            Heading={elapsedTime}
                            Fontsize={14}
                            color={'#A8A8A8'}
                            txtAlign={'center'}
                            as={'flex-end'}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </SafeArea>
      )}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
  },
});
