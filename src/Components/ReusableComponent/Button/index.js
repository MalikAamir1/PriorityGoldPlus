import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {ImageBackground, Pressable, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function ButtonComp(props) {

  let {btnText, press} = props;

  return (

    <LinearGradient
      colors={['#BA7607', '#EDCC45']}
      style={{
        flex: 1,
        // padding: 13,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
      }}>
      <TouchableOpacity
        onPress={press}
        style={{
          flex: 1,
          width: '100%',
          padding: 12,
          alignItems: 'center',
          height: '50%',
        }}>
        <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
          {btnText}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default ButtonComp;
