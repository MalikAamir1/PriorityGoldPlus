import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, ImageBackground, View} from 'react-native';
import {Text} from 'react-native-paper';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useSelector} from 'react-redux';
import COLORS from '../../Assets/Style/Color';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import Heading from '../../Components/ReusableComponent/Heading';
import {ScrollView} from 'react-native-gesture-handler';

export const Notifications = () => {
  const Navigation = useNavigation();
  const [userDataFromFacebook, setUserDataFromFacebook] = useState([]);

  // const {AuthReducer} = useSelector(state => state);
  // console.log('reducerData: ', AuthReducer.userData);

  const data = [
    {
      id: 1,
      first1: 'Gold 24K',
      first2: 'MM/DD/YYYY',
      Second1: '$2,980',
      Second2: '+340 (+5,041)',
      third1: '$3,050',
      third2: '(5 min ago)',
      status: 'up',
      properties: 'Gold'
    },
    {
      id: 2,
      first1: 'Platinum',
      first2: 'MM/DD/YYYY',
      Second1: '$2,980',
      Second2: '+340 (+5,041)',
      third1: '$3,050',
      third2: '(5 min ago)',
      status: 'up',
      properties: 'Silver'
    },
    {
      id: 3,
      first1: 'Silver',
      first2: 'MM/DD/YYYY',
      Second1: '$2,980',
      Second2: '+340 (+5,041)',
      third1: '$2,550',
      third2: '(15 min ago)',
      status: 'down',
      properties: 'Silver'
    },
    {
      id: 4,
      first1: 'Palladium',
      first2: 'MM/DD/YYYY',
      Second1: '$2,980',
      Second2: '+340 (+5,041)',
      third1: '$2,550',
      third2: '(15 min ago)',
      status: 'down',
      properties: 'Silver'
    },
    {
      id: 5,
      first1: 'Gold 24K',
      first2: 'MM/DD/YYYY',
      Second1: '$2,980',
      Second2: '+340 (+5,041)',
      third1: '$3,050',
      third2: '(5 min ago)',
      status: 'up',
      properties: 'Gold'
    },
    {
      id: 6,
      first1: 'Platinum',
      first2: 'MM/DD/YYYY',
      Second1: '$2,980',
      Second2: '+340 (+5,041)',
      third1: '$3,050',
      third2: '(5 min ago)',
      status: 'up',
      properties: 'Silver'
    },
    {
      id: 7,
      first1: 'Silver',
      first2: 'MM/DD/YYYY',
      Second1: '$2,980',
      Second2: '+340 (+5,041)',
      third1: '$2,550',
      third2: '(15 min ago)',
      status: 'down',
      properties: 'Silver'
    },
    {
      id: 8,
      first1: 'Palladium',
      first2: 'MM/DD/YYYY',
      Second1: '$2,980',
      Second2: '+340 (+5,041)',
      third1: '$2,550',
      third2: '(15 min ago)',
      status: 'down',
      properties: 'Silver'
    },
    {
      id: 9,
      first1: 'Gold',
      first2: 'MM/DD/YYYY',
      Second1: '$2,980',
      Second2: '+340 (+5,041)',
      third1: '$3,050',
      third2: '(5 min ago)',
      properties: 'Gold'
    },
  ];

  const ListHeaderComponent = () => {
    return (
      <>
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
                Navigation.navigate('SimpleBottomTab');
              }}>
              <Ionicons name="chevron-back" size={28} color={'black'} />
            </Pressable>
          </View>
          <View style={{alignSelf: 'center'}}>
            <Heading
              Heading={'Notifications'}
              Fontsize={20}
              color={COLORS.dark}
              Fontweight={'bold'}
              txtAlign={'center'}
            />
          </View>
          <View style={{alignSelf: 'center'}}></View>
        </View>

        <View style={{marginTop: 15}} />
      </>
    );
  };

  const renderItem = ({item}) => (
    <>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          backgroundColor: 'transparent',
          paddingVertical: 15,
        }}>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            {item.properties == 'Gold' ? (
              <ImageBackground
                source={require('../../Assets/Images/GoldenWithNumber.png')}
                resizeMode={'contain'}
                style={{width: 50}}>
              </ImageBackground>
            ) : (
              <ImageBackground
                source={require('../../Assets/Images/Silverwithnumber.png')}
                resizeMode={'contain'}
                style={{width: 50}}>
              </ImageBackground>
            )}
            <View style={{marginLeft: 10, alignItems: 'flex-start'}}>
              <Heading
                Heading={item.first1}
                Fontsize={20}
                color={COLORS.dark}
                txtAlign={'center'}
                Fontweight={'bold'}
              />
              <Heading
                Heading={'+1.19%'}
                Fontsize={14}
                color={COLORS.dark}
                txtAlign={'center'}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            // flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            {item.status == 'up' ? (
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
                backgroundColor: item.status == 'up' ? '#B5EFCD' : '#FEBFC0',
                padding: 5,
                borderRadius: 10,
              }}>
              <Heading
                Heading={item.third1}
                Fontsize={14}
                ph={7}
                color={item.status == 'up' ? '#17A72A' : '#F80608'}
                txtAlign={'center'}
                // Fontweight={'bold'}
              />
            </View>
          </View>

          <Heading
            Heading={item.third2}
            Fontsize={11}
            color={'#A8A8A8'}
            txtAlign={'center'}
          />
        </View>
      </View>
      <View
        style={{
          borderBottomColor: '#C0C0C0',
          borderBottomWidth: 1,
          marginVertical: '3%',
        }}
      />
    </>
  );

  return (
    <SafeArea>
      {/* <ScrollView> */}
      <View
        style={{
          marginHorizontal: '5%',
          marginTop: '5%',
          // marginBottom: '4%',
        }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{flexDirection: 'column'}}
          extraData={data.length}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={ListHeaderComponent}
        />
      </View>
      {/* </ScrollView> */}
    </SafeArea>
  );
};
