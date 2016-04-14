Nutritionix API data utilities
------------------------------

Utilities to handle different data formats in Nutritionix APIs

```
bower install --save nutritionix-api-data-utilities
```

If you do not use AMD or CommonJS util will be available as ```window.nutritionixApiDataUtilities``` object 

or

```
npm install --save nutritionix-api-data-utilities
```

and then

```js
var nutritionixApiDataUtilities = require('nutritionix-api-data-utilities');
```

Available methods:

```js
nutritionixApiDataUtilities.convertV1ItemToTrackFood(v1Item);
nutritionixApiDataUtilities.buildFullNutrientsArray(data);
```
