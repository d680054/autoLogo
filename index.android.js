/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    ScrollView,
    Image,
    Dimensions,
    Keyboard,
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from './TabBar';
import Icon from 'react-native-vector-icons/Ionicons';
import Quiz from './quiz'
import DetailScreen from './DetailScreen'

import logo from './data/localData';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var winWidth = Dimensions.get('window').width; //full width

class LogoListScreen extends Component {

    static navigationOptions = {
        title: 'Car Logo',
    };

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            showFinder: true,
            dataSource: ds.cloneWithRows(logo.info),
            filters: [
                {'name': 'All', 'id': 1},
                {'name': 'Popular', 'id': 2},
                {'name': 'Luxury', 'id': 3},
                {'name': 'CHN', 'id': 4},
                {'name': 'FRA', 'id': 5},
                {'name': 'GER', 'id': 6},
                {'name': 'ITA', 'id': 7},
                {'name': 'JPN', 'id': 8},
                {'name': 'UK', 'id': 9},
                {'name': 'USA', 'id': 10},
                {'name': 'Other', 'id': 11},
            ]
        };
    }

    render() {
        return (

            <ScrollableTabView tabBarPosition="bottom" scrollWithoutAnimation={true}
                               style={{}}
                               initialPage={0}
                               renderTabBar={() => <TabBar />}
            >
                <View tabLabel="ios-car" style={styles.tabView}>

                    <View style={styles.container}>
                        <View style={styles.filterBanner}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                        style={{marginBottom: 0, marginLeft: 10, marginRight: 0}}>
                                {
                                    this.state.filters.map((item, index) => (
                                        <TouchableOpacity key={item.id} onPress={this.filterCountry.bind(this, item.name)}>
                                            <View  style={styles.filter}>
                                                <Text style={{color: '#fff38e', fontWeight: 'bold'}}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                            </ScrollView>
                            {this.state.showFinder && <TouchableOpacity onPress={this.toggleFinder.bind(this)}>
                                <Icon name="ios-search" size={25} style={{width: 25, height: 25,marginLeft: 5}}/>
                            </TouchableOpacity>}

                            {!this.state.showFinder &&
                            <View style={{height:35, width: winWidth-22, borderWidth:1, borderColor:'#e9e9e9',flexDirection: 'row',marginRight:10,borderRadius: 35, justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity onPress={this.toggleFinder.bind(this)}>
                                    <Icon name="md-arrow-back" size={25} style={{borderWidth:0, borderColor:'red',width: 25, height: 25, margin: 10}}/>
                                </TouchableOpacity>
                                <View style={{flex:5}}>
                                    <TextInput ref={component => this._textInput = component} style={styles.searchInput} underlineColorAndroid='transparent'
                                               placeholder="Search by name or country"
                                               autoFocus={true}
                                               onChangeText={(text) => {
                                                   var rows = [];
                                                   for (var i = 0; i < logo.info.length; i++) {
                                                       var title = logo.info[i].title.toLowerCase();
                                                       var country = logo.info[i].category.toLowerCase();

                                                       var hq = logo.info[i].hq == null? "":logo.info[i].hq.toLowerCase() ;
                                                       hq = hq.substring(hq.lastIndexOf(",")+1, hq.length);

                                                       if (title.search(text.toLowerCase()) !== -1
                                                           || country.search(text.toLowerCase()) !== -1
                                                           || hq.search(text.toLowerCase()) !== -1) {
                                                           rows.push(logo.info[i]);
                                                       }
                                                   }
                                                   this.setState({dataSource: ds.cloneWithRows(rows)});
                                                   this.setState({search: text})
                                               }}/>
                                </View>

                                <TouchableOpacity onPress={this.clearText}>
                                    <Icon name="ios-close" size={25} style={{width: 25, height: 25, paddingLeft:10, margin: 5}}/>
                                </TouchableOpacity>
                            </View>}

                        </View>
                        <ListView
                            enableEmptySections
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
                        />
                    </View>
                </View>

                <ScrollView tabLabel="ios-paper" contentContainerStyle={styles.tabView}>
                    <Quiz/>
                </ScrollView>

            </ScrollableTabView>
        );
    }

    // 返回一个Item
    renderRow(rowData, sectionId, rowId) {
        const {navigate} = this.props.navigation;
        return (
            <TouchableHighlight activeOpacity={0.2} underlayColor='white' onPress={() => navigate('Detail', {
                title: rowData.title,
                icon: rowData.icon,
                founder: rowData.founder,
                founded: rowData.founded,
                hq: rowData.hq,
                website: rowData.website,
                overview: rowData.overview,
                slogan: rowData.slogan,
            })}
                                title="Chat with Lucy">

                <View style={styles.itemStyle}>
                    <Image source={rowData.icon} style={styles.imageStyle}/>
                    <View style={styles.subItemStyle}>
                        <Text style={{marginTop: 5, fontSize: 17, color:'black'}}>{rowData.title}</Text>
                        {rowData.hq&&<Text style={{marginBottom: 5, fontSize: 13, color: 'grey'}}>{rowData.hq.substring(rowData.hq.lastIndexOf(",")+1, rowData.hq.length)}</Text>}
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

    filterCountry(filter) {
        var rows = [];
        if ("ALL" == filter.toUpperCase()) {
            rows = logo.info;
        } else {
            for (var i = 0; i < logo.info.length; i++) {
                if (logo.info[i].category != null) {
                    var category = logo.info[i].category.toUpperCase();
                    if (category.search(filter.toUpperCase()) !== -1) {
                        rows.push(logo.info[i]);
                    }
                }
            }
        }
        this.setState({dataSource: ds.cloneWithRows(rows)});
    }

    clearText = () => {
        let text = this.state.search;
        if (!text) {
            this.setState({
                showFinder: !this.state.showFinder,
            });
        }

        this._textInput.setNativeProps({text: ''});
        this.setState({search: ''})

    }
}


const autoLogo = StackNavigator({
    Home: {screen: LogoListScreen},
    Detail: {screen: DetailScreen},
});

var styles = StyleSheet.create({
    container: {
        //flex:10,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
    },
    tabView: {
        flex: 1,
        padding: 0,
        backgroundColor: 'rgba(8,0,0,0.01)',
        flexDirection:'column',
        borderWidth:0,
    },

    itemStyle: {
        // 主轴方向
        flexDirection: 'row',
        // 下边框
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#e9e9e9',
        backgroundColor: 'white',
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },

    imageStyle: {
        width: 70,
        height: 60,
        marginLeft: 10,
        margin: 10
    },

    subItemStyle: {
        justifyContent: 'space-around'
    },

    filterBanner: {
        flexDirection: 'row',
        borderRadius: 5,
        marginTop: 12,
        marginBottom: 12,
        marginRight: 12,
        alignItems: 'center',
        height:40,
    },
    filter: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgb(59,89,152)',
        backgroundColor: 'rgb(59,89,152)',
        display: 'flex',
        marginRight: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
        paddingBottom: 6,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    searchInput: {
        borderRadius: 0,
        borderWidth: 0,
        borderColor: '#e9e9e9',
        fontSize: 18,
        lineHeight: 40,
        height: 40,
    },

});

AppRegistry.registerComponent('autoLogo', () => autoLogo);
