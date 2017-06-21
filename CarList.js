import React from 'react';
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
} from 'react-native';

import DetailScreen from './DetailScreen';
import {StackNavigator} from 'react-navigation';

import logo from './data/localData';


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class CarList extends React.Component {

    static navigationOptions = {
        title: 'Car Logo',
    };

    constructor(props) {
        super(props);
        this.state = {
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
        <View style={styles.container}>
            <View style={styles.filterBanner}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}
                            style={{marginBottom: 0, marginLeft: 10, marginRight: 0}}>
                    {
                        this.state.filters.map((item, index) => (
                            <TouchableHighlight key={item.id} onPress={this.filterCountry.bind(this, item.name)}>
                                <View  style={styles.filter}>
                                    <Text style={{color: 'white', fontWeight: 'bold'}}>{item.name}</Text>
                                </View>
                            </TouchableHighlight>
                        ))
                    }
                </ScrollView>
                {this.state.showFinder && <TouchableHighlight onPress={this.toggleFinder.bind(this)}>
                    <Image source={require('./images/finder.png')}
                           style={{width: 25, height: 25, marginLeft: 15}}/>
                </TouchableHighlight>}

                {!this.state.showFinder &&
                <View style={{borderWidth:1, borderColor: '#e9e9e9',flexDirection: 'row',marginRight:10,borderRadius: 5,alignItems:'center'}}>
                    <Image source={require('./images/finder.png')} style={{borderWidth:0, borderColor:'red',width: 25, height: 25, margin: 10}}/>
                    <View style={{flex:5}}>
                        <TextInput style={styles.searchInput} underlineColorAndroid='transparent' autofocus={true}
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
                    </View>

                    <TouchableHighlight onPress={this.toggleFinder.bind(this)}>
                        <Image source={require('./images/close.png')} style={{ borderWidth:0,borderColor:'red', margin:5, width: 25, height: 30}}/>
                    </TouchableHighlight>
                </View>}

            </View>
            <ListView
                enableEmptySections
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
            />
        </View>)
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

    // 返回一个Item
    renderRow(rowData, sectionId, rowId) {
        const {navigate} = this.props.navigation;

        return (
            <TouchableHighlight underlayColor='#D3D3D3' onPress={() => navigate('Detail', {
                title: rowData.title,
                icon: rowData.icon,
                founder: rowData.founder,
                founded: rowData.founded,
                hq: rowData.hq,
                website: rowData.website,
                overview: rowData.overview
            })}
                                title="Chat with Lucy">

                <View style={styles.itemStyle}>
                    <Image source={rowData.icon} style={styles.imageStyle}/>
                    <View style={styles.subItemStyle}>
                        <Text style={{marginTop: 5, fontSize: 17}}>{rowData.title}</Text>
                        <Text style={{marginBottom: 5, fontSize: 13, color: 'green'}}>简介</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const autoLogo = StackNavigator({
    Home: {screen: CarList},
    Detail: {screen: DetailScreen},
});

var styles = StyleSheet.create({
    container: {
        //flex:10,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
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
        borderColor: 'green',
        backgroundColor: 'green',
        display: 'flex',
        marginRight: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
        paddingBottom: 6,
    },
    searchInput: {
        borderRadius: 0,
        borderWidth:0,
        borderColor: '#e9e9e9',
        fontSize: 18,
        height:40,
        paddingLeft: 3,

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
        borderBottomWidth: 3,
        borderColor: '#e9e9e9',
        backgroundColor: 'white',
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

});

AppRegistry.registerComponent('autoLogo', () => autoLogo);
