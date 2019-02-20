import { Button, View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import DetailsScreen from './DetailsScreen'
import React, { Component } from 'react';
import MoviesPage from './MoviesPage'




const TAG = "yubApp";
var MOCKED_MOVIES_DATA = [
  {
    title: "标题",
    year: "2015",
    posters: { thumbnail: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550644156036&di=67009bbae15f23613cb3f42550539b78&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170815%2Fc31de52066b745e49c1e789a92148798_th.png" }
  }
];
// var REQUEST_URL = "https://api.douban.com/v2/book/1220562"
var REQUEST_URL =
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";


class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      isLoad: false,
    }
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData)
        this.setState = {
          data: this.state.data.concat(responseData.movies),
          isLoad :true
        }
      });
  }

  
  render() {
    var movie = MOCKED_MOVIES_DATA[0];
    console.log("render------------")
    if(!this.state.isLoad){
      return this.loadingView();
    }
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details "
          onPress={() => {
            this.props.navigation.navigate('Movies')
            console.log(TAG, "test===============");
          }

          }
        />
        <FlatList
          data={[
            { key: '发送到健康福建省的3' },
            { key: '个胜多负少的' },
            { key: '颗粒剂拉的屎' },
            { key: '是牛市口拉大' },
            { key: '324223' },
            { key: '发送到健康福建省的2' },
            { key: '532认为沃尔夫' },
            { key: '发送到健康福建省的1' },
            { key: '发生大幅度' },
            { key: '金卡理论上' },
          ]}
          renderItem={({ item }) => <Text>{item.key}</Text>}

        />
        <View style={styles.rootContainer}>

          <Image source={{ uri: movie.posters.thumbnail }} style={styles.item}></Image>
          <View style={styles.rightContainer}>
            <Text style={styles.textStyle}>{movie.title}</Text>
            <Text style={styles.textStyle}>{movie.year}</Text>
          </View>
        </View>

      </View>
    )
  }

  loadingView(){
    return (
      <View style = {{flex:1 , alignItems:'center' ,justifyContent: 'center'}}>
        <Text>数据加载中...</Text>
      </View>
    );
  };
}


const styles = StyleSheet.create({
  item: {
    width: 120,
    height: 198,
    marginLeft: 18,
    borderColor: 'red',
    borderRadius: 5,
  },
  rootContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    flex: 1,
    fontSize: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Movies: MoviesPage,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
