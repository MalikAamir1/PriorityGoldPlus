import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useSelector} from 'react-redux';
import COLORS from '../../Assets/Style/Color';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import Heading from '../../Components/ReusableComponent/Heading';
import {PieChartComponent} from '../../Components/ReusableComponent/PieChart';
import {BezierLineChart} from '../../Components/ReusableComponent/BezierLineChart';
import {ScrollView} from 'react-native-gesture-handler';
import {Header} from '../../Components/ReusableComponent/Header';
import DropdownComponent from '../../Components/ReusableComponent/DropDown';
import Input from '../../Components/ReusableComponent/Input';
import ButtonComp from '../../Components/ReusableComponent/Button';

export const Shop = () => {
  const Navigation = useNavigation();
  const [userDataFromFacebook, setUserDataFromFacebook] = useState([]);

  // const {AuthReducer} = useSelector(state => state);
  // console.log('reducerData: ', AuthReducer.userData);

  return (
    <SafeArea>
      <ScrollView>
        <View
          style={{
            marginHorizontal: '5%',
            marginTop: '5%',
            marginBottom: '35%',
          }}>
          <Header header={'Shop'} />
        </View>
        <View style={{flex: 1, alignItems: 'center', alignSelf: 'center'}}>
          <Image
            source={require('../../Assets/Images/Shop/shop.png')}
            style={{width: 350, height: 250}}
            resizeMode={'contain'}
          />
          <Heading
            Stylefont={'normal'}
            Fontweight={'bold'}
            Fontsize={26}
            txtAlign={'center'}
            p={10}
            lh={40}
            Heading={'Coming Soon'}
            color={COLORS.dark}
          />
        </View>
      </ScrollView>
    </SafeArea>
  );
};
