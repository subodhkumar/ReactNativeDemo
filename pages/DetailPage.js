import React, { Component } from "react";
import { View, Text, ActivityIndicator, Image, StyleSheet, Animated, Easing } from "react-native";
import ItemDetails from "../components/ItemDetail";
import { ErrorView, LoadingView, LoadingList } from "./ListPage";
export function DetailPage({ route, navigation }) {
  const { pid } = route.params;
}
const styles = StyleSheet.create({
  medium: {
    fontSize: 18,
  },
  large: {
    fontSize: 32,
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
    color: "#61DAFB",
  },
});

export class DetailLoadingView extends Component {
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
    return (
      <Animated.View
        style={{
          flex: 1,
          height: "100%",
          backgroundColor: "#eee",
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingTop: "5%",
          opacity
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <View style={{ height: "60%", backgroundColor: "#ddd" }}></View>
          <View style={{ height: "40%", padding: "5%", flexDirection:'column' }}>
          <View style={{ height: "20%", backgroundColor: "#eee" }}></View>
          <View style={{ height: "10%", width:"80%", backgroundColor: "#eee",marginTop:'2%'  }}></View>
          <View style={{ height: "10%", width:"60%", backgroundColor: "#eee",marginTop:'2%'  }}></View>
          <View style={{ height: "40%", backgroundColor: "#eee", marginTop:'5%' }}></View>
          </View>
        </View>
      </Animated.View>
    );
  }
  
}
export default class DetailsPage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    loading: true,
    data: null,
    error: false,
  };
  _fetchData() {
    const URL = `http://pkr5vcnw9rj0.cloud.wavemakeronline.com/PEOPLE/services/people/personById?pid=${this.props.route.params.pid}`;
    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          loading: false,
          data: res,
          error: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: true,
        });
      });
  }
  componentDidMount() {
    this._fetchData();
  }
  render() {
    if (this.state.error) {
      return <ErrorView></ErrorView>;
    }
    if (this.state.loading) {
      return <DetailLoadingView />;
    } else if (this.state.data) {
      return (
        <View
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: `#eeeeee`,
            paddingLeft: "5%",
            paddingRight: "5%",
            paddingTop: "5%",
            flexDirection: "column",
          }}
        >
          <View style={{ backgroundColor: "#fff", height: "60%" }}>
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{ uri: this.state.data.picture.large }}
            ></Image>
          </View>
          <View
            style={{ backgroundColor: "#fff", height: "40%", padding: "5%" }}
          >
            <Text style={[styles.large, styles.primary, styles.bold]}>
              {this.state.data.name.first} {this.state.data.name.last}
            </Text>
            <Text style={[styles.medium]}>{this.state.data.email}</Text>
            <Text style={[styles.medium]}>{this.state.data.phone}</Text>

            <View style={{ marginTop: 20 }}>
              <Text style={[styles.bold]}> Address </Text>
              <Text>
                {" "}
                #{this.state.data.location.street.number},{" "}
                {this.state.data.location.street.name}{" "}
              </Text>
              <Text>
                {" "}
                {this.state.data.location.city},{" "}
                {this.state.data.location.state}{" "}
              </Text>
              <Text> {this.state.data.location.country} </Text>
              <Text> {this.state.data.location.postcode} </Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: `#eeeeee`,
            padding: "45%",
          }}
        >
          <ActivityIndicator animating size="large"></ActivityIndicator>
        </View>
      );
    }
  }
}
