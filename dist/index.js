(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nutritionixApiDataUtilities = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var fullNutrientsDefinitions = {
  '203': { attr_id: 203, name: 'Protein', unit: 'g', usda_tag: 'PROCNT' },
  '204': {
    attr_id: 204,
    name: 'Total lipid (fat)',
    unit: 'g',
    usda_tag: 'FAT'
  },
  '205': {
    attr_id: 205,
    name: 'Carbohydrate, by difference',
    unit: 'g',
    usda_tag: 'CHOCDF'
  },
  '207': { attr_id: 207, name: 'Ash', unit: 'g', usda_tag: 'ASH' },
  '208': {
    attr_id: 208,
    name: 'Energy',
    unit: 'kcal',
    usda_tag: 'ENERC_KCAL'
  },
  '209': { attr_id: 209, name: 'Starch', unit: 'g', usda_tag: 'STARCH' },
  '210': { attr_id: 210, name: 'Sucrose', unit: 'g', usda_tag: 'SUCS' },
  '211': {
    attr_id: 211,
    name: 'Glucose (dextrose)',
    unit: 'g',
    usda_tag: 'GLUS'
  },
  '212': { attr_id: 212, name: 'Fructose', unit: 'g', usda_tag: 'FRUS' },
  '213': { attr_id: 213, name: 'Lactose', unit: 'g', usda_tag: 'LACS' },
  '214': { attr_id: 214, name: 'Maltose', unit: 'g', usda_tag: 'MALS' },
  '221': {
    attr_id: 221,
    name: 'Alcohol, ethyl',
    unit: 'g',
    usda_tag: 'ALC'
  },
  '255': { attr_id: 255, name: 'Water', unit: 'g', usda_tag: 'WATER' },
  '257': {
    attr_id: 257,
    name: 'Adjusted Protein',
    unit: 'g',
    usda_tag: ''
  },
  '262': { attr_id: 262, name: 'Caffeine', unit: 'mg', usda_tag: 'CAFFN' },
  '263': {
    attr_id: 263,
    name: 'Theobromine',
    unit: 'mg',
    usda_tag: 'THEBRN'
  },
  '268': { attr_id: 268, name: 'Energy', unit: 'kJ', usda_tag: 'ENERC_KJ' },
  '269': {
    attr_id: 269,
    name: 'Sugars, total',
    unit: 'g',
    usda_tag: 'SUGAR'
  },
  '287': { attr_id: 287, name: 'Galactose', unit: 'g', usda_tag: 'GALS' },
  '291': {
    attr_id: 291,
    name: 'Fiber, total dietary',
    unit: 'g',
    usda_tag: 'FIBTG'
  },
  '301': { attr_id: 301, name: 'Calcium, Ca', unit: 'mg', usda_tag: 'CA' },
  '303': { attr_id: 303, name: 'Iron, Fe', unit: 'mg', usda_tag: 'FE' },
  '304': {
    attr_id: 304,
    name: 'Magnesium, Mg',
    unit: 'mg',
    usda_tag: 'MG'
  },
  '305': { attr_id: 305, name: 'Phosphorus, P', unit: 'mg', usda_tag: 'P' },
  '306': { attr_id: 306, name: 'Potassium, K', unit: 'mg', usda_tag: 'K' },
  '307': { attr_id: 307, name: 'Sodium, Na', unit: 'mg', usda_tag: 'NA' },
  '309': { attr_id: 309, name: 'Zinc, Zn', unit: 'mg', usda_tag: 'ZN' },
  '312': { attr_id: 312, name: 'Copper, Cu', unit: 'mg', usda_tag: 'CU' },
  '313': { attr_id: 313, name: 'Fluoride, F', unit: 'µg', usda_tag: 'FLD' },
  '315': {
    attr_id: 315,
    name: 'Manganese, Mn',
    unit: 'mg',
    usda_tag: 'MN'
  },
  '317': { attr_id: 317, name: 'Selenium, Se', unit: 'µg', usda_tag: 'SE' },
  '318': {
    attr_id: 318,
    name: 'Vitamin A, IU',
    unit: 'IU',
    usda_tag: 'VITA_IU'
  },
  '319': { attr_id: 319, name: 'Retinol', unit: 'µg', usda_tag: 'RETOL' },
  '320': {
    attr_id: 320,
    name: 'Vitamin A, RAE',
    unit: 'µg',
    usda_tag: 'VITA_RAE'
  },
  '321': {
    attr_id: 321,
    name: 'Carotene, beta',
    unit: 'µg',
    usda_tag: 'CARTB'
  },
  '322': {
    attr_id: 322,
    name: 'Carotene, alpha',
    unit: 'µg',
    usda_tag: 'CARTA'
  },
  '323': {
    attr_id: 323,
    name: 'Vitamin E (alpha-tocopherol)',
    unit: 'mg',
    usda_tag: 'TOCPHA'
  },
  '324': { attr_id: 324, name: 'Vitamin D', unit: 'IU', usda_tag: 'VITD' },
  '325': {
    attr_id: 325,
    name: 'Vitamin D2 (ergocalciferol)',
    unit: 'µg',
    usda_tag: 'ERGCAL'
  },
  '326': {
    attr_id: 326,
    name: 'Vitamin D3 (cholecalciferol)',
    unit: 'µg',
    usda_tag: 'CHOCAL'
  },
  '328': {
    attr_id: 328,
    name: 'Vitamin D (D2 + D3)',
    unit: 'µg',
    usda_tag: 'VITD'
  },
  '334': {
    attr_id: 334,
    name: 'Cryptoxanthin, beta',
    unit: 'µg',
    usda_tag: 'CRYPX'
  },
  '337': { attr_id: 337, name: 'Lycopene', unit: 'µg', usda_tag: 'LYCPN' },
  '338': {
    attr_id: 338,
    name: 'Lutein + zeaxanthin',
    unit: 'µg',
    usda_tag: 'LUT+ZEA'
  },
  '341': {
    attr_id: 341,
    name: 'Tocopherol, beta',
    unit: 'mg',
    usda_tag: 'TOCPHB'
  },
  '342': {
    attr_id: 342,
    name: 'Tocopherol, gamma',
    unit: 'mg',
    usda_tag: 'TOCPHG'
  },
  '343': {
    attr_id: 343,
    name: 'Tocopherol, delta',
    unit: 'mg',
    usda_tag: 'TOCPHD'
  },
  '401': {
    attr_id: 401,
    name: 'Vitamin C, total ascorbic acid',
    unit: 'mg',
    usda_tag: 'VITC'
  },
  '404': { attr_id: 404, name: 'Thiamin', unit: 'mg', usda_tag: 'THIA' },
  '405': { attr_id: 405, name: 'Riboflavin', unit: 'mg', usda_tag: 'RIBF' },
  '406': { attr_id: 406, name: 'Niacin', unit: 'mg', usda_tag: 'NIA' },
  '410': {
    attr_id: 410,
    name: 'Pantothenic acid',
    unit: 'mg',
    usda_tag: 'PANTAC'
  },
  '415': {
    attr_id: 415,
    name: 'Vitamin B-6',
    unit: 'mg',
    usda_tag: 'VITB6A'
  },
  '417': {
    attr_id: 417,
    name: 'Folate, total',
    unit: 'µg',
    usda_tag: 'FOL'
  },
  '418': {
    attr_id: 418,
    name: 'Vitamin B-12',
    unit: 'µg',
    usda_tag: 'VITB12'
  },
  '421': {
    attr_id: 421,
    name: 'Choline, total',
    unit: 'mg',
    usda_tag: 'CHOLN'
  },
  '428': {
    attr_id: 428,
    name: 'Menaquinone-4',
    unit: 'µg',
    usda_tag: 'MK4'
  },
  '429': {
    attr_id: 429,
    name: 'Dihydrophylloquinone',
    unit: 'µg',
    usda_tag: 'VITK1D'
  },
  '430': {
    attr_id: 430,
    name: 'Vitamin K (phylloquinone)',
    unit: 'µg',
    usda_tag: 'VITK1'
  },
  '431': {
    attr_id: 431,
    name: 'Folic acid',
    unit: 'µg',
    usda_tag: 'FOLAC'
  },
  '432': {
    attr_id: 432,
    name: 'Folate, food',
    unit: 'µg',
    usda_tag: 'FOLFD'
  },
  '435': {
    attr_id: 435,
    name: 'Folate, DFE',
    unit: 'µg',
    usda_tag: 'FOLDFE'
  },
  '454': { attr_id: 454, name: 'Betaine', unit: 'mg', usda_tag: 'BETN' },
  '501': { attr_id: 501, name: 'Tryptophan', unit: 'g', usda_tag: 'TRP_G' },
  '502': { attr_id: 502, name: 'Threonine', unit: 'g', usda_tag: 'THR_G' },
  '503': { attr_id: 503, name: 'Isoleucine', unit: 'g', usda_tag: 'ILE_G' },
  '504': { attr_id: 504, name: 'Leucine', unit: 'g', usda_tag: 'LEU_G' },
  '505': { attr_id: 505, name: 'Lysine', unit: 'g', usda_tag: 'LYS_G' },
  '506': { attr_id: 506, name: 'Methionine', unit: 'g', usda_tag: 'MET_G' },
  '507': { attr_id: 507, name: 'Cystine', unit: 'g', usda_tag: 'CYS_G' },
  '508': {
    attr_id: 508,
    name: 'Phenylalanine',
    unit: 'g',
    usda_tag: 'PHE_G'
  },
  '509': { attr_id: 509, name: 'Tyrosine', unit: 'g', usda_tag: 'TYR_G' },
  '510': { attr_id: 510, name: 'Valine', unit: 'g', usda_tag: 'VAL_G' },
  '511': { attr_id: 511, name: 'Arginine', unit: 'g', usda_tag: 'ARG_G' },
  '512': {
    attr_id: 512,
    name: 'Histidine',
    unit: 'g',
    usda_tag: 'HISTN_G'
  },
  '513': { attr_id: 513, name: 'Alanine', unit: 'g', usda_tag: 'ALA_G' },
  '514': {
    attr_id: 514,
    name: 'Aspartic acid',
    unit: 'g',
    usda_tag: 'ASP_G'
  },
  '515': {
    attr_id: 515,
    name: 'Glutamic acid',
    unit: 'g',
    usda_tag: 'GLU_G'
  },
  '516': { attr_id: 516, name: 'Glycine', unit: 'g', usda_tag: 'GLY_G' },
  '517': { attr_id: 517, name: 'Proline', unit: 'g', usda_tag: 'PRO_G' },
  '518': { attr_id: 518, name: 'Serine', unit: 'g', usda_tag: 'SER_G' },
  '521': {
    attr_id: 521,
    name: 'Hydroxyproline',
    unit: 'g',
    usda_tag: 'HYP'
  },
  '573': {
    attr_id: 573,
    name: 'Vitamin E, added',
    unit: 'mg',
    usda_tag: ''
  },
  '578': {
    attr_id: 578,
    name: 'Vitamin B-12, added',
    unit: 'µg',
    usda_tag: ''
  },
  '601': {
    attr_id: 601,
    name: 'Cholesterol',
    unit: 'mg',
    usda_tag: 'CHOLE'
  },
  '605': {
    attr_id: 605,
    name: 'Fatty acids, total trans',
    unit: 'g',
    usda_tag: 'FATRN'
  },
  '606': {
    attr_id: 606,
    name: 'Fatty acids, total saturated',
    unit: 'g',
    usda_tag: 'FASAT'
  },
  '607': { attr_id: 607, name: '4:0', unit: 'g', usda_tag: 'F4D0' },
  '608': { attr_id: 608, name: '6:0', unit: 'g', usda_tag: 'F6D0' },
  '609': { attr_id: 609, name: '8:0', unit: 'g', usda_tag: 'F8D0' },
  '610': { attr_id: 610, name: '10:0', unit: 'g', usda_tag: 'F10D0' },
  '611': { attr_id: 611, name: '12:0', unit: 'g', usda_tag: 'F12D0' },
  '612': { attr_id: 612, name: '14:0', unit: 'g', usda_tag: 'F14D0' },
  '613': { attr_id: 613, name: '16:0', unit: 'g', usda_tag: 'F16D0' },
  '614': { attr_id: 614, name: '18:0', unit: 'g', usda_tag: 'F18D0' },
  '615': { attr_id: 615, name: '20:0', unit: 'g', usda_tag: 'F20D0' },
  '617': {
    attr_id: 617,
    name: '18:1 undifferentiated',
    unit: 'g',
    usda_tag: 'F18D1'
  },
  '618': {
    attr_id: 618,
    name: '18:2 undifferentiated',
    unit: 'g',
    usda_tag: 'F18D2'
  },
  '619': {
    attr_id: 619,
    name: '18:3 undifferentiated',
    unit: 'g',
    usda_tag: 'F18D3'
  },
  '620': {
    attr_id: 620,
    name: '20:4 undifferentiated',
    unit: 'g',
    usda_tag: 'F20D4'
  },
  '621': {
    attr_id: 621,
    name: '22:6 n-3 (DHA)',
    unit: 'g',
    usda_tag: 'F22D6'
  },
  '624': { attr_id: 624, name: '22:0', unit: 'g', usda_tag: 'F22D0' },
  '625': { attr_id: 625, name: '14:1', unit: 'g', usda_tag: 'F14D1' },
  '626': {
    attr_id: 626,
    name: '16:1 undifferentiated',
    unit: 'g',
    usda_tag: 'F16D1'
  },
  '627': { attr_id: 627, name: '18:4', unit: 'g', usda_tag: 'F18D4' },
  '628': { attr_id: 628, name: '20:1', unit: 'g', usda_tag: 'F20D1' },
  '629': {
    attr_id: 629,
    name: '20:5 n-3 (EPA)',
    unit: 'g',
    usda_tag: 'F20D5'
  },
  '630': {
    attr_id: 630,
    name: '22:1 undifferentiated',
    unit: 'g',
    usda_tag: 'F22D1'
  },
  '631': {
    attr_id: 631,
    name: '22:5 n-3 (DPA)',
    unit: 'g',
    usda_tag: 'F22D5'
  },
  '636': {
    attr_id: 636,
    name: 'Phytosterols',
    unit: 'mg',
    usda_tag: 'PHYSTR'
  },
  '638': {
    attr_id: 638,
    name: 'Stigmasterol',
    unit: 'mg',
    usda_tag: 'STID7'
  },
  '639': {
    attr_id: 639,
    name: 'Campesterol',
    unit: 'mg',
    usda_tag: 'CAMD5'
  },
  '641': {
    attr_id: 641,
    name: 'Beta-sitosterol',
    unit: 'mg',
    usda_tag: 'SITSTR'
  },
  '645': {
    attr_id: 645,
    name: 'Fatty acids, total monounsaturated',
    unit: 'g',
    usda_tag: 'FAMS'
  },
  '646': {
    attr_id: 646,
    name: 'Fatty acids, total polyunsaturated',
    unit: 'g',
    usda_tag: 'FAPU'
  },
  '652': { attr_id: 652, name: '15:0', unit: 'g', usda_tag: 'F15D0' },
  '653': { attr_id: 653, name: '17:0', unit: 'g', usda_tag: 'F17D0' },
  '654': { attr_id: 654, name: '24:0', unit: 'g', usda_tag: 'F24D0' },
  '662': { attr_id: 662, name: '16:1 t', unit: 'g', usda_tag: 'F16D1T' },
  '663': { attr_id: 663, name: '18:1 t', unit: 'g', usda_tag: 'F18D1T' },
  '664': { attr_id: 664, name: '22:1 t', unit: 'g', usda_tag: '' },
  '665': {
    attr_id: 665,
    name: '18:2 t not further defined',
    unit: 'g',
    usda_tag: ''
  },
  '666': { attr_id: 666, name: '18:2 i', unit: 'g', usda_tag: '' },
  '669': { attr_id: 669, name: '18:2 t,t', unit: 'g', usda_tag: 'F18D2TT' },
  '670': {
    attr_id: 670,
    name: '18:2 CLAs',
    unit: 'g',
    usda_tag: 'F18D2CLA'
  },
  '671': { attr_id: 671, name: '24:1 c', unit: 'g', usda_tag: 'F24D1C' },
  '672': {
    attr_id: 672,
    name: '20:2 n-6 c,c',
    unit: 'g',
    usda_tag: 'F20D2CN6'
  },
  '673': { attr_id: 673, name: '16:1 c', unit: 'g', usda_tag: 'F16D1C' },
  '674': { attr_id: 674, name: '18:1 c', unit: 'g', usda_tag: 'F18D1C' },
  '675': {
    attr_id: 675,
    name: '18:2 n-6 c,c',
    unit: 'g',
    usda_tag: 'F18D2CN6'
  },
  '676': { attr_id: 676, name: '22:1 c', unit: 'g', usda_tag: '' },
  '685': {
    attr_id: 685,
    name: '18:3 n-6 c,c,c',
    unit: 'g',
    usda_tag: 'F18D3CN6'
  },
  '687': { attr_id: 687, name: '17:1', unit: 'g', usda_tag: 'F17D1' },
  '689': {
    attr_id: 689,
    name: '20:3 undifferentiated',
    unit: 'g',
    usda_tag: 'F20D3'
  },
  '693': {
    attr_id: 693,
    name: 'Fatty acids, total trans-monoenoic',
    unit: 'g',
    usda_tag: 'FATRNM'
  },
  '695': {
    attr_id: 695,
    name: 'Fatty acids, total trans-polyenoic',
    unit: 'g',
    usda_tag: 'FATRNP'
  },
  '696': { attr_id: 696, name: '13:0', unit: 'g', usda_tag: 'F13D0' },
  '697': { attr_id: 697, name: '15:1', unit: 'g', usda_tag: 'F15D1' },
  '851': {
    attr_id: 851,
    name: '18:3 n-3 c,c,c (ALA)',
    unit: 'g',
    usda_tag: 'F18D3CN3'
  },
  '852': { attr_id: 852, name: '20:3 n-3', unit: 'g', usda_tag: 'F20D3N3' },
  '853': { attr_id: 853, name: '20:3 n-6', unit: 'g', usda_tag: 'F20D3N6' },
  '855': { attr_id: 855, name: '20:4 n-6', unit: 'g', usda_tag: 'F20D4N6' },
  '856': { attr_id: 856, name: '18:3i', unit: 'g', usda_tag: '' },
  '857': { attr_id: 857, name: '21:5', unit: 'g', usda_tag: 'F21D5' },
  '858': { attr_id: 858, name: '22:4', unit: 'g', usda_tag: 'F22D4' },
  '859': {
    attr_id: 859,
    name: '18:1-11t (18:1t n-7)',
    unit: 'g',
    usda_tag: 'F18D1TN7'
  }
};

var nutrientsMap = {
  nf_protein: fullNutrientsDefinitions['203'],
  nf_total_fat: fullNutrientsDefinitions['204'],
  nf_total_carbohydrate: fullNutrientsDefinitions['205'],
  nf_ash: fullNutrientsDefinitions['207'],
  nf_calories: fullNutrientsDefinitions['208'],
  nf_starch: fullNutrientsDefinitions['209'],
  nf_sucs: fullNutrientsDefinitions['210'],
  nf_glus: fullNutrientsDefinitions['211'],
  nf_frus: fullNutrientsDefinitions['212'],
  nf_lacs: fullNutrientsDefinitions['213'],
  nf_mals: fullNutrientsDefinitions['214'],
  nf_alc: fullNutrientsDefinitions['221'],
  nf_water: fullNutrientsDefinitions['255'],
  NULL: fullNutrientsDefinitions['859'],
  nf_caffn: fullNutrientsDefinitions['262'],
  nf_thebrn: fullNutrientsDefinitions['263'],
  nf_enerc_kj: fullNutrientsDefinitions['268'],
  nf_sugars: fullNutrientsDefinitions['269'],
  nf_gals: fullNutrientsDefinitions['287'],
  nf_dietary_fiber: fullNutrientsDefinitions['291'],
  nf_calcium_dv: fullNutrientsDefinitions['301'],
  nf_iron_dv: fullNutrientsDefinitions['303'],
  nf_mg: fullNutrientsDefinitions['304'],
  nf_p: fullNutrientsDefinitions['305'],
  nf_potassium: fullNutrientsDefinitions['306'],
  nf_sodium: fullNutrientsDefinitions['307'],
  nf_zn: fullNutrientsDefinitions['309'],
  nf_cu: fullNutrientsDefinitions['312'],
  nf_fld: fullNutrientsDefinitions['313'],
  nf_mn: fullNutrientsDefinitions['315'],
  nf_se: fullNutrientsDefinitions['317'],
  nf_vitamin_a_dv: fullNutrientsDefinitions['318'],
  nf_retol: fullNutrientsDefinitions['319'],
  nf_vitamin_c_dv: fullNutrientsDefinitions['401'],
  nf_vitamin_d_dv: fullNutrientsDefinitions['324'],
  nf_cholesterol: fullNutrientsDefinitions['601'],
  nf_trans_fatty_acid: fullNutrientsDefinitions['605'],
  nf_saturated_fat: fullNutrientsDefinitions['606'],
  nf_monounsaturated_fat: fullNutrientsDefinitions['645'],
  nf_polyunsaturated_fat: fullNutrientsDefinitions['646']
};

var attrMap = {
  '203': 'nf_protein',
  '204': 'nf_total_fat',
  '205': 'nf_total_carbohydrate',
  '207': 'nf_ash',
  '208': 'nf_calories',
  '209': 'nf_starch',
  '210': 'nf_sucs',
  '211': 'nf_glus',
  '212': 'nf_frus',
  '213': 'nf_lacs',
  '214': 'nf_mals',
  '221': 'nf_alc',
  '255': 'nf_water',
  '262': 'nf_caffn',
  '263': 'nf_thebrn',
  '268': 'nf_enerc_kj',
  '269': 'nf_sugars',
  '287': 'nf_gals',
  '291': 'nf_dietary_fiber',
  '301': 'nf_calcium_dv',
  '303': 'nf_iron_dv',
  '304': 'nf_mg',
  '305': 'nf_p',
  '306': 'nf_potassium',
  '307': 'nf_sodium',
  '309': 'nf_zn',
  '312': 'nf_cu',
  '313': 'nf_fld',
  '315': 'nf_mn',
  '317': 'nf_se',
  '318': 'nf_vitamin_a_dv',
  '319': 'nf_retol',
  '324': 'nf_vitamin_d_dv',
  '401': 'nf_vitamin_c_dv',
  '601': 'nf_cholesterol',
  '605': 'nf_trans_fatty_acid',
  '606': 'nf_saturated_fat',
  '645': 'nf_monounsaturated_fat',
  '646': 'nf_polyunsaturated_fat',
  '859': 'NULL'
};

var baseTrackObj = {
  metadata: {},
  food_name: undefined,
  brand_name: null,
  serving_qty: 1,
  serving_unit: 'serving',
  serving_weight_grams: null,
  nf_calories: null,
  nf_total_fat: null,
  nf_saturated_fat: null,
  nf_cholesterol: null,
  nf_sodium: null,
  nf_total_carbohydrate: null,
  nf_dietary_fiber: null,
  nf_sugars: null,
  nf_protein: null,
  nf_potassium: null,
  nf_p: null,
  full_nutrients: [],
  created_at: undefined,
  consumed_at: undefined,
  nix_brand_name: null,
  nix_brand_id: null,
  nix_item_name: null,
  nix_item_id: null,
  upc: null,
  source: 8,
  ndb_no: null,
  natural_query_id: null,
  tags: null,
  photo: null,
  lat: null,
  lng: null,
  note: null,
  alt_measures: null
};

var dailyValueTransforms = {
  //vitamin_a_dv
  318: 5000,
  //vitamin_c_dv
  401: 60,
  //calcium_dv
  301: 1000,
  //iron_dv
  303: 18,
  //vitam_d_dv
  324: 400
};

module.exports = {
  nutrientsMap: nutrientsMap,
  fullNutrientsDefinitions: fullNutrientsDefinitions,
  attrMap: attrMap,
  baseTrackObj: baseTrackObj,
  dailyValueTransforms: dailyValueTransforms
};

},{}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _ = require('./utils');

var _require = require('./artifacts.js'),
    nutrientsMap = _require.nutrientsMap,
    fullNutrientsDefinitions = _require.fullNutrientsDefinitions,
    attrMap = _require.attrMap,
    baseTrackObj = _require.baseTrackObj,
    dailyValueTransforms = _require.dailyValueTransforms;

/**
 * @license MIT
 * @version 1.3.0
 * @author Yura Fedoriv <yurko.fedoriv@gmail.com>
 *
 * @description
 * Utilities to handle different data formats in Nutritionix APIs
 */


module.exports = {
  nutrientsMap: nutrientsMap,
  fullNutrientsDefinitions: fullNutrientsDefinitions,
  attrMap: attrMap,
  convertV1ItemToTrackFood: convertV1ItemToTrackFood,
  buildFullNutrientsArray: buildFullNutrientsArray,
  convertFullNutrientsToNfAttributes: convertFullNutrientsToNfAttributes,
  extendFullNutrientsWithMetaData: extendFullNutrientsWithMetaData
};

var v1TypeAliases = {
  item_name: ['food_name', 'nix_item_name'],
  nf_serving_size_qty: ['serving_qty'],
  nf_serving_size_unit: ['serving_unit'],
  nf_serving_weight_grams: ['serving_weight_grams'],
  item_id: ['nix_item_id'],
  brand_name: ['nix_brand_name', 'brand_name'],
  brand_id: ['nix_brand_id']
};

function hasItems(test) {
  return Array.isArray(test) && test.length;
}

function optimisticallyMergeArrays(comparator) {
  var _ref;

  for (var _len = arguments.length, cols = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    cols[_key - 1] = arguments[_key];
  }

  var mergeCols = cols.filter(hasItems);
  //base cases
  if (!mergeCols.length) return [];
  if (mergeCols.length === 1) return mergeCols[0];

  var flat = (_ref = []).concat.apply(_ref, _toConsumableArray(mergeCols));
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
  v1Item = (typeof v1Item === 'undefined' ? 'undefined' : _typeof(v1Item)) === 'object' && v1Item !== null ? v1Item : {};
  defaultObj = (typeof defaultObj === 'undefined' ? 'undefined' : _typeof(defaultObj)) === 'object' && defaultObj !== null ? defaultObj : {};

  //build a full nutrient array from any 'nf' fields from the v1item;
  var v1FullNutrs = buildFullNutrientsArray(v1Item);

  //create an object with superset of keys, including both original and aliases fields for later picking.
  var mappedFields = _.reduce(v1Item, function (accum, val, key) {
    //either use array of aliases, or the key itself.
    var aliases = v1TypeAliases[key];
    if (aliases) {
      aliases.forEach(function (alias) {
        return accum[alias] = val;
      });
    } else {
      accum[key] = val;
    }
    return accum;
  }, {});

  //only include truthy fields that are track food object fields. Untruthy fields will be defaulted to the baseTrackObj value.
  var v1Defaults = _.pickBy(mappedFields, function (val, key) {
    return baseTrackObj.hasOwnProperty(key) && val;
  });

  //join the arrays, taking the defaultObj nutrients first (will be preferred in later uniq testing)
  var fullNutrArray = optimisticallyMergeArrays(function (nutr) {
    return nutr.attr_id;
  }, defaultObj.full_nutrients, v1FullNutrs);

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
  return _.reduce(nutrientsMap, function (accum, nutrDetails, v1AttrName) {
    if (data[v1AttrName]) {
      var value = parseFloat(data[v1AttrName]);
      if (!isNaN(value)) {
        var attr_id = nutrDetails.attr_id;
        //ensure that daily value measures are calculated into the appropriate units.
        if (dailyValueTransforms[attr_id]) {
          value = dailyValueTransforms[attr_id] / 100 * value;
        }
        //round to 4 decimal places
        value = parseFloat(value.toFixed(4));
        accum.push({
          attr_id: nutrDetails.attr_id,
          value: value
        });
      }
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
  return _.reduce(fullNutrients, function (accum, val) {
    var nfKey = attrMap[val.attr_id];
    if (nfKey) {
      var transformVal = dailyValueTransforms[val.attr_id];
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
  return fullNutrients.map(function (nutr) {
    //found matching nutrient, extend.
    var nutrDefMatch = fullNutrientsDefinitions[nutr.attr_id];
    if (nutrDefMatch) {
      return _.defaults(nutr, nutrDefMatch);
    } else {
      return nutr;
      //no match, return base.
    }
  });
}

},{"./artifacts.js":1,"./utils":3}],3:[function(require,module,exports){
'use strict';

module.exports = {
  defaults: defaults,
  mapKeys: mapKeys,
  reduce: reduce,
  uniqBy: uniqBy,
  keys: keys,
  pickBy: pickBy
};

function defaults(source) {
  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  var _loop = function _loop(i) {
    Object.keys(rest[i]).forEach(function (key) {
      if (source[key] === undefined) {
        source[key] = rest[i][key];
      }
    });
  };

  for (var i = 0; i < rest.length; i++) {
    _loop(i);
  }
  return source;
}

function mapKeys(obj, fnc) {
  var returnObj = {};
  Object.keys(obj).forEach(function (key) {
    var newKey = fnc(obj[key], key, obj);
    returnObj[newKey] = obj[key];
  });
  return returnObj;
}

function reduce(collection, fn, accum) {
  var isArr = Array.isArray(collection);
  var hasAccumulator = arguments.length >= 3;
  var result = accum;

  // bind new iterator fn to collection & accum
  function iterator(item, idxOrKey) {
    if (!hasAccumulator) {
      result = item;
      hasAccumulator = true;
    } else {
      result = fn(result, item, idxOrKey, collection);
    }
  }

  if (isArr) {
    for (var i = 0; i < collection.length; i++) {
      iterator(collection[i], i);
    }
  } else {
    var _keys = Object.keys(collection);
    for (var i = 0; i < _keys.length; i++) {
      var val = collection[_keys[i]];
      iterator(val, _keys[i]);
    }
  }
  return result;
}

function uniqBy(array, comparator) {
  var uniqKeys = {};
  var result = [];

  array.forEach(function (item) {
    var keyTest = comparator(item);
    if (!uniqKeys[keyTest]) {
      uniqKeys[keyTest] = true;
      result.push(item);
    }
  });

  return result;
}

function keys(obj) {
  var ownKeys = [];
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) ownKeys.push(prop);
  }
  return ownKeys;
}

function pickBy(obj, predicate) {
  predicate = predicate || function (x) {
    return x;
  };
  var result = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      var shouldPick = predicate(obj[key], key);
      if (shouldPick) result[key] = obj[key];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}

},{}]},{},[2])(2)
});