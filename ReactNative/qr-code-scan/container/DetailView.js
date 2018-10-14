import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Dimensions, 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import Pagination from '../components/Pagination';
import { get_product, get_product_two } from '../API';

export default class DetailView extends Component {
  _swiper = null;
  _detailSwiper = [];
  state = {
    productDetail: this.props.productDetail,
    productHead: this.props.productHead,
    index: 0,
    text: '',
    isLoading: false,
  };

  componentDidMount() {
    console.log(this.state.productHead);
  }

  async _handlePressGo(){
    if(this.state.text == '')
      return;
    const { productHead } = this.state;
    if(Number(productHead.productHead.live_inventory_quantity) < Number(this.state.text)){
      this.setState({isLoading: true});
      var result = await get_product(this.state.productHead, this.state.text);
      this.setState({productDetail: result, isLoading: false});
      
    }else if(Number(productHead.productHead.live_inventory_quantity) > Number(this.state.text)){
      this.setState({isLoading: true});
      var result_two = await get_product_two(this.state.productHead, this.state.text);
      this.setState({productDetail: result_two, isLoading: false});
    }
  }
  _handlePressPrint(){
    
  }
  _handlePressSale(){
    this._detailSwiper[this.state.index].scrollBy(-1, true);
  }
  _handlePressOther(){
    console.log(this._detailSwiper[this.state.index] +  ' ' + this.state.index);
    this._detailSwiper[this.state.index].scrollBy(1, true);
  }
  _splitIntoGroup(arr, size) {
    var result = [];
    for (var i=0; i<arr.length; i+=size)
      result.push(arr.slice(i, i+size));
    return result;
  }
  _onChanged (text) {
    this.setState({
        text: text.replace(/[^0-9]/g, ''),
    });
  }
  render() {
    var { productDetail, productHead } = this.state;
    productDetail = this._splitIntoGroup(productDetail, 10);
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => this.props.navigator.pop()}>
            <Text style={styles.closeBtnTxt}>X</Text>
        </TouchableOpacity>

        <Text style={styles.headerText}>
          {`${productHead.productHead.product_size_name} | ${productHead.productHead.barcodes} | ${productHead.productHead.live_inventory_quantity} ${productHead.productHead.live_inventory_quantity > 1 ? "units": "unit"} | $${Number(productHead.productHead.price_sell).toFixed(2)}`}
        </Text>
        {
          this.state.isLoading ?

          <ActivityIndicator
              animating={this.state.isLoading}
              style={{flex:1}}
              size="large"
          /> :
          <Swiper
            ref={(ref) => this._swiper = ref}
            showsButtons={false}
            horizontal={false}
            showsPagination
            onIndexChanged={(index) => this.setState({index})}
            renderPagination={(index, total) => 
              <Pagination
                index={this.state.index}
                total={total}
                swiperRef={this._swiper}
              />
            }
            removeClippedSubviews={true}
            scrollEnabled={false}
            loop={false}
            automaticallyAdjustContentInsets={true}
          >
            {
              productDetail.map((item, index) => {
                  return (
                      <Swiper
                        ref={(ref) => this._detailSwiper[index] = ref}
                        key={'page'+index} 
                        loop={false}  
                        showsPagination={false}
                        removeClippedSubviews={true}
                      >
                          <View key={"sale_page"}>
                          {
                            item.map((value, index) => {
                              if(value.action == 'Sale'){
                                return (
                                  <View key={'row_sale'+index} style={styles.detailRow}>
                                      <Text style={[styles.detailRowTxt, {paddingLeft: 10}]}>
                                          {`${value.date} | ${value.action} | ${value.units > 1 ? "units": "unit"}:${value.units}`}
                                      </Text>
                                      <Text style={styles.detailRowTxt}>
                                        {`ticketId: ${value.ticket_id} | ${value.host} | ${value.user}`}
                                      </Text>
                                  </View>
                                )
                              }
                            })
                          }
                          </View>
                          <View key={"not_sale_page"}>
                          {
                            item.map((value, index) => {
                              if(value.action !== 'Sale')
                                return (
                                  <View key={'row_not_sale'+index} style={styles.detailRow}>
                                      <Text style={[styles.detailRowTxt, {paddingLeft: 10}]}>
                                        {`${value.date} | ${value.action} | ${value.units > 1 ? "units": "unit"}:${value.units}`}
                                      </Text>
                                      <Text style={styles.detailRowTxt}>
                                        {`ticketId: ${value.ticket_id} | ${value.host} | ${value.user}`}
                                      </Text>
                                  </View>
                                );
                            })
                          }
                          </View>
                      </Swiper>
                  );
              })
            }
          </Swiper>
        }
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterBtn} onPress={this._handlePressSale.bind(this)}>
            <Text style={styles.filterBtnTxt}>Sale</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn} onPress={this._handlePressOther.bind(this)}>
            <Text style={styles.filterBtnTxt}>Other</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
            <TextInput
                style={styles.inputContainer}
                placeholder="New Count"
                returnKeyType="go"
                onSubmitEditing={this._handlePressGo.bind(this)}
                underlineColorAndroid="transparent"
                onChangeText={this._onChanged.bind(this)}
                value={this.state.text}
            />
            <TouchableOpacity style={styles.goBtn} onPress={this._handlePressGo.bind(this)}>
                <Text style={styles.goBtnTxt}>GO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.goBtn} onPress={this._handlePressPrint.bind(this)}>
                <MaterialCommunityIcons name={"printer"} size={40}/>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const windowSize = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingTop: 50,
    paddingBottom: 120
  },
  headerText: {
    fontSize: 16,
    color: 'black',

  },
  detailRow: {
    paddingTop: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  detailRowTxt:{
    fontFamily: 'Helvetica',
    flex: 0.5,
    fontSize: 14,
    color: 'black',
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  closeBtnTxt: {
    color: 'black',
    fontSize: 25,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: windowSize.width
  },
  filterBtn: {
    width: 70
  },
  filterBtnTxt:{
    fontSize: 25,
    color: 'black',
    textAlign: 'center'
  },
  bottomContainer: {
    flexDirection: 'row',
    height: 100,
    width: '100%',
    position: 'absolute',
    bottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  inputContainer:{
    flex: 0.4,
    height: 70,
    fontSize: 26,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'black',
    paddingLeft: 10,
    borderRadius: 5
  },
  goBtn: {
    flex: 0.3,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    marginLeft: 10,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 5
  },
  goBtnTxt: {
    fontSize: 26,
    textAlign: 'center'
  },
});
