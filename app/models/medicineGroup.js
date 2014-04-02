var db = require('orm').db;

var MdlGroupMedicine = db.define('tbgroupmedicine',{
    id_group_medicine:Number,
    description:{ type: "text", required: "true" }
  },{
    id:'id_group_medicine'
  }
);