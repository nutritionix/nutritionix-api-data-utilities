'use strict';
var nutrientsArtifacts = require('./artifacts.js');
var nutrientsMap = nutrientsArtifacts.nutrientsMap;
var fullNutrientsDefinitions = nutrientsArtifacts.fullNutrientsDefinitions;
var attrMap = nutrientsArtifacts.attrMap;

var _ = {
  mapKeys: require('lodash/mapKeys'),
  uniqBy: require('lodash/uniqBy'),
  defaults: require('lodash/defaults'),
  reduce: require('lodash/reduce'),
  round: require('lodash/round'),
  set: require('lodash/set'),
  map: require('lodash/map')
};

/**
 * @license MIT
 * @version 1.3.0
 * @author Yura Fedoriv <yurko.fedoriv@gmail.com>
 *
 * @description
 * Utilities to handle different data formats in Nutritionix APIs
 */
module.exports = {
  nutrientsMap,
  fullNutrientsDefinitions,
  attrMap,
  convertV1ItemToTrackFood,
  buildFullNutrientsArray,
  convertFullNutrientsToNfAttributes,
  extendFullNutrientsWithMetaData
};


var v1TypeAliases = {
  item_name: 'food_name',
  nf_serving_size_qty:  'food_name',
  nf_serving_size_unit: 'serving_unit',
  nf_serving_weight_grams: 'serving_weight_grams',
  item_id: 'nix_item_id'
};

/**
 *
 * @param {object} v1Item Api V1 Food object
 * @param {object} defaultObj [OPTIONAL] Additional data object that is used as properties source.
 *                                        Use it to provide default properties.
 * @returns {object} Track API food object
 */

function convertV1ItemToTrackFood(v1Item, defaultObj) {
  v1Item = (typeof v1Item === 'object') ? v1Item : {};
  defaultObj = (typeof defaultObj === 'object') ? v1Item : {};

  var base = {
    metadata:              {},
    food_name:             undefined,
    brand_name:            null,
    serving_qty:           1,
    serving_unit:          'serving',
    serving_weight_grams:  null,
    nf_calories:           null,
    nf_total_fat:          null,
    nf_saturated_fat:      null,
    nf_cholesterol:        null,
    nf_sodium:             null,
    nf_total_carbohydrate: null,
    nf_dietary_fiber:      null,
    nf_sugars:             null,
    nf_protein:            null,
    nf_potassium:          null,
    nf_p:                  null,
    full_nutrients:        [],
    created_at:            undefined,
    consumed_at:           undefined,
    nix_brand_name:        null,
    nix_brand_id:          null,
    nix_item_name:         null,
    nix_item_id:           null,
    upc:                   null,
    source:                null,
    ndb_no:                null,
    natural_query_id:      null,
    tags:                  null,
    photo: null,
    lat: null,
    lng: null,
    note: null,
    alt_measures: [],
    tags: {}
  };

  //apply any necessary aliases
  let v1PickFields = _.mapKeys(v1Item, function(value, key) {
    return v1TypeAliases.hasOwnProperty(key) ? v1TypeAliases[key] : key;
  });

  //build a full nutrient array from any 'nf' fields from the v1item;
  let v1FullNutrs = buildFullNutrientsArray(v1Item);

  //join the arrays, taking the defaultObj nutrients first (will be preferred in later uniq testing)
  let possibleDuplicateArray = Array.isArray(defaultObj.full_nutrients) ? defaultObj.full_nutrients.concat(v1FullNutrs) : v1FullNutrs;
  //remove duplicates
  let calced_nutrients = _.uniqBy(possibleDuplicateArray, function(nutr) {
    return nutr.attr_id;
  });

  return _.defaults({full_nutrients: calced_nutrients}, defaultObj, base);
}

/**
 * Uses top level properties from provided data object to construct full nutrients array.
 * Supports api names and attr ids as keys of the source object
 *
 * @param {Object} data
 * @returns {Array} Full nutrients array
 */
function buildFullNutrientsArray(data) {
  return _.reduce(nutrientsMap, function(accum, nutrDetails, v1AttrName) {
    if (data[v1AttrName]) {
      //round to 4 decimal places
      let value = _.round(data[v1AttrName], 4);
      accum.push({
        attr_id: nutrDetails.attr_id,
        value: value
      });
    }
    return accum;
  }, []);
}

/**
 * Generates object with top level nf_attributes from full_nutrients array
 * @param {Object[]} fullNutrients Full nutrients array
 * @returns {Object} Nf attributes object
 */
function convertFullNutrientsToNfAttributes(fullNutrients) {
  return _.reduce(fullNutrients, function(accum, val) {
    var nfKey = attrMap[val.attr_id];
    if (nfKey) {
      return _.set(accum, nfKey, val.value);
    } else {
      //invalid attr_id, discard.
      return accum;
    }
  }, {});
}



/**
 * Expand short form of full_nutrients items to the full one with name, unit and usda_tag
 * Mutates original objects
 *
 * @param {Object[]} fullNutrients Full nutrients array
 * @returns {Object[]} Mutated full nutrients array
 */
function extendFullNutrientsWithMetaData(fullNutrients) {
  return _.map(fullNutrients, function(nutr) {
    //found matching nutrient, extend.
    let nutrDefMatch = fullNutrientsDefinitions[nutr.attr_id];
    if (nutrDefMatch) {
      return _.defaults({nutr, nutrDefMatch});
    } else {
      //no match, return base.
    }
  });
}
