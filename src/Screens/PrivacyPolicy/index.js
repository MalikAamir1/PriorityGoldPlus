import React, {useState} from 'react';
import {FlatList, Image, Pressable, Switch, View} from 'react-native';
import COLORS from '../../Assets/Style/Color';
import Heading from '../../Components/ReusableComponent/Heading';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import Input from '../../Components/ReusableComponent/Input';
import {Formik} from 'formik';
import * as yup from 'yup';
import ButtonComp from '../../Components/ReusableComponent/Button';
import {width} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

export const PrivacyPolicy = () => {
  const Navigation = useNavigation();

  return (
    <SafeArea>
      <ScrollView>
        <View
          style={{marginHorizontal: '5%', marginTop: '8%', marginBottom: 10}}>
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
                  Navigation.navigate('Settings');
                }}>
                <Ionicons name="chevron-back" size={27} color={'black'} />
              </Pressable>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Heading
                Heading={'Privacy Policy'}
                Fontsize={20}
                color={COLORS.dark}
                Fontweight={'bold'}
                txtAlign={'center'}
              />
            </View>
            <View style={{alignSelf: 'center'}}>
              <Heading
                Heading={'           '}
                Fontsize={20}
                color={COLORS.dark}
                Fontweight={'bold'}
                txtAlign={'center'}
              />
            </View>
          </View>

          <View style={{marginTop: 30}}>
            <Heading
              Heading={'Nullam Porta Diam Id Dolor'}
              Fontsize={20}
              color={COLORS.dark}
              Fontweight={'bold'}
            />
          </View>

          <View style={{marginTop: 10}}>
            <Heading
              Heading={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae vulputate velit. Nulla facilisi. Fusce interdum ornare arcu, quis accumsan sapien tincidunt vel. Donec tempus nibh a lectus eleifend, at aliquam quam pharetra. Aliquam blandit risus nunc, viverra porttitor ex mattis et. Maecenas accumsan felis et sem pellentesque faucibus. Aliquam facilisis facilisis est, vitae ultricies tortor auctor eget. Aenean ac metus porttitor, interdum mauris iaculis, commodo erat.'
              }
              Fontsize={14}
              color={COLORS.dark}
            />
          </View>

          <View style={{marginTop: 10}}>
            <Heading
              Heading={'Nullam Porta Diam Id Dolor'}
              Fontsize={20}
              color={COLORS.dark}
              Fontweight={'bold'}
            />
          </View>

          <View style={{marginTop: 10}}>
            <Heading
              Heading={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae vulputate velit. Nulla facilisi. Fusce interdum ornare arcu, quis accumsan sapien tincidunt vel. Donec tempus nibh a lectus eleifend, at aliquam quam pharetra. Aliquam blandit risus nunc, viverra porttitor ex mattis et. Maecenas accumsan felis et sem pellentesque faucibus. Aliquam facilisis facilisis est, vitae ultricies tortor auctor eget. Aenean ac metus porttitor, interdum mauris iaculis, commodo erat.'
              }
              Fontsize={14}
              color={COLORS.dark}
            />
          </View>

          <View style={{marginTop: 10}}>
            <Heading
              Heading={'Nullam Porta Diam Id Dolor'}
              Fontsize={20}
              color={COLORS.dark}
              Fontweight={'bold'}
            />
          </View>

          <View style={{marginTop: 10}}>
            <Heading
              Heading={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae vulputate velit. Nulla facilisi. Fusce interdum ornare arcu, quis accumsan sapien tincidunt vel. Donec tempus nibh a lectus eleifend, at aliquam quam pharetra. Aliquam blandit risus nunc, viverra porttitor ex mattis et. Maecenas accumsan felis et sem pellentesque faucibus. Aliquam facilisis facilisis est, vitae ultricies tortor auctor eget. Aenean ac metus porttitor, interdum mauris iaculis, commodo erat.'
              }
              Fontsize={14}
              color={COLORS.dark}
            />
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
};
