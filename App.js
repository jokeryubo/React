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
var REQUEST_URL = "https://api.douban.com/v2/movie/in_theaters"
// var REQUEST_URL =
//   "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";


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
        this.setState({
          data: this.state.data.concat(responseData.subjects),
          isLoad: true
        });
      });
  }




  render() {
    var movie = MOCKED_MOVIES_DATA[0];
    console.log("render------------")
    if (!this.state.isLoad) {
      return this.loadingView();
    }
    var movie = this.state.data[0];
    return (
      <View >
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
          data = {this.state.data}
          renderItem = {this.renderMoviewItem}
          keyExtractor = {item => item.id}
          style= {styles.listStyle}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )

  }

  loadingView() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>数据加载中...</Text>
      </View>
    );
  }

  // renderMovieView(movie) {
  //   return (
  //     <View style={styles.rootContainer}>
  //       <Image source={{ uri: movie.posters.thumbnail }} style={styles.item}></Image>
  //       <View style={styles.rightContainer}>
  //         <Text style={styles.textStyle}>{movie.title}</Text>
  //         <Text style={styles.textStyle}>{movie.year}</Text>
  //       </View>
  //     </View>)
  // }
  // <Image source={{ uri: item.images.medium }} style={styles.item}></Image>
  renderMoviewItem({item}) {
    return (
        <View style={styles.rootContainer}>
        <Image source={require('./img/wujing.png')} style={styles.item}></Image>
        <View style={styles.rightContainer}>
          <Text style={styles.textStyle}>{item.title}</Text>
          <Text style={styles.textStyle}>{item.year}</Text>
        </View>
      </View>)
  }
}

renderSeparator = () => {
  return (
      <View
      style={{
      height: 1,
      width: "86%",
      backgroundColor: "red",
      marginLeft: "14%"
      }}
      />
  );
};

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
    marginLeft: 15,
    marginBottom:  10,
    marginRight:  15,
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
  },
  listStyle:{
    
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
