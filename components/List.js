import React, { Component } from 'react';
import ListItem from './ListItem';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
export default function List({itemList=[],onItemPress=()=>{}}){
    return(
        <View>
           {
               itemList.map((item,i)=>(<ListItem key={i} item={item} onPress={onItemPress}></ListItem>))
           }
        </View>
    )
}

export function ScrollList ({data=[],onEndReached=()=>{}}){
    return(
        
        <FlatList
        data={data}
        
        renderItem = {
            ({item})=>(
                <View key={item.pid}>
                    <Text>{item.gender}/{item.pid}</Text>
                </View>
            )
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        />
        
    )
}