'use strict';

const _ = require('./utils');
const {
        nutrientsMap,
        fullNutrientsDefinitions,
        attrMap,
        baseTrackObj,
        dailyValues,
        cxhMapping,
      } = require('./artifacts.js');

/**
 * @license MIT
 * @version 3.0.1
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
  extendFullNutrientsWithMetaData,
  dailyValueTransforms: dailyValues,
  dailyValues,
  convertOnyxToFullNutrientsArray,
  convertCxhToFullNutrients,
  cxhMapping,
};


const v1TypeAliases = {
  item_name:               [ 'food_name', 'nix_item_name' ],
  nf_serving_size_qty:     [ 'serving_qty' ],
  nf_serving_size_unit:    [ 'serving_unit' ],
  nf_serving_weight_grams: [ 'serving_weight_grams' ],
  item_id:                 [ 'nix_item_id' ],
  brand_name:              [ 'nix_brand_name', 'brand_name' ],
  brand_id:                [ 'nix_brand_id' ]
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
  v1Item     = (typeof v1Item === 'object' && v1Item !== null) ? v1Item : {};
  defaultObj = (typeof defaultObj === 'object' && defaultObj !== null) ? defaultObj : {};

  //build a full nutrient array from any 'nf' fields from the v1item;
  let v1FullNutrs = buildFullNutrientsArray(v1Item);

  //create an object with superset of keys, including both original and aliases fields for later picking.
  let mappedFields = _.reduce(v1Item, function (accum, val, key) {
    //either use array of aliases, or the key itself.
    let aliases = v1TypeAliases[key];
    if (aliases) {
      aliases.forEach(alias => accum[alias] = val);
    } else {
      accum[key] = val;
    }
    return accum;
  }, {});

  //only include truthy fields that are track food object fields. Untruthy fields will be defaulted to the baseTrackObj value.
  let v1Defaults = _.pickBy(mappedFields, (val, key) => {
    return baseTrackObj.hasOwnProperty(key) && (val || val === 0);
  });


  //join the arrays, taking the defaultObj nutrients first (will be preferred in later uniq testing)
  let fullNutrArray = optimisticallyMergeArrays(nutr => nutr.attr_id, defaultObj.full_nutrients, v1FullNutrs);

  return _.defaults({ full_nutrients: fullNutrArray }, defaultObj, v1Defaults, baseTrackObj);
}

/**
 * Uses top level properties from provided data object to construct full nutrients array.
 * Supports api names as keys of the source object
 *
 * @param {Object} data
 * @returns {Array} Full nutrients array
 */
function buildFullNutrientsArray(data) {
  const fullNutrients = [];

  _.forEach(nutrientsMap, function (nutrientDetails, v1AttrName) {
    if (data[v1AttrName] || data[v1AttrName] === 0) {
      let value = parseFloat(data[v1AttrName]);
      if (!isNaN(value) && !(value < 0)) {
        let attr_id = nutrientDetails.attr_id;
        //ensure that daily value measures are calculated into the appropriate units.
        if (v1AttrName.slice(-3) === '_dv' && dailyValues[attr_id]) {
          value = dailyValues[attr_id] / 100 * value;
        }
        //round to 4 decimal places
        value = parseFloat(value.toFixed(4));

        // failsafe in case the same nutrient may be mapped from multiple attributes (dv and non-dv values)
        const nutrient = _.find(fullNutrients, (v) => v.attr_id === attr_id);
        if (nutrient) {
          nutrient.value = value;
        } else {
          fullNutrients.push({
            attr_id,
            value: value
          });
        }
      }
    }
  })

  return fullNutrients;
}

/**
 * Generates object with top level nf_attributes from full_nutrients array
 * @param {Object[]} fullNutrients Full nutrients array
 * @returns {Object} Nf attributes object
 */
function convertFullNutrientsToNfAttributes(fullNutrients) {
  return _.reduce(fullNutrients, function (accum, val) {
    const nfKeys = attrMap[val.attr_id];
    if (nfKeys) {
      const nfKeysArray = Array.isArray(nfKeys) ? nfKeys : [ nfKeys ];

      nfKeysArray.forEach(function (nfKey) {
        if (nfKey.slice(-3) === '_dv') {
          const dailyValue = dailyValues[val.attr_id];
          accum[nfKey]     = dailyValue ? val.value / dailyValue * 100 : val.value;
        } else {
          accum[nfKey] = val.value;
        }
      });
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
  return fullNutrients.map(function (nutr) {
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

const onyxMapping = {
  204: [ { 'Nutrient.Text': "Total Fat" }, { 'Nutrient.Value': "127271" } ],
  606: [ { 'Nutrient.Text': "Saturated Fat" }, { 'Nutrient.Text': "Sat. fat" }, { 'Nutrient.Value': "127272" } ],
  605: [ { 'Nutrient.Text': "Trans Fat" }, { 'Nutrient.Value': "132289" } ],
  601: [ { 'Nutrient.Text': "Cholesterol" }, { 'Nutrient.Text': "cholestrol" }, { 'Nutrient.Value': "127275" } ],
  307: [ { 'Nutrient.Text': "Sodium" }, { 'Nutrient.Value': "127276" } ],
  205: [ { 'Nutrient.Text': "Total Carbohydrate" }, { 'Nutrient.Text': "carbohydrates" }, { 'Nutrient.Value': "127278" } ],
  291: [ { 'Nutrient.Text': "Dietary Fiber" }, { 'Nutrient.Value': "127279" } ],
  269: [ { 'Nutrient.Text': "Sugars" }, { 'Nutrient.Value': "127282" } ],
  203: [ { 'Nutrient.Text': "Protein" }, { 'Nutrient.Value': "127285" } ],
  306: [ { 'Nutrient.Text': "Potassium" }, { 'Nutrient.Value': "127277" } ],
  208: (panel) => _.get(panel, 'Calorie.Calories'),
  646: [ { 'Nutrient.Text': "Polyunsaturated Fat" }, { 'Nutrient.Value': "127273" } ],
  645: [ { 'Nutrient.Text': "Monounsaturated Fat" }, { 'Nutrient.Value': "127274" } ],
};

/**
 * Uses top level properties from provided data object to construct full nutrients array.
 * Supports api names as keys of the source object
 *
 * @param {Object} data Onyx nutrition label data
 * @returns {Array} Full nutrients array
 */
function convertOnyxToFullNutrientsArray(data) {
  const fullNutrients = [];

  _.forEach(onyxMapping, (onyxMapping, nutrientId) => {
    let value;

    if (typeof onyxMapping === 'function') {
      value = onyxMapping(data);
    } else {
      const facts = [].concat(_.get(data, 'Dietary.Facts') || [], _.get(data, 'Vitamineral.Facts') || []);
      let fact;

      for (let i = 0; i < onyxMapping.length; i += 1) {
        let factSearchKey   = Object.keys(onyxMapping[i])[0];
        let factSearchValue = Object.values(onyxMapping[i])[0].toLowerCase();

        fact = _.find(facts, (fact) => (_.get(fact, factSearchKey) || '').toString().toLowerCase() === factSearchValue);

        if (fact) {
          value = _.get(fact, 'Quantity');
          break;
        }
      }
    }

    if (!_.isUndefined(value)) {
      if (value !== null) {
        value = parseFloat(value);
      }

      fullNutrients.push({ attr_id: +nutrientId, value });
    }
  });

  return fullNutrients;
}

function convertCxhToFullNutrients(panel) {
  const cxhNutrientDetails = Array.isArray(panel) ? panel : panel.NutrientDetails;

  const fullNutrients = [];

  _.forEach(cxhMapping, (nutrientMapping) => {
    const cxhNutrientDetail = _.find(
      cxhNutrientDetails,
      (detail) => {
        if (detail.NutrientTypeCode && nutrientMapping.nutrientTypeCodes.includes(detail.NutrientTypeCode)) {
          return true;
        }

        return !!(detail.CustomNutrientName && nutrientMapping.customNutrientNames.includes(detail.CustomNutrientName));
      }
    );

    if (cxhNutrientDetail) {
      const nutrient = { attr_id: nutrientMapping.attrId };

      let value = _.get(cxhNutrientDetail, 'QuantityContained.Value');

      if (!_.isUndefined(cxhNutrientDetail.DailyValueIntakePercent)) {
        nutrient.dv = cxhNutrientDetail.DailyValueIntakePercent;

        if (_.isUndefined(value) && nutrientMapping.dailyValueIntake) {
          value = (cxhNutrientDetail.DailyValueIntakePercent / 100) * nutrientMapping.dailyValueIntake;
        }
      }

      if (!_.isUndefined(value)) {
        nutrient.value = value;
      }

      fullNutrients.push(nutrient);
    }
  });

  return fullNutrients;
}
