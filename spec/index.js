'use strict';

const chai = require('chai');
const expect = chai.expect;
const food = require('./food');
const {
  nutrientsMap,
  fullNutrientsDefinitions,
  attrMap,
  convertV1ItemToTrackFood,
  buildFullNutrientsArray,
  convertFullNutrientsToNfAttributes,
  extendFullNutrientsWithMetaData
} = require('../src/index');


describe('convertV1ItemToTrackFood', () => {
  it('should return an object', () => {
    expect(convertV1ItemToTrackFood()).to.be.an('object');
  });
  it('should conver v1 fields', () => {
    expect(convertV1ItemToTrackFood({item_name: 'override'}).food_name).to.equal('override');
  });
  it('should take into account defaults', () => {
    expect(convertV1ItemToTrackFood(food, {upc: 100}).upc).to.equal(100);
  });
  it('should intelligently merge full nutrients', () => {
    let res = convertV1ItemToTrackFood({nf_cholesterol: 10, nf_calories: 100}, {full_nutrients: [{attr_id: 208, value: 5}]});
    expect(res.full_nutrients.length).to.equal(2);
    let calFN = res.full_nutrients.filter(x => x.attr_id === 208)[0];
    expect(calFN.value).to.equal(5);
  });
});

describe('buildFullNutrientsArray', () => {
  it('should return an object', () => {
    expect(buildFullNutrientsArray(food)).to.be.an('array');
  });
  it('should build from nf fields', () => {
    let built = buildFullNutrientsArray({nf_calories: 10})[0];
    expect(built.value).to.equal(10);
    expect(built.attr_id).to.equal(208);
  });
});

describe('convertFullNutrientsToNfAttributes', () => {
  it('should return an object', () => {
    expect(convertFullNutrientsToNfAttributes(food.full_nutrients)).to.be.an('object');
  });
  it('should construct the correct fields', () => {
    let built = convertFullNutrientsToNfAttributes([{attr_id: 208, value: 10}]);
    expect(built.nf_calories).to.equal(10);
  })
});

describe('extendFullNutrientsWithMetaData', () => {
  it('should return an object', () => {
    expect(extendFullNutrientsWithMetaData(food.full_nutrients)).to.be.an('array');
  });
  it('should extend with correct fields', () => {
    let built = extendFullNutrientsWithMetaData([{attr_id: 208, value: 10}])[0];
    expect(built.name).to.equal('Energy');
    expect(built.usda_tag).to.equal('ENERC_KCAL');
    expect(built.unit).to.equal('kcal');
  });
});
