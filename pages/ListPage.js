import React, { useState, useEffect, Component, useRef } from "react";
import {
  Text,
  View,
  Button,
  ActivityIndicator,
  Image,
  StyleSheet,
  Animated,
  Easing
} from "react-native";
import List from "../components/List";
import { FlatList } from "react-native-gesture-handler";
import ListItem from "../components/ListItem";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  medium: {
    fontSize: 18,
  },
  small: {
    fontSize: 12,
  },
  mute: {
    color: "#999",
  },
  bold: {
    fontWeight: "bold",
  },
  primary: {
    color: '#61DAFB'
  },
  loader: {
    height: '10%',
    backgroundColor:'#fff',
    margin: 5
  }
});

export function ErrorView(){
  return(
    <View style={{padding: 10}}>
      <View style={{backgroundColor:'#fff', height:'50%', width:'100%', justifyContent:'center', alignItems:'center'}}>
      <Text style={[styles.bold, styles.medium]}> Error </Text>
      <Text>Unable to load data...please try again</Text>
      </View>
    </View>
  )
}
export class LoadingView extends Component {
  constructor(){
    super()
    this.animatedValue = new Animated.Value(0)
  }
  componentDidMount(){
    this.animate()
  }
  animate(){
    this.animatedValue.setValue(0.25)
    Animated.timing(
      this.animatedValue,
      {
        toValue : 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(()=>this.animate())
  }
  render(){
    const opacity = this.animatedValue.interpolate({
      inputRange: [0.25,0.5,1],
      outputRange: [0.5,1,0.25]
    })
    return(
      <Animated.View style={{ flexDirection:'row', height: '10%',marginTop:10, width: '100%', backgroundColor: '#fff', opacity}} >
        <View style={{ width:'15%', backgroundColor:'#ccc'}}></View>
        <View style={{ width:'85%', padding:10, flexDirection:'column', backgroundColor:'#fff'}}>
          <View style={{height:'50%', backgroundColor:'#ddd'}}></View>
          <View style={{height:'30%', width:'50%',backgroundColor:'#eee', marginTop:'2%'}}></View>
        </View>
      </Animated.View>
    )
  }
}
export function LoadingList(){
  const fadeAnim = useRef(new Animated.Value(0)).current
  React.useEffect(()=>{
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500
    }).start();
  })
  return(
    <View style={{flex:1, flexDirection:'column', padding: 10}}>
      {Array.from(Array(3).keys()).map((i)=>(<LoadingView key={i}/>))}
    </View>
  )
}
export default class ListPage extends Component {
  constructor(props) {
    super(props);
    this.onItemPress = this.onItemPress.bind(this);
  }
  state = {
    data: [],
    page: 1,
    loading: true,
    error: null,
  };
  componentDidMount() {
    this._fetchData();
  }
  _handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this._fetchData();
      }
    );
  };
  _renderFooter = () => {
    if (!this.state.loadingMore) return null;
    return (
      <View>
        {/* <LoadingView></LoadingView> */}
        <ActivityIndicator animating size="large"></ActivityIndicator>
      </View>
    );
  };
  _fetchDataAsync = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
        loadingMore: true,
      }),
      () => {
        this._fetchData();
      }
    );
  };
  _fetchData = () => {
    const { page } = this.state;
    const URL = `http://pkr5vcnw9rj0.cloud.wavemakeronline.com/PEOPLE/services/people/people?size=20&page=${page}`;

    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        this.setState((prevState, nextProps) => ({
          data: page === 1 ? res.content : [...this.state.data, ...res.content],
          loading: false,
          error: false
        }));
      }).catch((err)=>{
        this.setState({
          loading: false,
          error: true
        })
      });
  };

  onItemPress = ({ pid }) => {
    this.props.navigation.navigate("Detail", { pid: pid, startTime: Date.now() });
  };

  render() {
    if(this.state.loading){
      return (
        <LoadingList></LoadingList>
      )
    } 
    else if(this.state.error){
      return (
        <ErrorView />
      )
    }
    else {
      return (
        <View
          style={{
            paddingLeft: "3%",
            paddingTop: "3%",
            paddingRight: "3%",
            paddingBottom: "0%",
            backgroundColor: "#eeeeee",
          }}
        >
          <FlatList
            data={this.state.data}
            keyExtractor={(item) => item.pid.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  width: "100%",
                  alignContent: "stretch",
                  margin: 3,
                }}
              >
                <View >
                  <TouchableOpacity onPress={() => this.onItemPress(item)}>
                    <View style={{ flex: 1, width: "100%", flexDirection: "row" }}>
                      <View style={{width:"20%"}}>
                        <Image
                          style={{ width: "100%", height: "100%" }}
                          source={{ uri: item.picture.large }}
                        ></Image>
                      </View>
                      <View style={{width:"80%", padding: 10}}>
                        <Text style={[styles.bold, styles.medium, styles.primary]}>
                          {" "}
                          {item.name.first} {item.name.last}
                        </Text>
                        <Text style={[styles.small]}> {item.email}</Text>
                        <Text style={[styles.mute, styles.small]}>
                          {" "}
                          {item.location.state}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            onEndReached={this._fetchDataAsync}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            ListFooterComponent={this._renderFooter}
            onRefresh={this._handleRefresh}
            refreshing={this.state.refreshing}
          ></FlatList>
        </View>
      );
    }

  }
}
