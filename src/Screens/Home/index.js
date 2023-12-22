import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableOpacity,
  // TouchableOpacity,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useDispatch, useSelector} from 'react-redux';
import COLORS from '../../Assets/Style/Color';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import Heading from '../../Components/ReusableComponent/Heading';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {Header} from '../../Components/ReusableComponent/Header';
import {width} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {BASE_URL} from '../../App/api';
import {Loader} from '../../Components/ReusableComponent/Loader';
import {getRequestWithOutBody} from '../../App/fetch';
import VictoryPieChart from '../../Components/ReusableComponent/VictoryPie';
import MultiLineChart from '../../Components/ReusableComponent/MultiLineChart';
import ButtonComp from '../../Components/ReusableComponent/Button';
import {portfolio} from '../../Store/Reducers/PortfolioReducer';
import cardImage from '../../Assets/Images/timer.png';
import PortfolioReducerByUser, {
  portfolioUser,
} from '../../Store/Reducers/PortfolioReducerByUser';
// import MultiLineChart from '../../Components/ReusableComponent/MultiLineChart';

export const Home = () => {
  const Navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(0);
  const [focus, setFocus] = useState(1);
  const dispatch = useDispatch();
  const portfoliofromReducer = useSelector(
    state => state.PortfolioReducer.data,
  );

  const [totalCurrentValue, setTotalCurrentValue] = useState(0);
  const [totalAcquisitionValue, setTotalAcquisitionValue] = useState(0);
  const [totalDifferenceValue, settotalDifferenceValue] = useState(0);
  const [totalPercentageChange, setTotalPercentageChange] = useState(0);
  const userPortfolio = useSelector(state => state.PortfolioReducerByUser.data);
  console.log('userPortfolio', userPortfolio);

  const [status, setstatus] = useState('');

  useEffect(() => {
    setDataPortfolioSummary(portfoliofromReducer);
    console.log('portfoliofromReducer: ', portfoliofromReducer);

    function calculateTotalValues(data, propertyName) {
      return Array.isArray(data)
        ? data.reduce((total, item) => {
            const value = parseFloat(item[propertyName]);
            return isNaN(value) ? total : total + value;
          }, 0)
        : 0;
    }

    const total_current_value = calculateTotalValues(
      portfoliofromReducer,
      'total_current_value',
    );
    const total_acquisition_value = calculateTotalValues(
      portfoliofromReducer,
      'total_acquisition_value',
    );
    const total_difference_value = calculateTotalValues(
      portfoliofromReducer,
      'total_difference_value',
    );

    const percentage_change =
      ((total_current_value - total_acquisition_value) /
        total_acquisition_value) *
      100;

    setTotalCurrentValue(total_current_value);
    setTotalAcquisitionValue(total_acquisition_value);
    settotalDifferenceValue(total_difference_value);
    setTotalPercentageChange(percentage_change);

    if (total_current_value > total_acquisition_value) {
      setstatus('Profit');
    } else {
      setstatus('Loss');
    }
  }, [portfoliofromReducer]);

  const AuthReducer = useSelector(state => state.AuthReducer);



  const [dataPortfolioSummary, setDataPortfolioSummary] = useState([]);

  const [loading, setLoading] = useState(false);

  // console.log('dataPortfolioSummary: ', dataPortfolioSummary);

  const [ounces, setOunces] = useState([]);
  const [metalColor, setMetalColor] = useState([]);
  const [metalNameWithColor, setMetalNameWithColor] = useState([]);

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
            console.log('portfolio-by-user', result);
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

  useEffect(() => {
    PortfolioSummary();
    setDataPortfolioSummary(portfoliofromReducer);
  }, []);

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

  useEffect(() => {
    // console.log('dataPortfolioSummary: ', dataPortfolioSummary);
    if (dataPortfolioSummary) {
      const ouncesData = dataPortfolioSummary?.map(item => ({
        x: parseFloat(item.total_ounces).toFixed(2),
        y: calculateAdjustedOunces(item.total_ounces), // Convert total_ounces to a numeric value if needed
      }));
      const metalNameArray = dataPortfolioSummary?.map(item => ({
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
    }
  }, [dataPortfolioSummary]);

  const renderItem = ({item}) => (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 2,
          marginHorizontal: 4,
        }}>
        <Image
          source={
            item?.metal_name == 'Platinum'
              ? require('../../Assets/Images/paladiumLogo.png')
              : item?.metal_name == 'Silver'
              ? require('../../Assets/Images/silverLogo.png')
              : require('../../Assets/Images/goldLogo.png')
          }
          style={{margin: 10}}
        />
        <View>
          <Text style={styles.trendingText}>{item?.metal_name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 8, color: 'grey'}}>
              ${item?.total_current_value}
            </Text>
            <Text
              style={{
                fontSize: 8,
                color: item?.total_difference_value >= 0 ? 'green' : 'red',
                marginHorizontal: 6,
              }}>
              {item?.total_difference_value > 0
                ? item?.total_percentage_change
                : -item?.total_percentage_change}
              %
            </Text>
          </View>
        </View>
      </View>
    </>
  );

  return (
    <SafeArea>
      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            // marginHorizontal: '5%',
            marginVertical: '5%',
            marginBottom: Platform.OS === 'ios' ? '18%' : '28%',
            flex: 1,
          }}>
          <View style={{marginBottom: 10, marginHorizontal: '5%'}}>
            <Header header={'Home'} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: -50,
                marginHorizontal: '5%',
              }}>
              <View>
                <Image
                  source={require('../../Assets/Images/hand.png')} // Replace with the path to your image
                  style={{width: 100, height: 170}} // Adjust the width and height as needed
                />
              </View>
              <View style={{marginTop: 16}}>
                <Heading
                  Heading={`Hi ${AuthReducer?.userData?.user?.profile?.display_name}!`}
                  Fontsize={20}
                  color={COLORS.dark}
                  Fontweight={'bold'}
                  // mv={6}
                  mt={22}
                />
                <Heading
                  Heading={'Welcome To NEXT GEN BULLION'}
                  Fontsize={14}
                  color={COLORS.dark}
                  mt={15}
                />
              </View>
            </View>
            <View
              style={{
                marginHorizontal: '5%',
                // marginVertical: '5%',
                marginBottom: '0%',
                flex: 1,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginHorizontal: 10,
                }}>
                <View>
                  <View></View>
                </View>

                <View style={{flexDirection: 'column'}}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Heading
                        Heading={'News'}
                        Fontsize={24}
                        color={COLORS.dark}
                        Fontweight={'bold'}
                        mb={4}
                      />
                      <Pressable onPress={() => Navigation.navigate('News')}>
                        <Text
                          style={{
                            color: COLORS.textColor,
                            fontSize: 16,
                            marginRight: 8,
                            textDecorationLine: 'underline',
                          }}>
                          View All
                        </Text>
                      </Pressable>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Pressable
                        style={styles.card}
                        onPress={() => Navigation.navigate('NewsScreen')}>
                        <Image
                          source={require('../../Assets/Images/card1.png')}
                          style={styles.image}
                        />
                        <View style={styles.infoContainer}>
                          <Text style={styles.time}>03 may . 05 min</Text>
                          <Text style={styles.details}>
                            you can provide a custom key Extractor prop..
                          </Text>
                        </View>
                      </Pressable>
                      <Pressable
                        style={styles.card}
                        onPress={() => Navigation.navigate('NewsScreen')}>
                        <Image
                          source={require('../../Assets/Images/card2.png')}
                          style={styles.image}
                        />
                        <View style={styles.infoContainer}>
                          <Text style={styles.time}>03 may . 05 min</Text>
                          <Text style={styles.details}>
                            you can provide a custom key Extractor prop..
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View>
              {dataPortfolioSummary.length !== 0 && (
                <View>
                  <Heading
                    Heading={'Trending'}
                    Fontsize={22}
                    color={COLORS.dark}
                    Fontweight={'bold'}
                    mv={10}
                    mt={20}
                    ml={34}
                  />
                </View>
              )}

              <View style={{flexDirection: 'row'}}>
                <FlatList
                  data={dataPortfolioSummary}
                  horizontal={true}
                  renderItem={renderItem}
                  keyExtractor={item => item.metal_id}
                  extraData={dataPortfolioSummary.length}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>

            <View
              style={{
                marginHorizontal: '4%',
                // marginVertical: '5%',
                marginBottom: '0%',
                flex: 1,
                // backgroundColor:'red'
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  marginVertical: 25,
                  width: '100%',
                  backgroundColor: 'white',
                  // borderRadius: 20,
                  // shadowColor: 'black',
                  // shadowOpacity: 0.5,
                  // shadowRadius: 5,
                  elevation: 5,
                }}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <View
                    style={{
                      marginHorizontal: 3,
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
                      marginHorizontal: 3,
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
                      marginHorizontal: 3,
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
                      marginHorizontal: 3,
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
            </View>
          </ScrollView>
        </View>
      )}
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 15, // Adjust the size as needed
    height: 15, // Adjust the size as needed
    borderRadius: 10, // Half of the width/height to make it a circle
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    margin: 4,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
    width: '48%',
    height: 200,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 14,
  },
  infoContainer: {
    marginHorizontal: 10,
    marginBottom: 8,
    flex: 1,
  },
  time: {
    fontSize: 10,
    color: 'grey',
    marginTop: 10,
    marginVertical: 6,
  },
  details: {
    fontSize: 14,
    marginTop: 6,
    color: COLORS.textColor,
    fontWeight: 'bold',
  },
  trending: {
    fontSize: 24,
    color: COLORS.textColor,
    marginHorizontal: 12,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  trendingText: {
    color: COLORS.textColor,
    fontSize: 20,
    marginBottom: 4,
    letterSpacing: 0.3,
    // fontWeight:'bold',
  },
});
