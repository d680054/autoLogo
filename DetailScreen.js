import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class DetailScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.title}`,
    });

    constructor(props) {
        super(props);
    }

    render() {
        const {params} = this.props.navigation.state;

        return (
            <View style={{flex:1,backgroundColor: '#f8f8f8',}}>
                <View style={styles.card}>

                    <View style={{flex:3, borderWidth:0, justifyContent:'flex-end',}}><Image source={params.icon}/></View>

                    <View style={{flex:0.5, borderWidth:0,}}>
                        <Text style={{fontWeight:'600', fontSize:15}}>{'Let\'s go places'.toUpperCase()}</Text>
                    </View>

                    <View style={{flex:1,flexDirection:'column', borderWidth:0, alignItems:'center'}}>
                        {params.founder && <View><Text style={{fontWeight:'600', fontSize:25}}>{params.founder}</Text></View>}
                        <View><Text style={{fontWeight:'500', fontSize:15}}>FOUNDER</Text></View>
                    </View>

                    <View style={{flex:1,flexDirection:'row', justifyContent:'space-around', borderWidth:0}}>
                        <View style={{flex:2, borderWidth:0, flexDirection:'row', alignItems:'center'}}>
                            <View style={styles.leftIcon}>
                                <Icon name="md-calendar" size={38}/>
                            </View>
                            {params.founded && <View style={{flex:3}}><Text>{params.founded}</Text></View>}
                        </View>

                        <View style={{flex:3, borderWidth:0, flexDirection:'row', alignItems:'center'}}>
                            <View style={{flex:3, borderWidth:0, alignItems:'flex-end'}}>{params.website&&<Text>{params.website}</Text>}</View>
                            <View style={styles.rightIcon}>
                                <Icon name="md-globe" size={38}/>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:1,flexDirection:'row', alignItems:'flex-start',justifyContent:'flex-start',borderWidth:0}}>
                        <View style={{flex:1, borderWidth:0, flexDirection:'row', alignItems:'center'}}>
                            <View style={styles.leftIcon}>
                                <Icon name="ios-home" size={38}/>
                            </View>
                            {params.hq && <View style={{flex:3}}><Text>{params.hq}</Text></View>}
                        </View>
                    </View>


                </View>

            </View>
        );
    }
}

var styles = StyleSheet.create({
    imageStyleLarge: {
        width: 240,
        height: 200,
    },
    labelRow: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop:5,

    },
    labelText: {
        fontSize: 18,
    },
    card: {
        flexDirection:'column',
         justifyContent: 'center',
         alignItems: 'center',
        flex:1,
        borderWidth: 1,
        borderColor:'red',
        borderRadius: 5,
        margin:6,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#e9e9e9',
        backgroundColor: 'white',
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    leftIcon: {
        marginLeft:1,
        marginRight:5,
        height:45,
        width:55,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor: '#e9e9e9',
        borderBottomRightRadius:20,
        borderTopRightRadius:20,
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },

    rightIcon: {
        marginRight:1,
        marginLeft:5,
        height:45,
        width:55,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor: '#e9e9e9',
        borderBottomLeftRadius:20,
        borderTopLeftRadius:20,
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 2,

    },
});
