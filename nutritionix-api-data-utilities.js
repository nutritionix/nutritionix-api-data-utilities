/**
 * @license MIT
 * @version 1.2.0
 * @author Yura Fedoriv <yurko.fedoriv@gmail.com>
 *
 * @description
 * Utilities to handle different data formats in Nutritionix APIs
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.nutritionixApiDataUtilities = factory();
  }
}(this, function () {
  'use strict';

  var nutrientsMap = {
    "nf_protein":             {"attr_id": 203, "name": "Protein", "unit": "g", "usda_tag": "PROCNT"},
    "nf_total_fat":           {"attr_id": 204, "name": "Total lipid (fat)", "unit": "g", "usda_tag": "FAT"},
    "nf_total_carbohydrate":  {
      "attr_id":  205,
      "name":     "Carbohydrate, by difference",
      "unit":     "g",
      "usda_tag": "CHOCDF"
    },
    "nf_ash":                 {"attr_id": 207, "name": "Ash", "unit": "g", "usda_tag": "ASH"},
    "nf_calories":            {"attr_id": 208, "name": "Energy", "unit": "kcal", "usda_tag": "ENERC_KCAL"},
    "nf_starch":              {"attr_id": 209, "name": "Starch", "unit": "g", "usda_tag": "STARCH"},
    "nf_sucs":                {"attr_id": 210, "name": "Sucrose", "unit": "g", "usda_tag": "SUCS"},
    "nf_glus":                {"attr_id": 211, "name": "Glucose (dextrose)", "unit": "g", "usda_tag": "GLUS"},
    "nf_frus":                {"attr_id": 212, "name": "Fructose", "unit": "g", "usda_tag": "FRUS"},
    "nf_lacs":                {"attr_id": 213, "name": "Lactose", "unit": "g", "usda_tag": "LACS"},
    "nf_mals":                {"attr_id": 214, "name": "Maltose", "unit": "g", "usda_tag": "MALS"},
    "nf_alc":                 {"attr_id": 221, "name": "Alcohol, ethyl", "unit": "g", "usda_tag": "ALC"},
    "nf_water":               {"attr_id": 255, "name": "Water", "unit": "g", "usda_tag": "WATER"},
    "NULL":                   {
      "attr_id":  859,
      "name":     "18:1-11t (18:1t n-7)",
      "unit":     "g",
      "usda_tag": "F18D1TN7"
    },
    "nf_caffn":               {"attr_id": 262, "name": "Caffeine", "unit": "mg", "usda_tag": "CAFFN"},
    "nf_thebrn":              {"attr_id": 263, "name": "Theobromine", "unit": "mg", "usda_tag": "THEBRN"},
    "nf_enerc_kj":            {"attr_id": 268, "name": "Energy", "unit": "kJ", "usda_tag": "ENERC_KJ"},
    "nf_sugars":              {"attr_id": 269, "name": "Sugars, total", "unit": "g", "usda_tag": "SUGAR"},
    "nf_gals":                {"attr_id": 287, "name": "Galactose", "unit": "g", "usda_tag": "GALS"},
    "nf_dietary_fiber":       {
      "attr_id":  291,
      "name":     "Fiber, total dietary",
      "unit":     "g",
      "usda_tag": "FIBTG"
    },
    "nf_calcium_dv":          {"attr_id": 301, "name": "Calcium, Ca", "unit": "mg", "usda_tag": "CA"},
    "nf_iron_dv":             {"attr_id": 303, "name": "Iron, Fe", "unit": "mg", "usda_tag": "FE"},
    "nf_mg":                  {"attr_id": 304, "name": "Magnesium, Mg", "unit": "mg", "usda_tag": "MG"},
    "nf_p":                   {"attr_id": 305, "name": "Phosphorus, P", "unit": "mg", "usda_tag": "P"},
    "nf_potassium":           {"attr_id": 306, "name": "Potassium, K", "unit": "mg", "usda_tag": "K"},
    "nf_sodium":              {"attr_id": 307, "name": "Sodium, Na", "unit": "mg", "usda_tag": "NA"},
    "nf_zn":                  {"attr_id": 309, "name": "Zinc, Zn", "unit": "mg", "usda_tag": "ZN"},
    "nf_cu":                  {"attr_id": 312, "name": "Copper, Cu", "unit": "mg", "usda_tag": "CU"},
    "nf_fld":                 {"attr_id": 313, "name": "Fluoride, F", "unit": "\u00b5g", "usda_tag": "FLD"},
    "nf_mn":                  {"attr_id": 315, "name": "Manganese, Mn", "unit": "mg", "usda_tag": "MN"},
    "nf_se":                  {"attr_id": 317, "name": "Selenium, Se", "unit": "\u00b5g", "usda_tag": "SE"},
    "nf_vitamin_a_dv":        {"attr_id": 318, "name": "Vitamin A, IU", "unit": "IU", "usda_tag": "VITA_IU"},
    "nf_retol":               {"attr_id": 319, "name": "Retinol", "unit": "\u00b5g", "usda_tag": "RETOL"},
    "nf_vitamin_c_dv":        {
      "attr_id":  401,
      "name":     "Vitamin C, total ascorbic acid",
      "unit":     "mg",
      "usda_tag": "VITC"
    },
    "nf_cholesterol":         {"attr_id": 601, "name": "Cholesterol", "unit": "mg", "usda_tag": "CHOLE"},
    "nf_trans_fatty_acid":    {
      "attr_id":  605,
      "name":     "Fatty acids, total trans",
      "unit":     "g",
      "usda_tag": "FATRN"
    },
    "nf_saturated_fat":       {
      "attr_id":  606,
      "name":     "Fatty acids, total saturated",
      "unit":     "g",
      "usda_tag": "FASAT"
    },
    "nf_monounsaturated_fat": {
      "attr_id":  645,
      "name":     "Fatty acids, total monounsaturated",
      "unit":     "g",
      "usda_tag": "FAMS"
    },
    "nf_polyunsaturated_fat": {
      "attr_id":  646,
      "name":     "Fatty acids, total polyunsaturated",
      "unit":     "g",
      "usda_tag": "FAPU"
    }
  };

  /**
   *
   * @param {object} v1Item Api V1 Food object
   * @param {object} extraFields [OPTIONAL] Additional data object that is used as properties source.
   *                                        Use it to provide known properties that are missing in the original object
   * @returns {object} Track API food object
   */
  function convertV1ItemToTrackFood(v1Item, extraFields) {
    if (typeof v1Item !== 'object') {
      v1Item = {};
    }

    if (typeof extraFields !== 'object') {
      extraFields = {};
    }

    var food = {
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
      tags:                  null
    };

    for (var field in food) if (food.hasOwnProperty(field)) {
      if (field in v1Item) {
        food[field] = v1Item[field];
      }

      if (field in extraFields) {
        food[field] = extraFields[field];
      }

      if (field in convertV1ItemToTrackFood.mapping) {
        var mappedField = convertV1ItemToTrackFood.mapping[field];

        if (mappedField in v1Item) {
          food[field] = v1Item[mappedField];
        }

        if (mappedField in extraFields) {
          food[field] = extraFields[mappedField];
        }
      }
    }

    food.full_nutrients = buildFullNutrientsArray(v1Item);

    return food;
  }

  convertV1ItemToTrackFood.mapping = {
    food_name:            'item_name',
    serving_qty:          'nf_serving_size_qty',
    serving_unit:         'nf_serving_size_unit',
    serving_weight_grams: 'nf_serving_weight_grams',
    nix_item_id:          'item_id'
  };

  /**
   * Uses top level properties from provided data object to construct full nutrients array.
   * Supports api names and attr ids as keys of the source object
   *
   * @param {Object} data
   * @returns {Array} Full nutrients array
   */
  function buildFullNutrientsArray(data) {
    var apiName, nutrient, fullNutrients = [], value;

    for (apiName in nutrientsMap) if (nutrientsMap.hasOwnProperty(apiName)) {
      value = null;

      if (apiName in data && data[apiName] !== null) {
        value = data[apiName];
      } else if (nutrientsMap[apiName].attr_id in data && data[nutrientsMap[apiName].attr_id] !== null) {
        value = data[nutrientsMap[apiName].attr_id];
      }

      if (value !== null) {
        nutrient = JSON.parse(JSON.stringify(nutrientsMap[apiName]));
        nutrient.value = value;

        fullNutrients.push(nutrient);
      }
    }

    return fullNutrients;
  }

  /**
   * Generates object with top level nf_attributes from full_nuteients array
   * @param {Object[]} fullNutrients Full nutrients array
   * @returns {Object} Nf attributes object
   */
  function convertFullNutrientsToNfAttributes(fullNutrients) {
    var i, nutrient, apiName, nfAttributes = {};

    for (i = 0; i < fullNutrients.length; i += 1) {
      nutrient = fullNutrients[i];

      for (apiName in nutrientsMap) if (nutrientsMap.hasOwnProperty(apiName)) {
        if (nutrientsMap[apiName].attr_id === nutrient.attr_id) {
          nfAttributes[apiName] = nutrient.value;
        }
      }
    }

    return nfAttributes;
  }

  return {
    nutrientsMap:                       nutrientsMap,
    convertV1ItemToTrackFood:           convertV1ItemToTrackFood,
    buildFullNutrientsArray:            buildFullNutrientsArray,
    convertFullNutrientsToNfAttributes: convertFullNutrientsToNfAttributes
  };
}));
