'use strict';


const _ = require('./utils');
const {
  nutrientsMap,
  fullNutrientsDefinitions,
  attrMap,
  baseTrackObj,
  dailyValueTransforms
} = require('./artifacts.js');

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


const v1TypeAliases = {
  item_name: 'food_name',
  nf_serving_size_qty:  'serving_qty',
  nf_serving_size_unit: 'serving_unit',
  nf_serving_weight_grams: 'serving_weight_grams',
  item_id: 'nix_item_id',
  brand_name: 'nix_brand_name',
  brand_id: 'nix_brand_id'
};

function hasItems(test) {
  return Array.isArray(test) && test.length;
}

function optimisticallyMergeArrays(comparator, ...cols) {
  let mergeCols = cols.filter(hasItems);
  //base cases
  if (!mergeCols.length) return [];
  if (mergeCols.length === 1) return mergeCols[0];

  let flat = [].concat(...mergeCols);
  return _.uniqBy(flat, comparator);
}

/**
 *
 * @param {object} v1Item Api V1 Food object
 * @param {object} defaultObj [OPTIONAL] Additional data object that is used as properties source.
 *                                        Use it to provide default properties.
 * @returns {object} Track API food object
 */

function convertV1ItemToTrackFood(v1Item, defaultObj) {
  v1Item = (typeof v1Item === 'object' && v1Item !== null) ? v1Item : {};
  defaultObj = (typeof defaultObj === 'object' && defaultObj !== null) ? defaultObj : {};


  //apply any necessary aliases
  let v1PickFields = _.mapKeys(v1Item, function(value, key) {
    return v1TypeAliases.hasOwnProperty(key) ? v1TypeAliases[key] : key;
  });

  //build a full nutrient array from any 'nf' fields from the v1item;
  let v1FullNutrs = buildFullNutrientsArray(v1PickFields);

  //join the arrays, taking the defaultObj nutrients first (will be preferred in later uniq testing)
  let fullNutrArray = optimisticallyMergeArrays(nutr => nutr.attr_id, defaultObj.full_nutrients, v1FullNutrs);

  //keep relevant fields from v1 item
  let v1Defaults = _.reduce(_.keys(baseTrackObj), (accum, key) => {
    accum[key] = v1PickFields[key];
    return accum;
  }, {});

  return _.defaults({full_nutrients: fullNutrArray}, defaultObj, v1Defaults, baseTrackObj);
}

/**
 * Uses top level properties from provided data object to construct full nutrients array.
 * Supports api names as keys of the source object
 *
 * @param {Object} data
 * @returns {Array} Full nutrients array
 */
function buildFullNutrientsArray(data) {
  return _.reduce(nutrientsMap, function(accum, nutrDetails, v1AttrName) {
    if (data[v1AttrName]) {
      let value = data[v1AttrName];
      let attr_id = nutrDetails.attr_id;
      //ensure that daily value measures are calculated into the appropriate units.
      if (dailyValueTransforms[attr_id]) {
        value = dailyValueTransforms[attr_id] / 100 * value;
      }
      //round to 4 decimal places
      value = parseFloat(value.toFixed(4));
      // let value = parseFloat(data[v1AttrName].toFixed(4));
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
      let transformVal = dailyValueTransforms[val.attr_id];
      accum[nfKey] = transformVal ? val.value / transformVal * 100 : val.value;
    }
    return accum;
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
  return fullNutrients.map(function(nutr) {
    //found matching nutrient, extend.
    let nutrDefMatch = fullNutrientsDefinitions[nutr.attr_id];
    if (nutrDefMatch) {
      return _.defaults(nutr, nutrDefMatch);
    } else {
      return nutr;
      //no match, return base.
    }
  });
}
