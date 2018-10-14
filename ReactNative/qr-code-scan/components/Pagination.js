import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';
import * as _ from 'lodash';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default class Pagination extends Component {
    _swiper = this.props.swiperRef;
    state = {
        index: this.props.index,
        total: this.props.total,
    }
    componentWillReceiveProps(newProps){
        if(newProps.index !== this.state.index)
            this.setState({index: newProps.index});
        if(newProps.total !== this.state.total)
            this.setState({index: newProps.total});
        if(newProps.swiperRef !== this._swiper)
            this._swiper = newProps.swiperRef;
              
    }
    render(){
        const {index, total} = this.state;
        const start = index - 4 > 0 ? ( index - 4 > total - 8 ? total - 8 : index - 4 ) : 0;
        const end = index + 4 < total ? ( index + 4 < 8 ? 8 : index + 4 ) : total;
        const paginationArray = _.range(start, end);

        return (
            <View style={styles.container}>
                <TouchableOpacity style={[styles.ctrlBtn, { marginRight: 5 }]}
                    onPress={() => {
                        if(index > 0)
                            this._swiper.scrollBy(-1)
                    }}
                >
                    <MaterialCommunityIcons name="chevron-left" size={30} color={'#0C67C1'} />
                </TouchableOpacity>

                {
                    _.map(paginationArray, (item) => {
                        const color = item === index ? {color: '#D88500'} : {color: '#444444'};
                        return (
                            <Text key={item} allowFontScaling={false} style={[color, styles.pageTxt]}>
                                {item + 1}
                            </Text>
                        );
                    })
                }
                <TouchableOpacity style={[styles.ctrlBtn, { marginLeft: 5 }]}
                    onPress={() => {
                        if(index < total - 1)
                            this._swiper.scrollBy(1);
                    }}
                >
                    <MaterialCommunityIcons name="chevron-right" size={30} color={'#0C67C1'} />
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection:'row', 
        alignSelf:'center', 
        paddingBottom: 15
    },
    ctrlBtn:{
        height:30, 
        width:30, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius:3, 
        borderWidth:1, 
        borderColor: '#444444'
    },
    pageTxt: {
        fontSize:16, 
        fontFamily: 'Helvetica', 
        marginLeft:5, 
        marginRight: 5, 
        alignSelf: 'center'
    }
})