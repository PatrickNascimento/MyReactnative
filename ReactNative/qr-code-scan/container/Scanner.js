import React, { Component } from 'react';
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import  BarcodeControl  from '../components/BarcodeControl';
import { BarCodeScanner, Permissions } from 'expo';
import { search_product, get_detail_product } from '../API';
export default class Scanner extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
    showScanControl: false,
    isLoading: false,
    productHead: null,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }
  componentWillReceiveProps(newProps){
    console.log(newProps);
  }
  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = async (barcode) => {
    if (barcode.data !== this.state.lastScannedUrl && this.state.lastScannedUrl !== '') {
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: barcode.data });

      console.log(barcode.data);
      var result = await search_product(barcode.data);
      if(result)
        this.setState({showScanControl: true, productHead: result})
      else {
        this.setState({lastScannedUrl: null});
      }
    }
  };
  _handlePressView = async () => {
    this.setState({showScanControl: false});
    var productDetail = await get_detail_product(this.state.lastScannedUrl);

    if(productDetail === false){
      alert('Can not find product information');
      return
    }

    this.props.navigator.push('detailview', {
        productDetail: productDetail,
        productHead: this.state.productHead
    });
    this.setState({lastScannedUrl: ''});
  }
  render() {
    return (
      <View style={styles.container}>
        <BarcodeControl
          isVisible={this.state.showScanControl}
          onPressView={this._handlePressView}
          onPressScanAgain={() => this.setState({showScanControl: false, lastScannedUrl: null})}
        />
        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : this.state.lastScannedUrl ?
              <ActivityIndicator
                  animating={this.state.loading}
                  style={{flex:1}}
                  size="large"
              /> :
              <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />}

        {this._maybeRenderUrl()}

        <StatusBar hidden />
      </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(this.state.lastScannedUrl),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});
