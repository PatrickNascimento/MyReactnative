import * as _ from 'lodash';
const API_FIRST_URL =
  'https://api.treez.io/v1.0/dispensary/cbcbberkeley/menu/product_list?type=all&offset=0&limit=600';
const API_SECOND_URL =
  'https://cbcbberkeley.treez.io/portalDispensary/php/getStock.php';
const API_THIRD_URL =
  'https://cbcbberkeley.treez.io/portalDispensary/php/getDetails.php?barcode=';
const API_FOURTH_URL =
  'https://cbcbberkeley.treez.io/portalDispensary/report_inventory_model.php';

export async function search_product(barcode) {
  try {
    var response = await fetch(API_FIRST_URL)
      .then(response => response.json())
      .then(responseJson => {
        var product = false;
        _.map(responseJson.product_list, value => {
          var size_list_index = 0;
          _.map(value.size_list, (item, index) => {
            _.map(item.barcodes, code => {
              if (code == barcode) {
                console.log(barcode);

                product = true;
                size_list_index = index;
              }
            });
          });
          if (product === true)
            product = {
              productId: value.product_id,
              expected: value.live_inventory_quantity,
              productHead: value.size_list[size_list_index],
            };
        });
        return product;
      });
    // var product = _.filter(responseJson.product_list, ['size_list']);

    if (response === false) {
      var resultTwo = await fetch(API_SECOND_URL)
        .then(response => response.json())
        .then(responseJson => {
          var product = _.find(responseJson.list, { visible_id: barcode });
          if (product === undefined) return false;
          return product.id;
        });
      if (resultTwo === false) return false;
    }
    return response || resultTwo;
  } catch (err) {
    console.log(err);
    return false;
  }
}
export async function get_detail_product(barcode) {
  try {
    var response = await fetch(API_THIRD_URL + barcode);
    var result = await response.json();
    return result.list;
  } catch (err) {
    console.log(err);
    return false;
  }
}
export async function get_product_two(productHead, actual) {
  try {
    var result = await fetch(API_FOURTH_URL, {
      method: 'POST',
      body: JSON.stringify({
        uid: 1,
        list: [
          {
            lotNumber: '',
            productId: productHead.productId,
            expected: productHead.expected,
            actual: actual,
            reason: 'Transferred',
          },
        ],
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        return responseJson;
      });
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}
export async function get_product(productHead, actual) {
  try {
    var result = await fetch(API_FOURTH_URL, {
      method: 'POST',
      body: JSON.stringify({
        uid: 1,
        list: [
          {
            lotNumber: '',
            productId: productHead.productId,
            expected: productHead.expected,
            actual: actual,
            reason: 'Transferred',
          },
        ],
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        return responseJson;
      });
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}
