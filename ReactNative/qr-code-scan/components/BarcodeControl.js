import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Modal from "react-native-modal";
export default class BarcodeControl extends Component {
    render() {
        return (
            <Modal isVisible={this.props.isVisible}>
                <View style={styles.container}>
                    <Text style={styles.title}>Product Found</Text>
                    <View style={styles.ctrlContainer}>
                        <TouchableOpacity onPress={this.props.onPressView}>
                            <Text style={styles.ctrlText}>
                                [view]
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.onPressScanAgain}>
                            <Text style={styles.ctrlText}>
                                [scan again]
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: 200,
        height: 200,
        backgroundColor: 'grey',
        opacity: 0.9,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 26,
        color: 'white',
        textAlign: 'center'
    },
    ctrlContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    ctrlText:{
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    }
})