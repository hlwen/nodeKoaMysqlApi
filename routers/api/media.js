
var Router = require('koa-router');
var router = new Router({prefix: '/api/media'});

var parse = require('co-busboy');
var os = require('os');
var path = require('path');
var fs = require('fs');

var apiConstant = require('../../model/apiConstant')

router.post('/upload', function* (next){

  // multipart upload
  var parts = parse(this);
  var part;
  var returnpath = "";

  while (part = yield parts) {
    // var stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
	  var stream = fs.createWriteStream(apiConstant.uploadFilePrex+part.filename);
      returnpath = apiConstant.uploadReturnFilePrex+part.filename;
      if (part.length) {
          // arrays are busboy fields
          // console.log('key: ' + part[0])
          // console.log('value: ' + part[1])
      } else {
          // otherwise, it's a stream
          part.pipe(stream);
      }
  }

  yield this.body = {
       "status":"success",
  	   "url":returnpath
  };
});

router.post('/simditorUploadImage', function* (next){
    var parts = parse(this);
    var part;
    var returnpath = "";

    while (part = yield parts) {
      var stream = fs.createWriteStream(apiConstant.uploadFilePrex+part.filename);
      returnpath = apiConstant.uploadReturnFilePrex+part.filename;
      if (part.length) {
        // arrays are busboy fields
        // console.log('key: ' + part[0])
        // console.log('value: ' + part[1])
      } else {
        // otherwise, it's a stream
        part.pipe(stream);
      }
    }
    yield this.body = {
      "success": true,
      "msg": "error message",
      "file_path": returnpath
    };
});

router.post('/uploadFiles', function* (next){

  // multipart upload
  var parts = parse(this);
  var part;
  var returnpath = "";

  while (part = yield parts) {
    // var stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
    var stream = fs.createWriteStream(apiConstant.uploadFilePrex+part.filename);
    if (returnpath=="") {
        returnpath+=apiConstant.uploadReturnFilePrex+part.filename;
    }else{
        returnpath += ";"+apiConstant.uploadReturnFilePrex+part.filename;
    }
    part.pipe(stream);
  }

  yield this.body = {
       status:"success",
       url:returnpath
  };
});


module.exports = router;
