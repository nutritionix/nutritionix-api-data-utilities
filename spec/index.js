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
    console.log(convertV1ItemToTrackFood(null, food) && null)
  });
});

describe('buildFullNutrientsArray', () => {
  it('should return an object', () => {
    expect(buildFullNutrientsArray(food)).to.be.an('array');
  });
});

describe('convertFullNutrientsToNfAttributes', () => {
  it('should return an object', () => {
    expect(convertFullNutrientsToNfAttributes(food.full_nutrients)).to.be.an('object');
  });
});

describe('extendFullNutrientsWithMetaData', () => {
  it('should return an object', () => {
    expect(extendFullNutrientsWithMetaData(food.full_nutrients)).to.be.an('array');
  });
});
