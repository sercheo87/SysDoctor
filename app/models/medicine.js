var db = require('orm').db;

var MdlMedicine = db.define('tbmedicine', {
    id_medicine: Number,
    description: { type: "text", required: "true" },
    id_group_medicine: Number
  }, {
    id:'id_medicine'
  }
);