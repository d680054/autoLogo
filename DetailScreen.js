import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
const width=Dimensions.get('window').width;

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
            <View style={{flex:1,backgroundColor: 'rgb(226,226,226)',}}>
                <View style={styles.card}>

                    <View style={{flex:4.5, paddingTop:6,borderWidth:0, justifyContent:'flex-end',}}><Image style={{height:220}} source={params.icon}/></View>

                    {params.slogan&&<View style={{flex:0.5, borderWidth:0,}}>
                        <Text style={{fontWeight:'500', fontSize:17, color:'black',textDecorationLine:'underline'}}>{params.slogan.toUpperCase()}</Text>
                    </View>}

                    {params.founder && <View style={{flex:1.5,flexDirection:'column', borderWidth:0, alignItems:'center'}}>
                        <View><Text style={{fontWeight:'600', fontSize:22, color:'black'}}>{params.founder}</Text></View>
                        <View><Text style={{fontWeight:'500', fontSize:13}}>FOUNDER</Text></View>
                    </View>}

                    <View style={{flex:4, marginTop:10}}>
                   <ScrollView style={{borderWidth:0,flexDirection:'column',width:width-20}}>

                    <View style={styles.item}>
                        <View style={{flex:1, borderWidth:0, flexDirection:'row', alignItems:'center'}}>
                            <View style={[styles.leftIcon,{borderColor: 'rgb(0,119,227)', backgroundColor:'rgb(0,119,227)',}]}>
                                <Icon name="md-calendar" size={38} color="white"/>
                            </View>
                            {params.founded && <View style={{flex:3}}><Text style={{color: 'black'}}>{params.founded}</Text></View>}
                        </View>
                    </View>

                    <View style={styles.item}>
                        <View style={{flex:1, borderWidth:0, flexDirection:'row', alignItems:'center'}}>
                            <View style={[styles.leftIcon,{borderColor: 'rgb(172,224,0)', backgroundColor:'rgb(172,224,0)',}]}>
                                <Icon name="md-globe" size={38} color="white"/>
                            </View>
                            <View style={{flex:3}}>{params.website&&
                            <TouchableOpacity onPress={() => {
                                Linking.openURL("http://"+params.website)}}>
                                <Text style={{color: 'black', textDecorationLine:'underline'}}>{params.website}</Text>
                            </TouchableOpacity>}
                             </View>
                        </View>
                    </View>

                    <View style={styles.item}>
                        <View style={{flex:1, borderWidth:0, flexDirection:'row', alignItems:'center'}}>
                            <View style={[styles.leftIcon,{borderColor: 'rgb(255,186,1)', backgroundColor:'rgb(255,186,1)',}]}>
                                <Icon name="ios-home" size={38} color="white"/>
                            </View>
                            {params.hq && <View style={{flex:3}}><Text style={{color: 'black'}}>{params.hq}</Text></View>}
                        </View>
                    </View>

                       <View style={styles.item}>
                           <View style={{flex:1, borderWidth:0, flexDirection:'column', alignItems:'center'}}>
                               <View style={[styles.leftIcon,{alignSelf:'flex-start',borderColor: 'rgb(255,0,0)', backgroundColor:'rgb(255,0,0)',}]}>
                                   <Icon name="ios-book" size={38} color="white"/>
                               </View>
                               <View style={{marginTop:0,}}><Text style={{padding:10,color: 'black',}}>{params.overview}</Text></View>
                           </View>
                       </View>

                    </ScrollView>
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
        margin:8,
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
        marginLeft:0,
        marginRight:5,
        height:45,
        width:55,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderBottomRightRadius:20,
        borderTopRightRadius:20,
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },

    item: {
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        borderWidth:0,
        marginBottom:20,
    }
});
