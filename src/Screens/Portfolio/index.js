import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import COLORS from '../../Assets/Style/Color';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BASE_URL} from '../../App/api';
import {Loader} from '../../Components/ReusableComponent/Loader';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {deleteRequest, getRequestWithOutBody} from '../../App/fetch';
import VictoryPieChart from '../../Components/ReusableComponent/VictoryPie';
import {portfolio} from '../../Store/Reducers/PortfolioReducer';
import {VictoryLabel, VictoryPie} from 'victory-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ModalView} from '../../Components/ReusableComponent/Modal';
import {portfolioUser} from '../../Store/Reducers/PortfolioReducerByUser';
import {Dropdown} from 'react-native-element-dropdown';

export const Portfolio = ({route}) => {
  const [navigatingCondition, setNavigatingCondition] = useState(false);
  const [dataPortfolioSummary, setDataPortfolioSummary] = useState([]);
  const portfolioData = useSelector(state => state.PortfolioReducer.data);
  const [loading, setLoading] = useState(false);

  const [totalCurrentValue, setTotalCurrentValue] = useState(0);
  const [totalAcquisitionValue, setTotalAcquisitionValue] = useState(0);
  const [totalDifferenceValue, settotalDifferenceValue] = useState(0);
  const [totalPercentageChange, setTotalPercentageChange] = useState(0);
  const [focus, setFocus] = useState(4);
  const [status, setstatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [metalId, setMetalId] = useState({});
  const [ounces, setOunces] = useState([]);
  const [metalColor, setMetalColor] = useState([]);
  const [metalNameWithColor, setMetalNameWithColor] = useState([]);
  const [portfolioSummary, setPortfolioSummary] = useState([]);
  const userPortfolio = useSelector(state => state.PortfolioReducerByUser.data);
  const [dataMetal, setDataMetal] = useState(null);
  const [selectedMetal, setSelectedMetal] = useState('All Metal');
  const [portfolioByUser, setPortfolioByUser] = useState([]);

  const Navigation = useNavigation();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  let dataportfoliofromReducer = useSelector(
    state => state.PortfolioReducer.data,
  );

  let portfoliofromReducer = useSelector(
    state => state.PortfolioReducerByUser.data,
  );

  useEffect(() => {
    setPortfolioByUser(portfoliofromReducer);
    // console.log('portfolioByUser: ', portfolioByUser);
  }, []);

  useEffect(() => {
    setPortfolioSummary(dataportfoliofromReducer);
    // console.log('Portfolio Summary: ', portfolioSummary);
  }, []);

  useEffect(() => {
    setDataPortfolioSummary(portfolioData);
    // console.log('portfoliofromReducer: ', portfoliofromReducer);

    // Calculate the total current value
    const total_current_value = portfolioData.reduce((total, metal) => {
      return total + parseFloat(metal.total_current_value);
    }, 0);

    // Calculate the total current value
    const total_acquisition_value = portfolioData.reduce((total, metal) => {
      // Convert total_acquisition_value and total_metal_quantity to numbers, multiply, and add to the accumulator
      return (
        total +
        parseFloat(metal.total_acquisition_value) *
          parseFloat(metal.total_metal_quantity)
      );
    }, 0);

    setTotalCurrentValue(total_current_value);
    setTotalAcquisitionValue(total_acquisition_value);

    if (total_current_value > total_acquisition_value) {
      setstatus('Profit');
    } else {
      setstatus('Loss');
    }
  }, [portfolioData]);

  function PortfolioSummary() {
    setLoading(true);
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
            // console.log('portfolio-by-user', result);
            dispatch(portfolioUser(result));
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            console.log('errorhhhhhh', error);
          });
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
      });
  }

  function calculateAdjustedOunces(totalOunces) {
    if (totalOunces < 1) {
      return 2.0;
    } else if (totalOunces < 2) {
      return 3.3;
    } else if (totalOunces < 5) {
      return 3.5;
    } else if (totalOunces < 10) {
      return 4.4;
    } else if (totalOunces < 15) {
      return 4.7;
    } else if (totalOunces < 20) {
      return 5;
    } else if (totalOunces < 25) {
      return 5.3;
    } else if (totalOunces < 30) {
      return 5.5;
    } else if (totalOunces < 35) {
      return 5.7;
    } else if (totalOunces < 40) {
      return 6;
    } else if (totalOunces < 45) {
      return 6.3;
    } else if (totalOunces < 50) {
      return 6.5;
    } else if (totalOunces < 55) {
      return 6.8;
    } else if (totalOunces < 60) {
      return 7;
    } else if (totalOunces < 65) {
      return 7.3;
    } else if (totalOunces < 70) {
      return 7.5;
    } else if (totalOunces < 75) {
      return 7.8;
    } else if (totalOunces < 80) {
      return 8;
    } else if (totalOunces < 85) {
      return 8.3;
    } else if (totalOunces < 90) {
      return 8.5;
    } else if (totalOunces < 95) {
      return 8.8;
    } else if (totalOunces < 100) {
      return 9;
    } else if (totalOunces < 150) {
      return 9.5;
    } else {
      return 10; // Maximum adjusted value for total_ounces above 100
    }
  }

  //filter according to dropdown changes
  useEffect(() => {
    const filterArrayByMetalName = (portfoliofromReducer, selectedMetal) => {
      return portfoliofromReducer.filter(
        item => item.metal_name === selectedMetal,
      );
    };

    const filteredArray = filterArrayByMetalName(
      portfoliofromReducer,
      selectedMetal,
    );
    // console.log('filteredArray', filteredArray);
  }, [selectedMetal]);

  useEffect(() => {
    // console.log('dataPortfolioSummary: ', dataPortfolioSummary);
    if (portfolioSummary) {
      const ouncesData = portfolioSummary.map(item => ({
        x: parseFloat(item.total_ounces).toFixed(1),
        y: calculateAdjustedOunces(item.total_ounces), // Convert total_ounces to a numeric value if needed
      }));
      const metalNameArray = portfolioSummary.map(item => ({
        metalName: item.metal_name,
      }));

      const metalNameToColor = {
        Platinum: '#9b9b6e',
        Silver: '#b5b4b4',
        Gold: '#f7e58f',
      };

      // Map metalNameArray to colors
      const metalColors = metalNameArray.map(
        item => metalNameToColor[item.metalName], // Default color if metalName not found
      );

      // console.log('metalColors: ', metalColors);

      setMetalColor(metalColors);

      // console.log('ouncesArray: ', ouncesData);
      setOunces(ouncesData);

      // console.log('metalNameArray: ', metalNameArray);

      const metalNameAndColors = metalNameArray.map(item => ({
        metalName: item.metalName,
        color: metalNameToColor[item.metalName],
      }));

      // console.log('metalNameANdColors: ', metalNameAndColors);
      setMetalNameWithColor(metalNameAndColors);
      // console.log('metalNameWithColor: ', metalNameWithColor);

      const extractMetalNames = array => {
        const firstMetal = array[0]; // Get the first element of the array

        // Create an object with label and value both set to the metal name of the first element
        const firstMetalObject = {
          label: 'All Metal',
          value: 'All Metal',
        };

        // Map the rest of the array, starting from the second element
        const restOfMetals = array.map(item => ({
          label: item.metal_name,
          value: item.metal_name,
        }));

        // Create the final result array by unshifting the firstMetalObject to the rest of the metals
        const result = [firstMetalObject, ...restOfMetals];

        return result;
      };

      // Usage
      const dataMetal = extractMetalNames(portfolioData);

      // Resulting array
      setDataMetal(dataMetal);

      // console.log('dataPortfolioSummary: ', dataPortfolioSummary);
    }
  }, [portfolioSummary, selectedMetal]);

  const combineArrays = () => {
    if (ounces.length !== 0 && metalNameWithColor.length !== 0) {
      const combinedArray = ounces.map((ounce, index) => ({
        x: ounce.x,
        y: ounce.y,
        metalName: metalNameWithColor[index].metalName,
      }));
      return combinedArray;
    } else {
      return [];
    }
  };

  const mergedArray = combineArrays();
  // console.log('mergedArray', mergedArray);

  // console.log('selectedMetal: ', selectedMetal);

  //filter according to dropdown changes
  useEffect(() => {
    const filterArrayByMetalName = (portfoliofromReducer, selectedMetal) => {
      return portfoliofromReducer.filter(
        item => item.metal_name === selectedMetal,
      );
    };

    const filteredArray = filterArrayByMetalName(
      portfoliofromReducer,
      selectedMetal,
    );
    // console.log('filteredArray', filteredArray);
    setPortfolioByUser(filteredArray);

    // console.log('portfoliofromReducer: ', portfoliofromReducer);

    const filterArrayByMetalNameForPortfolioSummary = (
      dataportfoliofromReducer,
      selectedMetal,
    ) => {
      return dataportfoliofromReducer.filter(
        item => item.metal_name === selectedMetal,
      );
    };

    // filterization for portfolio Summary

    const filteredArrayForPortfolioSummary =
      filterArrayByMetalNameForPortfolioSummary(
        dataportfoliofromReducer,
        selectedMetal,
      );

    setPortfolioSummary(filteredArrayForPortfolioSummary);

    if (selectedMetal == 'All Metal') {
      setPortfolioSummary(dataportfoliofromReducer);
    }
  }, [selectedMetal, dataportfoliofromReducer, portfoliofromReducer]);

  useEffect(() => {
    PortfolioSummary();
  }, []);

  const calculateTotalCurrentValue = portfolioSummary => {
    if (!portfolioSummary || portfolioSummary.length === 0) {
      return 0;
    }

    return portfolioSummary.reduce((total, item) => {
      return total + item.total_current_value;
    }, 0);
  };

  const calculateTotalAcquisitionValue = portfolioSummary => {
    if (!portfolioSummary || portfolioSummary.length === 0) {
      return 0;
    }

    return portfolioSummary.reduce((total, item) => {
      return total + item.total_acquisition_value;
    }, 0);
  };

  useEffect(() => {
    console.log('Porfolio Summary: ', portfolioSummary);
    const totalCurrentValue = calculateTotalCurrentValue(portfolioSummary);
    const totalAcquisitionValue =
      calculateTotalAcquisitionValue(portfolioSummary);

    setTotalCurrentValue(totalCurrentValue);

    setTotalAcquisitionValue(totalAcquisitionValue);

    if (totalCurrentValue > totalAcquisitionValue) {
      setstatus('Profit');
    } else {
      setstatus('Loss');
    }
  }, [portfolioSummary]);

  const renderTableItem = ({item}) => {
    // console.log('shaf', item);
    return (
      <>
        <Pressable
          onPress={() => {
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
  };

  const renderData = ({item}) => {
    // console.log('items..........', item);
    return (
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

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontWeight: 'bold', fontSize: 11, marginTop: 6}}>
                  Quantity:
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 11, color: 'grey'}}>
                  {item.total_metal_quantity}
                </Text>
              </View>
              <View style={{flexDirection: 'column', marginLeft: 8}}>
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
                  {'$' +
                    item?.total_acquisition_value}
                </Text>
              </View>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <View
          style={{
            marginHorizontal: '1%',
            marginBottom: '0%',
          }}>
          <Header header={'Precious Metal Portfolio Tool'} />

          <View style={{marginTop: '10%', marginBottom: -15}}>
            <DropdownComponent
              data={dataMetal}
              defaultValue={'Show All Metals'}
              setValue={setSelectedMetal}
              value={selectedMetal}
            />
          </View>

          <View style={{alignSelf: 'flex-start', marginBottom: '5%'}}>
            <Heading
              Heading={'Asset Allocation Chart'}
              Fontsize={22}
              color={COLORS.dark}
              Fontweight={'bold'}
              txtAlign={'center'}
            />
          </View>

          {dataPortfolioSummary?.length !== 0 && (
            <>
              <View
                style={{
                  alignContent: 'space-between',
                  backgroundColor: 'white',
                  borderRadius: 20,
                  width: '100%',
                  // paddingHorizontal: 20,
                  shadowColor: 'black',
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 5,
                }}>
                <View
                  style={{
                    // alignContent: 'space-between',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: -20,
                  }}>
                  <View
                    style={
                      {
                        // width: '20%',
                        // paddingRight:10
                      }
                    }>
                    <VictoryPieChart
                      sampleData={mergedArray}
                      lossAndProfit={
                        `${
                          totalPercentageChange > 0
                            ? (totalPercentageChange || 0).toFixed(0)
                            : (-totalPercentageChange || 0).toFixed(0)
                        }% ` + status
                      }
                      colors={metalColor}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'column',
                      width: '50%',
                      alignSelf: 'center',
                      marginRight: 4,
                    }}>
                    <View style={{width: '99%'}}>
                      <Heading
                        Heading={'Total Asset Current Value'}
                        Fontsize={12}
                        color={COLORS.dark}
                        Fontweight={'bold'}
                        as={'flex-start'}
                        width={'100%'}
                        txtAlign={'right'}
                      />
                      <Heading
                        Heading={' $' + totalCurrentValue}
                        Fontsize={14}
                        color={'#BA7607'}
                        Fontweight={'bold'}
                        as={'flex-end'}
                      />
                    </View>
                    <View style={{marginTop: 20, width: '99%'}}>
                      <Heading
                        Heading={'Total Asset Acquisition Cost'}
                        Fontsize={12}
                        color={COLORS.dark}
                        Fontweight={'bold'}
                        as={'flex-end'}
                      />
                      <View
                        style={{
                          alignItems: 'flex-end',
                          flexDirection: 'row',
                          alignSelf: 'flex-end',
                        }}>
                        <Image
                          source={require('../../Assets/Images/upIconGreen.png')}
                          style={{width: 8}}
                          resizeMode={'contain'}
                        />
                        <Heading
                          Heading={'$' + totalAcquisitionValue}
                          Fontsize={14}
                          color={'#17A72A'}
                          Fontweight={'bold'}
                          as={'flex-end'}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: '2%'}}>
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
              <View
                style={{
                  marginVertical: '3%',
                  marginHorizontal: '-4%',
                  padding: 6,
                }}>
                <FlatList
                  data={
                    selectedMetal.length !== 0 && selectedMetal !== 'All Metal'
                      ? portfolioSummary
                      : dataportfoliofromReducer
                  }
                  horizontal={true}
                  renderItem={renderData}
                  keyExtractor={item => item.id}
                  contentContainerStyle={{flexDirection: 'row'}}
                  extraData={portfolioSummary.length}
                  showsHorizontalScrollIndicator={false}
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
                <View style={{width: '22%', marginLeft: 1}}>
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
            </>
          )}
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
          setModalVisible(false);
          // console.log('aaaaa', metalId.id);
        }}
        yes={() => {
          setModalVisible(false);
          // console.log('metalid', metalId);
          // console.log(
          //   'AuthReducer.userData.token: ',
          //   AuthReducer.userData.token,
          // );

          setLoading(true);
          deleteRequest(
            `${BASE_URL}/portfolio/delete-portfolio/?id=${metalId}`,
            AuthReducer.userData.token,
          )
            .then(result => {
              // console.log('result: ', result);
              if (result.status == 'Portfolio deleted successfully') {
                alert('Successfully Deleted');
                setLoading(false);
                PortfolioSummary();
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
        ) : dataPortfolioSummary?.length !== 0 ? (
          <View
            style={{
              marginHorizontal: '4%',
              marginTop: '5%',
              marginBottom: Platform.OS == 'ios' ? '15%' : '22%',
            }}>
            <FlatList
              data={
                selectedMetal.length !== 0 && selectedMetal !== 'All Metal'
                  ? portfolioByUser
                  : portfoliofromReducer
              }
              renderItem={renderTableItem}
              keyExtractor={item => item.id}
              // contentContainerStyle={{flexDirection: 'column'}}
              extraData={portfolioByUser.length}
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
        ) : (
          <View
            style={{
              marginHorizontal: '2%',
              marginVertical: '3%',
              marginBottom: '0%',
            }}>
            <Header header={'Precious Metal Portfolio Tool'} />
            <Heading
              Heading={'Holdings'}
              Fontsize={28}
              color={COLORS.dark}
              Fontweight={'bold'}
              mx={12}
              mt={20}
            />
            <Heading
              Heading={'You do not have any holdings.'}
              Fontsize={16}
              color={COLORS.textColor}
              mx={12}
              mt={10}
            />
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                marginVertical: '6%',
                height: 50,
              }}>
              <ButtonComp
                btnwidth={'92%'}
                btnHeight={54}
                btnText={'+Add New Asset Holding'}
                justify={'center'}
                align={'center'}
                fontSize={16}
                radius={15}
                txtwidth={'100%'}
                txtColor={COLORS.white}
                press={() => {
                  Navigation.navigate('AddMetal', {screenName: 'portFolio'});
                  // addToPortfolio();
                }}
              />
            </View>
          </View>
        )}
      </SafeArea>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0000001A',
    padding: 16,
    borderRadius: 10,
    elevation: 5, // Elevation property 3D effect create karega
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  circle: {
    width: 15, // Adjust the size as needed
    height: 15, // Adjust the size as needed
    borderRadius: 10, // Half of the width/height to make it a circle
  },
});
