'use strict';
var db = require('orm').db;

/**
* GetAllGroupMedicines
*/
exports.GetAllGroupMedicines=function(req, res) {
  db.models.tbgroupmedicine.find(function(err, groupMedicines){
      if(err) throw new Error(err);
      res.json(groupMedicines);
    });
};