'use strict';

const chai   = require('chai');
const expect = chai.expect;
const food   = require('./food');
const FILE   = process.env.IGNORE_MINIFICATION ? '../src/' : '../dist/min/index';

const {
        nutrientsMap,
        fullNutrientsDefinitions,
        attrMap,
        convertV1ItemToTrackFood,
        buildFullNutrientsArray,
        convertFullNutrientsToNfAttributes,
        extendFullNutrientsWithMetaData,
        dailyValues,
        convertOnyxToFullNutrientsArray,
        convertCxhToFullNutrients
      } = require(FILE);


describe('convertV1ItemToTrackFood', () => {
  it('should return an object', () => {
    expect(convertV1ItemToTrackFood()).to.be.an('object');
  });
  it('should convert v1 fields', () => {
    expect(convertV1ItemToTrackFood({ item_name: 'override' }).food_name).to.equal('override');
  });
  it('should take into account defaults', () => {
    expect(convertV1ItemToTrackFood(food, { upc: 100 }).upc).to.equal(100);
  });
  it('should intelligently merge full nutrients', () => {
    let res = convertV1ItemToTrackFood({ nf_cholesterol: 10, nf_calories: 100 }, {
      full_nutrients: [{
        attr_id: 208,
        value:   5
      }]
    });
    expect(res.full_nutrients.length).to.equal(2);
    let calFN = res.full_nutrients.filter(x => x.attr_id === 208)[0];
    expect(calFN.value).to.equal(5);
  });
  it('should correctly map daily value fields', () => {
    let input = { nf_iron_dv: 50 };
    expect(convertV1ItemToTrackFood(input).full_nutrients.filter(v => v.attr_id === 303)[0].value).to.equal(0.18 * input.nf_iron_dv);
  });
  it('should correctly map defaults for serving & unit', () => {
    let input  = {
      nf_serving_size_qty: null,
      nf_serving_unit:     ''
    };
    let result = convertV1ItemToTrackFood(input);
    expect(result.serving_qty).to.equal(1);
    expect(result.serving_unit).to.equal('serving');
  });
  it('should duplicate fields for food_name and nix_item_name', () => {
    let input = {
      item_name:  'itemName',
      brand_name: 'brandName'
    };
    let res   = convertV1ItemToTrackFood(input);
    expect(res.nix_item_name).to.equal(input.item_name);
    expect(res.food_name).to.equal(input.item_name);
    expect(res.nix_brand_name).to.equal(input.brand_name);
    expect(res.brand_name).to.equal(input.brand_name);
  });
});

describe('buildFullNutrientsArray', () => {
  it('should return an object', () => {
    expect(buildFullNutrientsArray(food)).to.be.an('array');
  });
  it('should build from nf fields', () => {
    let built = buildFullNutrientsArray({ nf_calories: 10 })[0];
    expect(built.value).to.equal(10);
    expect(built.attr_id).to.equal(208);
  });
});

describe('convertFullNutrientsToNfAttributes', () => {
  it('should return an object', () => {
    expect(convertFullNutrientsToNfAttributes(food.full_nutrients)).to.be.an('object');
  });
  it('should construct the correct fields', () => {
    const built = convertFullNutrientsToNfAttributes([
      { attr_id: 208, value: 10 },
      { attr_id: 328, value: 11 },
      { attr_id: 301, value: 1300 },
      { attr_id: 303, value: 18 },
    ]);

    expect(built.nf_calories).to.equal(10);
    expect(built.nf_vitamin_d_mcg).to.equal(11);
    expect(built.nf_calcium_mg).to.equal(1300);
    expect(built.nf_calcium_dv).to.equal(100);
    expect(built.nf_iron_dv).to.equal(100);
    expect(built.nf_iron_mg).to.equal(18);
  });
  it('should correctly calculate daily values', () => {
    let built = convertFullNutrientsToNfAttributes([{ attr_id: 401, value: 10 }]);
    expect(built.nf_vitamin_c_dv).to.equal(10 / 60 * 100);
  });
});

describe('extendFullNutrientsWithMetaData', () => {
  it('should return an object', () => {
    expect(extendFullNutrientsWithMetaData(food.full_nutrients)).to.be.an('array');
  });
  it('should extend with correct fields', () => {
    let built = extendFullNutrientsWithMetaData([{ attr_id: 208, value: 10 }])[0];
    expect(built.name).to.equal('Energy');
    expect(built.usda_tag).to.equal('ENERC_KCAL');
    expect(built.unit).to.equal('kcal');
  });
});

describe('convertOnyxToFullNutrientsArray', () => {
  it('should return an expected array', () => {
    const intakeResult     = convertOnyxToFullNutrientsArray(require('./intake_nutrition_panel'));
    const itemMasterResult = convertOnyxToFullNutrientsArray(require('./itemmaster_nutrition_panel'));

    const sorter = (a, b) => a.attr_id - b.attr_id;

    expect(intakeResult.sort(sorter)).to.deep.equal([
      { attr_id: 204, value: 1 },
      { attr_id: 606, value: 0.5 },
      { attr_id: 646, value: 0 },
      { attr_id: 645, value: 0 },
      { attr_id: 601, value: 0 },
      { attr_id: 307, value: 150 },
      { attr_id: 306, value: 45 },
      { attr_id: 205, value: 25 },
      { attr_id: 291, value: 3 },
      { attr_id: 269, value: 10 },
      { attr_id: 203, value: 2 },
      { attr_id: 605, value: null },
      { attr_id: 208, value: 110 }
    ].sort(sorter));

    expect(itemMasterResult.sort(sorter)).to.deep.equal([
      { attr_id: 203, value: 1 },
      { attr_id: 204, value: 4 },
      { attr_id: 205, value: 3 },
      { attr_id: 208, value: 2 },
      { attr_id: 269, value: 3 },
      { attr_id: 291, value: 7 },
      { attr_id: 306, value: 2 },
      { attr_id: 307, value: 2 },
      { attr_id: 601, value: 3 },
      { attr_id: 605, value: 1 },
      { attr_id: 606, value: 2 },
      { attr_id: 645, value: 2.3 },
      { attr_id: 646, value: 2 }
    ].sort(sorter));
  });
});

describe('convertCxhToFullNutrientsArray', () => {
  it('should return an expected array', () => {
    const cxhResult = convertCxhToFullNutrients(require('./cxh_nutrient_panel'));

    const sorter = (a, b) => a.attr_id - b.attr_id;

    expect(cxhResult.sort(sorter)).to.deep.equal([
      { attr_id: 203, value: 2, dv: 0 },
      { attr_id: 204, value: 5, dv: 8 },
      { attr_id: 205, value: 19, dv: 6 },
      { attr_id: 208, value: 130 },
      { attr_id: 307, value: 300, dv: 13 },
      { attr_id: 601, value: 0, dv: 0 },
      { attr_id: 605, value: 0, dv: 0 },
      { attr_id: 606, value: 0.5, dv: 3 }
    ].sort(sorter));
  });
});

describe('conversion tests', () => {
  it('should convert nf_dietary_fiber back and forth', () => {
    const referenceData = { nf_dietary_fiber: 5 };

    expect(convertFullNutrientsToNfAttributes(buildFullNutrientsArray({ nf_dietary_fiber: 5 })))
      .to.deep.equal(referenceData);
  });
});
