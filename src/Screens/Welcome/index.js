import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import COLORS from '../../Assets/Style/Color';
import Heading from '../../Components/ReusableComponent/Heading';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import SafeArea from '../../Components/ReusableComponent/Safearea';

export const Welcome = () => {
  const Navigation = useNavigation();
  return (
    <SafeArea>
      <View
        style={{
          marginHorizontal: '6%',
          backgroundColor: COLORS.white,
          marginTop: '20%',
          borderRadius: 15,
        }}>
        <View style={{marginHorizontal: 15, marginTop: '8%'}}>
          <Heading
            Heading={'Welcome To NEXT GEN BULLION'}
            Fontsize={28}
            color={COLORS.textColor}
            Fontweight={'bold'}
            txtAlign={'center'}
          />
        </View>
        <View style={{marginHorizontal: '2%', marginVertical: '8%'}}>
          <InteractParagraph
            p={
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.'
            }
            color={COLORS.textColor}
            txtAlign={'center'}
          />
        </View>
      </View>
      <View style={{alignItems: 'center',marginTop:'30%'}}>
        <Image
          source={require('../../Assets/Images/placeHolder.png')}
          style={{width: 100, height: 100}}
        />
      </View>
    </SafeArea>
  );
};
