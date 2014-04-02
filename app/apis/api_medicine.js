'use strict';
var db = require('orm').db;

/**
* GetAllMedicines
*/
exports.GetAllMedicines=function(req, res) {
  db.models.tbmedicine.find(function(err, medicines){
      if(err) throw new Error(err);
      res.json(medicines);
    });
};