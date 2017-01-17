'use strict';


  var fullNutrientsDefinitions = {
    '203': {attr_id: 203, name: 'Protein', unit: 'g', usda_tag: 'PROCNT'},
    '204': {
      attr_id:  204,
      name:     'Total lipid (fat)',
      unit:     'g',
      usda_tag: 'FAT'
    },
    '205': {
      attr_id:  205,
      name:     'Carbohydrate, by difference',
      unit:     'g',
      usda_tag: 'CHOCDF'
    },
    '207': {attr_id: 207, name: 'Ash', unit: 'g', usda_tag: 'ASH'},
    '208': {
      attr_id:  208,
      name:     'Energy',
      unit:     'kcal',
      usda_tag: 'ENERC_KCAL'
    },
    '209': {attr_id: 209, name: 'Starch', unit: 'g', usda_tag: 'STARCH'},
    '210': {attr_id: 210, name: 'Sucrose', unit: 'g', usda_tag: 'SUCS'},
    '211': {
      attr_id:  211,
      name:     'Glucose (dextrose)',
      unit:     'g',
      usda_tag: 'GLUS'
    },
    '212': {attr_id: 212, name: 'Fructose', unit: 'g', usda_tag: 'FRUS'},
    '213': {attr_id: 213, name: 'Lactose', unit: 'g', usda_tag: 'LACS'},
    '214': {attr_id: 214, name: 'Maltose', unit: 'g', usda_tag: 'MALS'},
    '221': {
      attr_id:  221,
      name:     'Alcohol, ethyl',
      unit:     'g',
      usda_tag: 'ALC'
    },
    '255': {attr_id: 255, name: 'Water', unit: 'g', usda_tag: 'WATER'},
    '257': {
      attr_id:  257,
      name:     'Adjusted Protein',
      unit:     'g',
      usda_tag: ''
    },
    '262': {attr_id: 262, name: 'Caffeine', unit: 'mg', usda_tag: 'CAFFN'},
    '263': {
      attr_id:  263,
      name:     'Theobromine',
      unit:     'mg',
      usda_tag: 'THEBRN'
    },
    '268': {attr_id: 268, name: 'Energy', unit: 'kJ', usda_tag: 'ENERC_KJ'},
    '269': {
      attr_id:  269,
      name:     'Sugars, total',
      unit:     'g',
      usda_tag: 'SUGAR'
    },
    '287': {attr_id: 287, name: 'Galactose', unit: 'g', usda_tag: 'GALS'},
    '291': {
      attr_id:  291,
      name:     'Fiber, total dietary',
      unit:     'g',
      usda_tag: 'FIBTG'
    },
    '301': {attr_id: 301, name: 'Calcium, Ca', unit: 'mg', usda_tag: 'CA'},
    '303': {attr_id: 303, name: 'Iron, Fe', unit: 'mg', usda_tag: 'FE'},
    '304': {
      attr_id:  304,
      name:     'Magnesium, Mg',
      unit:     'mg',
      usda_tag: 'MG'
    },
    '305': {attr_id: 305, name: 'Phosphorus, P', unit: 'mg', usda_tag: 'P'},
    '306': {attr_id: 306, name: 'Potassium, K', unit: 'mg', usda_tag: 'K'},
    '307': {attr_id: 307, name: 'Sodium, Na', unit: 'mg', usda_tag: 'NA'},
    '309': {attr_id: 309, name: 'Zinc, Zn', unit: 'mg', usda_tag: 'ZN'},
    '312': {attr_id: 312, name: 'Copper, Cu', unit: 'mg', usda_tag: 'CU'},
    '313': {attr_id: 313, name: 'Fluoride, F', unit: 'µg', usda_tag: 'FLD'},
    '315': {
      attr_id:  315,
      name:     'Manganese, Mn',
      unit:     'mg',
      usda_tag: 'MN'
    },
    '317': {attr_id: 317, name: 'Selenium, Se', unit: 'µg', usda_tag: 'SE'},
    '318': {
      attr_id:  318,
      name:     'Vitamin A, IU',
      unit:     'IU',
      usda_tag: 'VITA_IU'
    },
    '319': {attr_id: 319, name: 'Retinol', unit: 'µg', usda_tag: 'RETOL'},
    '320': {
      attr_id:  320,
      name:     'Vitamin A, RAE',
      unit:     'µg',
      usda_tag: 'VITA_RAE'
    },
    '321': {
      attr_id:  321,
      name:     'Carotene, beta',
      unit:     'µg',
      usda_tag: 'CARTB'
    },
    '322': {
      attr_id:  322,
      name:     'Carotene, alpha',
      unit:     'µg',
      usda_tag: 'CARTA'
    },
    '323': {
      attr_id:  323,
      name:     'Vitamin E (alpha-tocopherol)',
      unit:     'mg',
      usda_tag: 'TOCPHA'
    },
    '324': {attr_id: 324, name: 'Vitamin D', unit: 'IU', usda_tag: 'VITD'},
    '325': {
      attr_id:  325,
      name:     'Vitamin D2 (ergocalciferol)',
      unit:     'µg',
      usda_tag: 'ERGCAL'
    },
    '326': {
      attr_id:  326,
      name:     'Vitamin D3 (cholecalciferol)',
      unit:     'µg',
      usda_tag: 'CHOCAL'
    },
    '328': {
      attr_id:  328,
      name:     'Vitamin D (D2 + D3)',
      unit:     'µg',
      usda_tag: 'VITD'
    },
    '334': {
      attr_id:  334,
      name:     'Cryptoxanthin, beta',
      unit:     'µg',
      usda_tag: 'CRYPX'
    },
    '337': {attr_id: 337, name: 'Lycopene', unit: 'µg', usda_tag: 'LYCPN'},
    '338': {
      attr_id:  338,
      name:     'Lutein + zeaxanthin',
      unit:     'µg',
      usda_tag: 'LUT+ZEA'
    },
    '341': {
      attr_id:  341,
      name:     'Tocopherol, beta',
      unit:     'mg',
      usda_tag: 'TOCPHB'
    },
    '342': {
      attr_id:  342,
      name:     'Tocopherol, gamma',
      unit:     'mg',
      usda_tag: 'TOCPHG'
    },
    '343': {
      attr_id:  343,
      name:     'Tocopherol, delta',
      unit:     'mg',
      usda_tag: 'TOCPHD'
    },
    '401': {
      attr_id:  401,
      name:     'Vitamin C, total ascorbic acid',
      unit:     'mg',
      usda_tag: 'VITC'
    },
    '404': {attr_id: 404, name: 'Thiamin', unit: 'mg', usda_tag: 'THIA'},
    '405': {attr_id: 405, name: 'Riboflavin', unit: 'mg', usda_tag: 'RIBF'},
    '406': {attr_id: 406, name: 'Niacin', unit: 'mg', usda_tag: 'NIA'},
    '410': {
      attr_id:  410,
      name:     'Pantothenic acid',
      unit:     'mg',
      usda_tag: 'PANTAC'
    },
    '415': {
      attr_id:  415,
      name:     'Vitamin B-6',
      unit:     'mg',
      usda_tag: 'VITB6A'
    },
    '417': {
      attr_id:  417,
      name:     'Folate, total',
      unit:     'µg',
      usda_tag: 'FOL'
    },
    '418': {
      attr_id:  418,
      name:     'Vitamin B-12',
      unit:     'µg',
      usda_tag: 'VITB12'
    },
    '421': {
      attr_id:  421,
      name:     'Choline, total',
      unit:     'mg',
      usda_tag: 'CHOLN'
    },
    '428': {
      attr_id:  428,
      name:     'Menaquinone-4',
      unit:     'µg',
      usda_tag: 'MK4'
    },
    '429': {
      attr_id:  429,
      name:     'Dihydrophylloquinone',
      unit:     'µg',
      usda_tag: 'VITK1D'
    },
    '430': {
      attr_id:  430,
      name:     'Vitamin K (phylloquinone)',
      unit:     'µg',
      usda_tag: 'VITK1'
    },
    '431': {
      attr_id:  431,
      name:     'Folic acid',
      unit:     'µg',
      usda_tag: 'FOLAC'
    },
    '432': {
      attr_id:  432,
      name:     'Folate, food',
      unit:     'µg',
      usda_tag: 'FOLFD'
    },
    '435': {
      attr_id:  435,
      name:     'Folate, DFE',
      unit:     'µg',
      usda_tag: 'FOLDFE'
    },
    '454': {attr_id: 454, name: 'Betaine', unit: 'mg', usda_tag: 'BETN'},
    '501': {attr_id: 501, name: 'Tryptophan', unit: 'g', usda_tag: 'TRP_G'},
    '502': {attr_id: 502, name: 'Threonine', unit: 'g', usda_tag: 'THR_G'},
    '503': {attr_id: 503, name: 'Isoleucine', unit: 'g', usda_tag: 'ILE_G'},
    '504': {attr_id: 504, name: 'Leucine', unit: 'g', usda_tag: 'LEU_G'},
    '505': {attr_id: 505, name: 'Lysine', unit: 'g', usda_tag: 'LYS_G'},
    '506': {attr_id: 506, name: 'Methionine', unit: 'g', usda_tag: 'MET_G'},
    '507': {attr_id: 507, name: 'Cystine', unit: 'g', usda_tag: 'CYS_G'},
    '508': {
      attr_id:  508,
      name:     'Phenylalanine',
      unit:     'g',
      usda_tag: 'PHE_G'
    },
    '509': {attr_id: 509, name: 'Tyrosine', unit: 'g', usda_tag: 'TYR_G'},
    '510': {attr_id: 510, name: 'Valine', unit: 'g', usda_tag: 'VAL_G'},
    '511': {attr_id: 511, name: 'Arginine', unit: 'g', usda_tag: 'ARG_G'},
    '512': {
      attr_id:  512,
      name:     'Histidine',
      unit:     'g',
      usda_tag: 'HISTN_G'
    },
    '513': {attr_id: 513, name: 'Alanine', unit: 'g', usda_tag: 'ALA_G'},
    '514': {
      attr_id:  514,
      name:     'Aspartic acid',
      unit:     'g',
      usda_tag: 'ASP_G'
    },
    '515': {
      attr_id:  515,
      name:     'Glutamic acid',
      unit:     'g',
      usda_tag: 'GLU_G'
    },
    '516': {attr_id: 516, name: 'Glycine', unit: 'g', usda_tag: 'GLY_G'},
    '517': {attr_id: 517, name: 'Proline', unit: 'g', usda_tag: 'PRO_G'},
    '518': {attr_id: 518, name: 'Serine', unit: 'g', usda_tag: 'SER_G'},
    '521': {
      attr_id:  521,
      name:     'Hydroxyproline',
      unit:     'g',
      usda_tag: 'HYP'
    },
    '573': {
      attr_id:  573,
      name:     'Vitamin E, added',
      unit:     'mg',
      usda_tag: ''
    },
    '578': {
      attr_id:  578,
      name:     'Vitamin B-12, added',
      unit:     'µg',
      usda_tag: ''
    },
    '601': {
      attr_id:  601,
      name:     'Cholesterol',
      unit:     'mg',
      usda_tag: 'CHOLE'
    },
    '605': {
      attr_id:  605,
      name:     'Fatty acids, total trans',
      unit:     'g',
      usda_tag: 'FATRN'
    },
    '606': {
      attr_id:  606,
      name:     'Fatty acids, total saturated',
      unit:     'g',
      usda_tag: 'FASAT'
    },
    '607': {attr_id: 607, name: '4:0', unit: 'g', usda_tag: 'F4D0'},
    '608': {attr_id: 608, name: '6:0', unit: 'g', usda_tag: 'F6D0'},
    '609': {attr_id: 609, name: '8:0', unit: 'g', usda_tag: 'F8D0'},
    '610': {attr_id: 610, name: '10:0', unit: 'g', usda_tag: 'F10D0'},
    '611': {attr_id: 611, name: '12:0', unit: 'g', usda_tag: 'F12D0'},
    '612': {attr_id: 612, name: '14:0', unit: 'g', usda_tag: 'F14D0'},
    '613': {attr_id: 613, name: '16:0', unit: 'g', usda_tag: 'F16D0'},
    '614': {attr_id: 614, name: '18:0', unit: 'g', usda_tag: 'F18D0'},
    '615': {attr_id: 615, name: '20:0', unit: 'g', usda_tag: 'F20D0'},
    '617': {
      attr_id:  617,
      name:     '18:1 undifferentiated',
      unit:     'g',
      usda_tag: 'F18D1'
    },
    '618': {
      attr_id:  618,
      name:     '18:2 undifferentiated',
      unit:     'g',
      usda_tag: 'F18D2'
    },
    '619': {
      attr_id:  619,
      name:     '18:3 undifferentiated',
      unit:     'g',
      usda_tag: 'F18D3'
    },
    '620': {
      attr_id:  620,
      name:     '20:4 undifferentiated',
      unit:     'g',
      usda_tag: 'F20D4'
    },
    '621': {
      attr_id:  621,
      name:     '22:6 n-3 (DHA)',
      unit:     'g',
      usda_tag: 'F22D6'
    },
    '624': {attr_id: 624, name: '22:0', unit: 'g', usda_tag: 'F22D0'},
    '625': {attr_id: 625, name: '14:1', unit: 'g', usda_tag: 'F14D1'},
    '626': {
      attr_id:  626,
      name:     '16:1 undifferentiated',
      unit:     'g',
      usda_tag: 'F16D1'
    },
    '627': {attr_id: 627, name: '18:4', unit: 'g', usda_tag: 'F18D4'},
    '628': {attr_id: 628, name: '20:1', unit: 'g', usda_tag: 'F20D1'},
    '629': {
      attr_id:  629,
      name:     '20:5 n-3 (EPA)',
      unit:     'g',
      usda_tag: 'F20D5'
    },
    '630': {
      attr_id:  630,
      name:     '22:1 undifferentiated',
      unit:     'g',
      usda_tag: 'F22D1'
    },
    '631': {
      attr_id:  631,
      name:     '22:5 n-3 (DPA)',
      unit:     'g',
      usda_tag: 'F22D5'
    },
    '636': {
      attr_id:  636,
      name:     'Phytosterols',
      unit:     'mg',
      usda_tag: 'PHYSTR'
    },
    '638': {
      attr_id:  638,
      name:     'Stigmasterol',
      unit:     'mg',
      usda_tag: 'STID7'
    },
    '639': {
      attr_id:  639,
      name:     'Campesterol',
      unit:     'mg',
      usda_tag: 'CAMD5'
    },
    '641': {
      attr_id:  641,
      name:     'Beta-sitosterol',
      unit:     'mg',
      usda_tag: 'SITSTR'
    },
    '645': {
      attr_id:  645,
      name:     'Fatty acids, total monounsaturated',
      unit:     'g',
      usda_tag: 'FAMS'
    },
    '646': {
      attr_id:  646,
      name:     'Fatty acids, total polyunsaturated',
      unit:     'g',
      usda_tag: 'FAPU'
    },
    '652': {attr_id: 652, name: '15:0', unit: 'g', usda_tag: 'F15D0'},
    '653': {attr_id: 653, name: '17:0', unit: 'g', usda_tag: 'F17D0'},
    '654': {attr_id: 654, name: '24:0', unit: 'g', usda_tag: 'F24D0'},
    '662': {attr_id: 662, name: '16:1 t', unit: 'g', usda_tag: 'F16D1T'},
    '663': {attr_id: 663, name: '18:1 t', unit: 'g', usda_tag: 'F18D1T'},
    '664': {attr_id: 664, name: '22:1 t', unit: 'g', usda_tag: ''},
    '665': {
      attr_id:  665,
      name:     '18:2 t not further defined',
      unit:     'g',
      usda_tag: ''
    },
    '666': {attr_id: 666, name: '18:2 i', unit: 'g', usda_tag: ''},
    '669': {attr_id: 669, name: '18:2 t,t', unit: 'g', usda_tag: 'F18D2TT'},
    '670': {
      attr_id:  670,
      name:     '18:2 CLAs',
      unit:     'g',
      usda_tag: 'F18D2CLA'
    },
    '671': {attr_id: 671, name: '24:1 c', unit: 'g', usda_tag: 'F24D1C'},
    '672': {
      attr_id:  672,
      name:     '20:2 n-6 c,c',
      unit:     'g',
      usda_tag: 'F20D2CN6'
    },
    '673': {attr_id: 673, name: '16:1 c', unit: 'g', usda_tag: 'F16D1C'},
    '674': {attr_id: 674, name: '18:1 c', unit: 'g', usda_tag: 'F18D1C'},
    '675': {
      attr_id:  675,
      name:     '18:2 n-6 c,c',
      unit:     'g',
      usda_tag: 'F18D2CN6'
    },
    '676': {attr_id: 676, name: '22:1 c', unit: 'g', usda_tag: ''},
    '685': {
      attr_id:  685,
      name:     '18:3 n-6 c,c,c',
      unit:     'g',
      usda_tag: 'F18D3CN6'
    },
    '687': {attr_id: 687, name: '17:1', unit: 'g', usda_tag: 'F17D1'},
    '689': {
      attr_id:  689,
      name:     '20:3 undifferentiated',
      unit:     'g',
      usda_tag: 'F20D3'
    },
    '693': {
      attr_id:  693,
      name:     'Fatty acids, total trans-monoenoic',
      unit:     'g',
      usda_tag: 'FATRNM'
    },
    '695': {
      attr_id:  695,
      name:     'Fatty acids, total trans-polyenoic',
      unit:     'g',
      usda_tag: 'FATRNP'
    },
    '696': {attr_id: 696, name: '13:0', unit: 'g', usda_tag: 'F13D0'},
    '697': {attr_id: 697, name: '15:1', unit: 'g', usda_tag: 'F15D1'},
    '851': {
      attr_id:  851,
      name:     '18:3 n-3 c,c,c (ALA)',
      unit:     'g',
      usda_tag: 'F18D3CN3'
    },
    '852': {attr_id: 852, name: '20:3 n-3', unit: 'g', usda_tag: 'F20D3N3'},
    '853': {attr_id: 853, name: '20:3 n-6', unit: 'g', usda_tag: 'F20D3N6'},
    '855': {attr_id: 855, name: '20:4 n-6', unit: 'g', usda_tag: 'F20D4N6'},
    '856': {attr_id: 856, name: '18:3i', unit: 'g', usda_tag: ''},
    '857': {attr_id: 857, name: '21:5', unit: 'g', usda_tag: 'F21D5'},
    '858': {attr_id: 858, name: '22:4', unit: 'g', usda_tag: 'F22D4'},
    '859': {
      attr_id:  859,
      name:     '18:1-11t (18:1t n-7)',
      unit:     'g',
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
}

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
}


module.exports = {
  nutrientsMap: nutrientsMap,
  fullNutrientsDefinitions: fullNutrientsDefinitions,
  attrMap: attrMap
};