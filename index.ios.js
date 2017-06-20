/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    TextInput,
    ScrollView,
    Image,
    Dimensions,
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import logo from './data/localData';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var width = Dimensions.get('window').width; //full width

class LogoListScreen extends Component {

    static navigationOptions = {
        title: 'Car Logo',
    };

    constructor(props) {
        super(props);
        this.state = {
            showFinder: true,
            dataSource: ds.cloneWithRows(logo.info),
            filters: [
                {'name': 'All List', 'id': 1},
                {'name': 'Popular', 'id': 2},
                {'name': 'Luxury', 'id': 3},
                {'name': 'CHA', 'id': 4},
                {'name': 'FRA', 'id': 5},
                {'name': 'ITA', 'id': 6},
                {'name': 'GER', 'id': 7},
                {'name': 'JPN', 'id': 8},
                {'name': 'UK', 'id': 9},
                {'name': 'USA', 'id': 10},
                {'name': 'Other', 'id': 11},
            ]
        };
    }

    render() {
        return (

                <View style={styles.container}>
                    <View style={{flexDirection:'row', marginTop:10,marginBottom:10,marginRight:12,alignItems:'center'}}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} style={{marginBottom:0,marginLeft:10,marginRight:0}}>
                            {
                                this.state.filters.map((item, index)=> (
                                    <View key = {item.id} style = {styles.filter}>
                                        <Text style={{color:'white',fontWeight:'bold'}}>{item.name}</Text>
                                    </View>
                                ))
                            }
                        </ScrollView>
                        <View style={{flexDirection:'row'}}>
                            {this.state.showFinder && <TouchableHighlight onPress={this.toggleFinder.bind(this)}>
                                <Image source={require('./images/finder.png')} style={{width:20,height:20,marginLeft:10}}/>
                            </TouchableHighlight>}
                            {!this.state.showFinder &&
                            <TextInput style={styles.searchInput} underlineColorAndroid='transparent'
                                       placeholder="Search..."
                                       onChangeText={(text) => {
                                           var rows = [];
                                           for (var i = 0; i < logo.info.length; i++) {
                                               var title = logo.info[i].title.toLowerCase();
                                               if (title.search(text.toLowerCase()) !== -1) {
                                                   rows.push(logo.info[i]);
                                               }
                                           }
                                           this.setState({dataSource: ds.cloneWithRows(rows)});
                                       }}/>
                            }
                            {!this.state.showFinder && <TouchableHighlight onPress={this.toggleFinder.bind(this)}>
                                <Image source={require('./images/close.png')}
                                       style={{position: 'relative', width: 20, height: 20, right:30, marginTop:5}}/>
                               </TouchableHighlight>
                            }
                        </View>
                    </View>
                    <ListView
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </View>

        );
    }

    // 返回一个Item
    renderRow(rowData, sectionId, rowId){
        const { navigate } = this.props.navigation;
        return(
            <TouchableHighlight underlayColor='#D3D3D3' onPress={() => navigate('Detail', { title: rowData.title, icon: rowData.icon, founder: rowData.founder, founded: rowData.founded, hq: rowData.hq, website: rowData.website, overview: rowData.overview })}
                                title="Chat with Lucy">
                <View style={styles.itemStyle}>
                    <Image source={rowData.icon} style={styles.imageStyle}/>
                    <View style={styles.subItemStyle}>
                        <Text style={{marginTop:5, fontSize:17}}>{rowData.title}</Text>
                        <Text style={{marginBottom:5, fontSize:13, color:'green'}}>简介</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    toggleFinder() {
        this.setState({
            showFinder: !this.state.showFinder,
        });
    }
}

class DetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
    });
    render() {
        const { params } = this.props.navigation.state;

        return (
            <View style={{backgroundColor:'white'}}>
                <View style={{flexDirection:'column'}}>
                    <View style={{justifyContent:'center', alignItems:'center'}}><Image source={params.icon} style={styles.imageStyleLarge}/></View>
                    <View style={{marginTop:10}}>
                        <View style={styles.labelRow}><Text>Founded:</Text><Text style={{marginLeft:5}}>{params.founded}</Text></View>
                        <View style={styles.labelRow}><Text>Founder:</Text><Text style={{marginLeft:5}}>{params.founder}</Text></View>
                        <View style={styles.labelRow}><Text>Headquarters:</Text><Text style={{marginLeft:5}}>{params.hq}</Text></View>
                        <View style={styles.labelRow}><Text>Official Site:</Text><Text style={{marginLeft:5}}>{params.website}</Text></View>
                    </View>
                </View>
                <View style={{marginLeft:5}}>
                    <Text>Description:</Text>
                    <Text>{params.overview}</Text>
                </View>
            </View>
        );
    }
}


const autoLogo = StackNavigator({
    Home: { screen: LogoListScreen },
    Detail: { screen: DetailScreen },
});

var styles = StyleSheet.create({
    container: {
        //flex:10,
        backgroundColor: '#f8f8f8',
        justifyContent:'center',
    },

    itemStyle: {
        // 主轴方向
        flexDirection:'row',
        // 下边框
        borderWidth:1,
        borderRadius:5,
        marginBottom:5,
        marginLeft:10,
        marginRight:10,
        borderRightWidth: 2,
        borderBottomWidth: 3,
        borderColor: '#e9e9e9',
        backgroundColor: 'white',
    },

    imageStyle: {
        width:70,
        height:60,
        marginLeft:10,
        margin:10
    },

    imageStyleLarge: {
        width:220,
        height:200,
    },
    labelRow: {
        flexDirection:'row',
        marginLeft:5,
    },
    subItemStyle: {
        justifyContent:'space-around'
    },

    filter: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:15,
        borderWidth: 1,
        borderColor: 'green',
        backgroundColor: 'green',
        display: 'flex',
        marginRight:10,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5,
    },
    searchInput: {
        borderRadius:5,
        borderWidth: 1,
        borderColor: '#e9e9e9',
        fontSize: 15,
        height: 30,
        width: width-20,
        paddingLeft:10,  //ios
        // padding:2, //android
    }
});

AppRegistry.registerComponent('autoLogo', () => autoLogo);
