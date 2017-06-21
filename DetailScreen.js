import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
} from 'react-native';


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
            <View style={{backgroundColor: 'white'}}>
                <View style={{flexDirection: 'column'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}><Image source={params.icon}
                                                                                          style={styles.imageStyleLarge}/></View>
                    <View style={{marginTop: 10}}>
                        <View style={styles.labelRow}><Text>Founded:</Text><Text
                            style={{marginLeft: 5}}>{params.founded}</Text></View>
                        <View style={styles.labelRow}><Text>Founder:</Text><Text
                            style={{marginLeft: 5}}>{params.founder}</Text></View>
                        <View style={styles.labelRow}><Text>Headquarters:</Text><Text
                            style={{marginLeft: 5}}>{params.hq}</Text></View>
                        <View style={styles.labelRow}><Text>Official Site:</Text><Text
                            style={{marginLeft: 5}}>{params.website}</Text></View>
                    </View>
                </View>
                <View style={{marginLeft: 5}}>
                    <Text>Description:</Text>
                    <Text>{params.overview}</Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    imageStyleLarge: {
        width: 220,
        height: 200,
    },
    labelRow: {
        flexDirection: 'row',
        marginLeft: 5,
    },
});
