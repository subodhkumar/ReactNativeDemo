import React, { Component } from "react";

import { View, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function ListItem({item={},onPress=()=>{}}) {
  const {gender=''} = item||{};
  
  return (
    <View>
        <TouchableHighlight  onPress={onPress}>
            <View>
      <Text> {gender || `-`}</Text>
      
      </View>
      </TouchableHighlight>
    </View>
  );
}

