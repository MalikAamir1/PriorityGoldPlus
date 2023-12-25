import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  View,
  Platform,
  Alert,
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
import { BASE_URL } from '../../App/api';
import { getRequestWithOutBody, postRequestWithToken } from '../../App/fetch';
import { portfolio } from '../../Store/Reducers/PortfolioReducer';
import { portfolioUser } from '../../Store/Reducers/PortfolioReducerByUser';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const AddMetal = () => {
  const Navigation = useNavigation();
  const [userDataFromFacebook, setUserDataFromFacebook] = useState([]);

  const AuthReducer = useSelector(state => state.AuthReducer);
  // console.log('reducerData: ', AuthReducer.userData.token);

  let dataMetalType = [
    {
      label: '24K',
      value: '24K',
    },
    {
      label: '22K',
      value: '22K',
    },
    {
      label: '18K',
      value: '18K',
    },
  ];

  const [selectedMetal, setSelectedMetal] = useState('');
  const [arrayOfMetal, setArrayOfMetal] = useState([]);

  const [selectedGrade, setSelectedGrade] = useState('');
  const [arrayOfGrade, setArrayOfGrade] = useState([]);

  const [selectedProductFamily, setSelectedProductFamily] = useState('');
  const [arrayOfProductFamily, setArrayOfProductFamily] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState('');
  const [arrayOfProduct, setArrayOfProduct] = useState([]);

  const [completeResultOfProduct, setCompleteResultOfProduct] = useState([]);

  const [ounce, setOunce] = useState(0);

  const [quantity, setQuantity] = useState(0);
  const [acquisitionCost, setAcquisitionCost] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState();
  console.log('purchaseDate', purchaseDate)

  const dateObject = new Date(purchaseDate);

// Get year, month, and day
const year = dateObject.getFullYear();
const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
const day = dateObject.getDate().toString().padStart(2, '0');

// Create the formatted date string
const dateToApi = `${year}-${month}-${day}`;

console.log('dateToApi', dateToApi);

  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);

  const [dateSelectedFromProduct, setdateSelectedFromProduct] = useState();

  const [currentValue, setCurrentValue] = useState(0);
  const [differenceValue, setDifferenceValue] = useState(0);

  const [status, setStatus] = useState(false);

  const [percentage, setPercentage] = useState(0);

  const [elapsedTime, setElapsedTime] = useState('');

  // Define state variables for each error
  const [metalError, setMetalError] = useState('');
  const [gradeError, setGradeError] = useState('');
  const [productFamilyError, setProductFamilyError] = useState('');
  const [productError, setProductError] = useState('');
  const [ounceError, setOunceError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [acquisitionCostError, setAcquisitionCostError] = useState('');
  const [purchaseDateError, setPurchaseDateError] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleDatePicker = () => {
    setDatePickerVisible(!isDatePickerVisible);
  };
  const handleConfirm = date => {
    console.log('date', date)
    setPurchaseDate(date);
    toggleDatePicker();
  };

  const dispatch = useDispatch();

  const openCalendar = () => {
    setModalVisible(true);
  };

  const closeCalendar = () => {
    setModalVisible(false);
  };

  const [loader, setloader] = useState(false);

  useEffect(() => {
    getRequestWithOutBody(
      `${BASE_URL}/portfolio/active-metals/`,
      AuthReducer.userData.token,
    )
      .then(result => {
        const metalNames = result.results.map(item => ({
          label: item.metal_name,
          value: item.metal_id,
        }));

        setArrayOfMetal(metalNames);

        getRequestWithOutBody(
          `${BASE_URL}/portfolio/active-grades/`,
          AuthReducer.userData.token,
        )
          .then(result => {
            const gradeName = result.results.map(item => ({
              label: item.grade_name,
              value: item.id,
            }));

            setArrayOfGrade(gradeName);
          })
          .catch(error => {
            console.log('error', error);
          });
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  useEffect(() => {
    if (selectedMetal && selectedGrade) {
      getRequestWithOutBody(
        `${BASE_URL}/portfolio/product-families/?metal_id=${selectedMetal}&grade_id=${selectedGrade}`,
        AuthReducer.userData.token,
      )
        .then(result => {
          const productfamilyName = result.map(item => ({
            label: item.productfamily_name,
            value: item.productfamily_id,
          }));
          setArrayOfProductFamily(productfamilyName);
        })
        .catch(error => {
          console.log('error', error);
        });
    } else {
      // console.log('Not Selected');
    }
  }, [selectedMetal, selectedGrade]);

  useEffect(() => {
    if (selectedMetal && selectedGrade && selectedProductFamily) {
      getRequestWithOutBody(
        `${BASE_URL}/portfolio/active-products/?metal_id=${selectedMetal}&product_family_id=${selectedProductFamily}&grade_id=${selectedGrade}`,
        AuthReducer.userData.token,
      )
        .then(result => {
          setCompleteResultOfProduct(result.results);
          const product = result.results.map(item => ({
            label: item.product_name,
            value: item.id,
          }));

          setArrayOfProduct(product);
        })
        .catch(error => {
          console.log('error', error);
        });
    } else {
    }
  }, [selectedProductFamily]);

  useEffect(() => {
    const selectedObject = completeResultOfProduct?.find(
      item => item.id === selectedProduct,
    );

    selectedObject?.ounces !== '' && setOunce(selectedObject?.ounces);

    if (selectedObject?.id) {
      getRequestWithOutBody(
        `${BASE_URL}/portfolio/product-prices-sku/?product_id=${selectedObject?.id}`,
        AuthReducer.userData.token,
      )
        .then(result => {
          setData(result);
        })
        .catch(error => {
          console.log('error', error);
        });
    } else {
      // console.log('id is not here');
    }
  }, [selectedProduct]);

  useEffect(() => {
    setSelectedProductFamily('');
    setSelectedProduct('');
    setArrayOfProduct([]);
    // setArrayOfProductFamily([]);
    setOunce('');
    setAcquisitionCost('');
    setPurchaseDate('');
    setQuantity('');
    setPercentage(0);
    setCurrentValue(0);
    setDifferenceValue(0);
  }, [selectedMetal]);

  useEffect(() => {
    setSelectedProductFamily('');
    setSelectedProduct('');
    setArrayOfProduct([]);
    setOunce('');
    setAcquisitionCost('');
    setPurchaseDate('');
    setQuantity('');
    setPercentage(0);
    setCurrentValue(0);
    setDifferenceValue(0);
  }, [selectedGrade]);

  useEffect(() => {
    setOunce('');
    setSelectedProduct('');
    setQuantity('');
    setAcquisitionCost('');
  }, [selectedProductFamily]);

  useEffect(() => {
    setQuantity('');
    setAcquisitionCost('');
  }, [selectedProduct]);

  useEffect(() => {
    if (data?.results) {
      const date_object = new Date(data?.results[0]?.updated);
      const month = date_object.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = date_object.getDate();
      const year = date_object.getFullYear();
      const formatted_date = `${month.toString().padStart(2, '0')}/${day
        .toString()
        .padStart(2, '0')}/${year}`;
      // let dateSelected = formatted_date;
      setdateSelectedFromProduct(formatted_date);
      // console.log('formatted_date: ', formatted_date);

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
    }

    // Extract month, day, and year from the Date object

    // Format the date as MM/DD/YYYY
  }, [data]);

  useEffect(() => {
    if (data?.results && quantity && completeResultOfProduct) {
      let foundObject = completeResultOfProduct?.find(
        obj => obj.id === selectedProduct,
      );
      // console.log('foundObject: ', foundObject?.factor_rate);
      let multiplyData =
        quantity * data?.results[0].ask * foundObject?.factor_rate;

      const roundedCureentValue = multiplyData.toFixed(1);

      setCurrentValue(roundedCureentValue);
      // console.log('Current Value: ', currentValue);
    }
  }, [data, quantity, acquisitionCost, quantity]);

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

  const [error, setError] = useState('');
  // console.log('purchasedate', purchaseDate)

  const addToPortfolio = () => {
    const emptyVariables = [];

    if (!selectedMetal) {
      setMetalError('Metal cannot be Empty');
    } else {
      setMetalError('');
    }
    if (!selectedGrade) {
      setGradeError('Grade cannot be Empty');
    } else {
      setGradeError('');
    }
    if (!selectedProductFamily) {
      setProductFamilyError('Product Family cannot be Empty');
    } else {
      setProductFamilyError('');
    }
    if (!selectedProduct) {
      setProductError('Product cannot be Empty');
    } else {
      setProductError('');
    }
    if (!ounce) {
      setOunceError('Ounce cannot be Empty');
    }
    else {
      setOunceError('');
    }
    if (!quantity) {
      setQuantityError('Quantity cannot be Empty');
    } else {
      setQuantityError('');
    }
    if (!acquisitionCost) {
      setAcquisitionCostError('Acquisition Cost cannot be Empty');
    } else {
      setAcquisitionCostError('');
    }
    if (!purchaseDate) {
      setPurchaseDateError('Purchase Date cannot be Empty');
    } else {
      setPurchaseDateError('');
    }
    // ========
    if (!selectedMetal) {
      setMetalError('Metal cannot be Empty');
    } else if (!selectedGrade) {
      setGradeError('Grade cannot be Empty');
    } else if (!selectedProductFamily) {
      setProductFamilyError('Product Family cannot be Empty');
    } else if (!selectedProduct) {
      setProductError('Product cannot be Empty');
    } else if (!ounce) {
      setOunceError('Ounce cannot be Empty');
    } else if (!quantity) {
      setQuantityError('Quantity cannot be Empty');
    } else if (!acquisitionCost) {
      setAcquisitionCostError('Acquisition Cost cannot be Empty');
    } else if (!purchaseDate) {
      setPurchaseDateError('Purchase Date cannot be Empty');
    } else {
      // const inputDate = purchaseDate;
      // const dateParts = inputDate.split('/');
      const formattedDate = purchaseDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      console.log('formattedDate: ', formattedDate);

      var formdata = new FormData();
      formdata.append('metal', selectedMetal);
      formdata.append('grade', selectedGrade);
      formdata.append('product_family', selectedProductFamily);
      formdata.append('product', selectedProduct);
      formdata.append('ounces', ounce);
      formdata.append('metal_quantity', quantity);
      formdata.append('acquisition_cost', acquisitionCost);
      formdata.append('purchase_date', dateToApi);
      formdata.append('metal_value', acquisitionCost);

      // All variables have values
      setError('');

      setloader(true);

      console.log('formdata before', formdata);
      postRequestWithToken(
        `${BASE_URL}/portfolio/add-portfolio/`,
        formdata,
        AuthReducer.userData.token,
      )
        .then(result => {
          console.log('formdata', formdata);
          // setloader(false);
          PortfolioSummary();
          console.log('result of add metal', result);
          setSelectedMetal('');
          setSelectedGrade('');
          setSelectedProductFamily('');
          setArrayOfProductFamily([]);
          setSelectedProduct('');
          setArrayOfProduct([]);
          setCompleteResultOfProduct('');
          setOunce('');
          setQuantity('');
          setAcquisitionCost('');
          setPurchaseDate('');
          setData('');
          setdateSelectedFromProduct('');
          setCurrentValue('');
          setDifferenceValue('');
          setStatus('');
          setPercentage('');
          setElapsedTime('');
          Alert.alert(
            'Successfully',
            'Successfully added to Portfolio',
            [
              {
                text: 'OK',
                onPress: () => {
                  // Navigate to another screen after pressing OK
                  Navigation.navigate('Portfolio'); // Replace 'YourTargetScreen' with the actual screen name
                },
              },
            ],
            { cancelable: false }
          );
          setMetalError('');
          setGradeError('');
          setProductFamilyError('');
          setProductError('');
          setOunceError('');
          setQuantityError('');
          setAcquisitionCostError('');
          setPurchaseDateError('');
        })
        .catch(error => {
          console.log('error', error);
          setloader(false);
        });
    }
  };

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
      <Modal
        visible={loader}
        transparent={true}
        animationType="fade"
        onRequestClose={() => { }}>
        <View style={styles.loaderContainer}>
          <View style={styles.loaderContent}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        </View>
      </Modal>

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
                setPurchaseDate(formattedDate);
                closeCalendar();
              } else {
                console.log('You can only select past dates.');
              }
            }}
          // minDate={'1900-01-01'} // Adjust the minimum date as needed
          />
        </View>
      </Modal>

      <ScrollView style={{ marginBottom: 40, backgroundColor: 'white' }}>
        <View
          style={{
            marginHorizontal: '5%',
            marginTop: Platform.OS === 'ios' ? '10%' : '6%',
            marginBottom: '30%',
          }}>
          <Header header={'Add Metal'} />
          {error && (
            <View
              style={{
                marginTop: 10,
                borderColor: 'black',
                borderWidth: 1,
                padding: 5,
                borderRadius: 20,
              }}>
              <Text style={{ textAlign: 'center', color: 'red' }}>{error}</Text>
            </View>
          )}

          <View style={{ marginTop: '5%' }}>
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
                  defaultValue={'----'}
                  value={selectedMetal}
                  setValue={setSelectedMetal}
                />
              </View>
            )}
            {metalError && (
              <View style={{ top: -30, left: 10 }}>
                <Text style={{ color: 'red', fontSize: 13 }}>{metalError}</Text>
              </View>
            )}
          </View>

          <View style={{ marginTop: -20 }}>
            <Heading
              Heading={'Grade'}
              Fontsize={14}
              color={COLORS.dark}
              Fontweight={'bold'}
              // mt={10}
              ml={10}
            />
            <View style={{ marginTop: 5 }}>
              <DropdownComponent
                data={arrayOfGrade}
                defaultValue={'----'}
                value={selectedGrade}
                setValue={setSelectedGrade}
              />
            </View>
            {gradeError && (
              <View style={{ top: -30, left: 10 }}>
                <Text style={{ color: 'red', fontSize: 13 }}>{gradeError}</Text>
              </View>
            )}
          </View>

          <View style={{ marginTop: -20 }}>
            <Heading
              Heading={'Product Family'}
              Fontsize={14}
              color={COLORS.dark}
              Fontweight={'bold'}
              // mt={10}
              ml={10}
            />
            <DropdownComponent
              data={arrayOfProductFamily}
              defaultValue={'----'}
              value={selectedProductFamily}
              setValue={setSelectedProductFamily}
            />
            {productFamilyError && (
              <View style={{ top: -30, left: 10 }}>
                <Text style={{ color: 'red', fontSize: 13 }}>{productFamilyError}</Text>
              </View>
            )}
          </View>

          <View style={{ marginTop: -20 }}>
            <Heading
              Heading={'Product'}
              Fontsize={14}
              color={COLORS.dark}
              Fontweight={'bold'}
              // mt={10}
              ml={10}
            />
            <DropdownComponent
              data={arrayOfProduct}
              defaultValue={'----'}
              value={selectedProduct}
              setValue={setSelectedProduct}
            />
            {productError && (
              <View style={{ top: -30, left: 10 }}>
                <Text style={{ color: 'red', fontSize: 13 }}>{productError}</Text>
              </View>
            )}
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
              placeholder="0.00"
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
              keyboardType="number-pad"
              contextMenuHidden={true}
              autoCapitalize={'none'}
              autoCorrect={false}
              autoFocus={false}
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
              onChangeText={setQuantity}
              value={quantity}
            />
          </View>

          {/* <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View style={{ width: '50%' }}>
              {ounceError && (
                <View style={{ top: 10, left: 5 }}>
                  <Text style={{ color: 'red', fontSize: 13 }}>{ounceError}</Text>
                </View>
              )}
            </View> */}
            <View style={{ width: '48%', marginLeft: 'auto' }}>
              {quantityError && (
                <View style={{ top: 10, left: 8 }}>
                  <Text style={{ color: 'red', fontSize: 13 }}>{quantityError}</Text>
                </View>
              )}
            </View>
          {/* </View> */}

          <View>
            <Heading
              Heading={'Acquisition Cost Per Unit'}
              Fontsize={14}
              color={COLORS.dark}
              Fontweight={'bold'}
              // width={'100%'}
              mt={20}
              ml={10}
            />
            <TextInput
              placeholder="0.00"
              keyboardType="number-pad"
              contextMenuHidden={true}
              autoCapitalize={'none'}
              autoCorrect={false}
              autoFocus={false}
              // editable={true}
              style={{
                backgroundColor: 'white',
                // width: '49%',
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
            {acquisitionCostError && (
              <View style={{marginBottom: 5, left: 10}}>
                <Text style={{ color: 'red', fontSize: 13 }}>{acquisitionCostError}</Text>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              marginTop: 3,
            }}></View>

          <View
            style={{
              marginTop: -15,
            }}>
            <Heading
              Heading={'Purchase Date'}
              Fontsize={14}
              color={COLORS.dark}
              Fontweight={'bold'}
              mt={20}
              ml={10}
            />
            <Pressable
              onPress={() => {
                console.log('working');
                toggleDatePicker()
                // disabled={props.disabled}
                // setModalVisible(true);
              }}>
              <View
                style={{
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
                  marginHorizontal: 7
                }}>
                <View>
                  <Text style={{ color: '#667080' }}>
                    {purchaseDate
                      ? purchaseDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })
                      : '10/16/2023'}
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

          {purchaseDateError && (
            <View style={{left: 10}}>
              <Text style={{ color: 'red', fontSize: 13 }}>{purchaseDateError}</Text>
            </View>
          )}

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
              btnText={'Save & Continue'}
              justify={'center'}
              align={'center'}
              fontSize={16}
              radius={15}
              txtwidth={'100%'}
              txtColor={COLORS.white}
              press={() => {
                // Navigation.navigate('DetailItem');
                addToPortfolio();
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
                      Heading={data?.results && data?.results[0]?.metal_name}
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
                      Heading={acquisitionCost ? `$${acquisitionCost}` : '$0'}
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
                            color={differenceValue > 0 ? '#17A72A' : '#F80608'}
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
    padding: 20,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  loaderContent: {
    // backgroundColor: 'white', // Loader background color
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});