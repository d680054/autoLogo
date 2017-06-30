import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Button,
    Dimensions,
    Platform,
} from 'react-native';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FlipCard from './FlipCard';

import logo from './data/localData';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MIN = 0;
const MAX = 248;
const height=Dimensions.get('window').height;
const width=Dimensions.get('window').width;

var interval;
export default class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            icon: null,
            title: '',
            answers: '',
            item1:'rgb(36,106,184)',
            item2:'rgb(36,106,184)',
            item3:'rgb(36,106,184)',
            item4:'rgb(36,106,184)',
            btnTxt: 'Start',
            disableChoose: true,
            pass:0,
            total:0,
            countDown:0,
            isClickable: false,
            iconFace1: 'emoticon-neutral',
            iconFace2: 'emoticon-neutral',
            iconFace3: 'emoticon-neutral',
            iconFace4: 'emoticon-neutral',
        };
    }

    componentDidMount() {
        //this.genRandomQA();
    }

    componentWillUnmount() {
        clearInterval(interval);
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    flex: 1.5,
                    justifyContent: 'space-around',
                    borderWidth: 0,
                    alignItems: 'center'
                }}>
                    <View style={{flex:1}}><Text style={{alignSelf:'center', fontSize:35, color:'rgb(59,89,152)'}}>{this.state.pass}/50</Text></View>
                    <View style={{flex:1, borderWidth:0}}>
                        {Platform.OS === 'ios'&&<AnimatedCircularProgress style={{alignSelf:'center'}}
                        size={70}
                        width={3}
                        fill={Math.abs(-10 + this.state.countDown)*10}
                        prefill={100}
                        tintColor="silver"
                        backgroundColor="rgb(59,89,152)">{
                        (fill) => (
                            <View style={styles.points}>
                            <Text style={{fontSize:36,fontWeight:'bold', color:'black'}}>
                                { this.state.countDown }
                            </Text>
                            </View>
                          )
                        }
                        </AnimatedCircularProgress>}

                        {Platform.OS === 'android' && <Text style={{fontSize:36,fontWeight:'bold', alignSelf:'center',color:'black'}}>
                            { this.state.countDown }
                        </Text>}


                    </View>
                    <View style={{flex:1}}>
                        <TouchableOpacity  style={styles.nextBtn} onPress={this.genRandomQA.bind(this)}>
                            <Text style={{fontWeight:'bold', fontSize:18,color:'#fff38e'}}>{this.state.btnTxt}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.flipCar}>
                <FlipCard
                    style={styles.imageBK}
                    friction={5}
                    perspective={2000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={true}
                    clickable={this.state.isClickable}>
                    <View style={[styles.face, {borderWidth:0, margin:12}]}>
                        <Image source={this.state.icon} style={{width: 200, height: 140}}/>
                    </View>

                    <View style={styles.back}>
                        <Text style={{marginTop:60, fontWeight:"bold", fontSize:30}}>{this.state.title}</Text>
                    </View>
                </FlipCard>
                </View>



                <View style={{flex: 5, justifyContent: 'space-around', borderWidth: 0}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        {false&&<View style={{paddingLeft:20}}><Text>Identify this car logo.</Text></View>}
                    </View>

                    <View>
                        <TouchableOpacity style={[styles.optionItem, {borderColor:this.state.item1, backgroundColor: this.state.item1 }]} onPress={this.checkAnswer1.bind(this,this.state.answers[0])}>
                            <Text style={styles.optionText}>{this.state.answers[0]}</Text>
                            {false&&<Text>{this.state.title}</Text>}
                            <Icon name={this.state.iconFace1} size={38} color="white"/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={[styles.optionItem, {borderColor:this.state.item2, backgroundColor: this.state.item2 }]} onPress={this.checkAnswer2.bind(this,this.state.answers[1])}>
                            <Text style={styles.optionText}>{this.state.answers[1]}</Text>
                            {false&&<Text>{this.state.title}</Text>}
                            <Icon name={this.state.iconFace2} size={38} color="white"/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={[styles.optionItem, {borderColor:this.state.item3, backgroundColor: this.state.item3 }]} onPress={this.checkAnswer3.bind(this,this.state.answers[2])}>
                            <Text style={styles.optionText}>{this.state.answers[2]}</Text>
                            {false&&<Text>{this.state.title}</Text>}
                            <Icon name={this.state.iconFace3} size={38} color="white"/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={[styles.optionItem, {borderColor:this.state.item4, backgroundColor: this.state.item4 }]} onPress={this.checkAnswer4.bind(this,this.state.answers[3])}>
                            <Text style={styles.optionText}>{this.state.answers[3]}</Text>
                            {false&&<Text>{this.state.title}</Text>}
                            <Icon name={this.state.iconFace4} size={38} color="white"/>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.disableChoose && <View style={{borderWidth:0, height: height * 0.4, position:'absolute', bottom:0, width:400}}/>}
            </View>
        );
    }


    genRandomQA() {
        if (this.state.total <= 50) {
            let right = 0;
            let rows = [];
            let posi = Math.ceil(Math.random() * (5 - 1) - 1);
            for (let value of [0, 1, 2, 3]) {
                let tmp = Math.ceil(Math.random() * (MAX - MIN) + MIN);
                console.info('the tmp:' + tmp);
                rows.push(logo.info[tmp].title);
                if (value == posi) right = tmp;
            }
            this.setState({
                icon: logo.info[right].icon, title: rows[posi], answers: rows,
                item1: 'rgb(36,106,184)', item2: 'rgb(36,106,184)', item3: 'rgb(36,106,184)', item4: 'rgb(36,106,184)',
                btnTxt: 'SKIP', disableChoose: false, isClickable: false,
                countDown: 10, total: this.state.total + 1,
                iconFace1: 'emoticon-neutral', iconFace2: 'emoticon-neutral',
                iconFace3: 'emoticon-neutral', iconFace4: 'emoticon-neutral'
            });
            this.countDown();
       } else if (this.state.total > 51){
            if (this.state.pass > 45) {
                //pass the result
            } else {
                //fail the test.
            }
        }
       clearInterval(interval);
    }

    countDown() {
        interval = setInterval(() => {
            if (this.state.countDown > 0) {
                this.setState({countDown: this.state.countDown - 1})
            }
            if (this.state.countDown == 0) {
                this.setState({btnTxt: 'NEXT', disableChoose: true, isClickable: true});
            }
        }, 1000)
    }

    checkAnswer1(item) {
        if (this.state.title === item) {
            this.setState({item1 :'rgb(172,224,0)', pass: this.state.pass+1, iconFace1: 'emoticon'});

        } else {
            this.setState({item1 :'red',  iconFace1: 'emoticon-sad'});
        }
        this.setState({btnTxt: 'NEXT', disableChoose: true, isClickable: true});
        clearInterval(interval);
    }

    checkAnswer2(item) {
        if (this.state.title === item) {
            this.setState({item2 :'rgb(172,224,0)', pass: this.state.pass+1, iconFace2: 'emoticon'});
        } else {
            this.setState({item2 :'red', iconFace2: 'emoticon-sad'});
        }
        this.setState({btnTxt: 'NEXT', disableChoose: true, isClickable: true});
        clearInterval(interval);
    }

    checkAnswer3(item) {
        if (this.state.title === item) {
            this.setState({item3 :'rgb(172,224,0)', pass: this.state.pass+1, iconFace3: 'emoticon'});
        } else {
            this.setState({item3 :'red', iconFace3: 'emoticon-sad'});
        }
        this.setState({btnTxt: 'NEXT', disableChoose: true, isClickable: true});
        clearInterval(interval);
    }

    checkAnswer4(item) {
        if (this.state.title === item) {
            this.setState({item4 :'rgb(172,224,0)', pass: this.state.pass+1, iconFace4: 'emoticon'});
        } else {
            this.setState({item4 :'red', iconFace4: 'emoticon-sad'});
        }
        this.setState({btnTxt: 'NEXT', disableChoose: true, isClickable: true});
        clearInterval(interval);
    }
}

class Option extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answerColor: 'red',
        };
    }

    componentDidMount() {
        this.props.onRef(this);
    }
    componentWillUnmount() {
        this.props.onRef(undefined);
    }



    render() {
        return (
            <View style={{borderWidth:1, borderColor: this.state.answerColor}}>
                <TouchableOpacity onPress={this.checkAnswer.bind(this)}>
                    <Text>{this.props.option}</Text>
                    {true&&<Text>{this.props.title}</Text>}
                </TouchableOpacity>
            </View>
        );
    }

    checkAnswer() {
        var self = this;
        if (this.props.title === this.props.option) {
            this.setState({answerColor:'palegreen'});
        } else {
            console.info("wrong");
        }
    }
}

var styles = StyleSheet.create({
    container: {
        //flex:10,
        flex: 1,
        backgroundColor: '#f8f8f8',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    optionItem: {
        flexDirection:'row',
        marginLeft:10,
        marginRight:15,
        height:40,
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:2,
        borderBottomRightRadius:20,
        borderTopRightRadius:20,
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    optionText: {
        paddingLeft:10,
        color:'white',
        fontSize:17
    },

    nextBtn: {
        alignSelf:'center',
        height:30,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        width:90,
        borderRadius:20,
        backgroundColor:'rgb(59,89,152)',
        borderColor: 'rgb(59,89,152)',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },

    flipCar: {
        flex: (Platform.OS === 'ios') ? 3 : 3.5,

        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
    },
    imageBK: {
        // 主轴方向
        // 下边框
         flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        borderColor: 'red',
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
        width:width-20,

    },

    points:{
        alignSelf:'center',
        marginTop:12,
        position:'absolute',
        borderWidth:0,

    }


});
