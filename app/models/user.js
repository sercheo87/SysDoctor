var db = require('orm').db;

var MdlMedicine = db.define('tbusers', {
    iduser: Number,
    name: { type: "text", required: "true" },
    lastname: { type: "text", required: "true" },
    datebirth: { type: "date" },
    state: { type: "boolean" },
    login: { type: "text", required: "true" },
    pass: { type: "text", required: "true" }
  }, {
    id:'iduser'
  }
);