/* jshint devel:true */

'use strict';

var jsontohtml = require('./jsontohtml.js');

//function to read the JSON file once the button is clicked
module.exports = {
  readFile: function() {

    var quiz;

    var files = $('#files').prop('files');
    if (!files.length) {
      alert('Please select a file!');
      return;
    }

    var file = files[0];
    var start = 0;
    var stop = file.size - 1;

    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
      if (evt.target.readyState === FileReader.DONE) { // DONE == 2
        console.log('file is read');
        try {
          quiz = $.parseJSON(evt.target.result);
          jsontohtml.jsonToHTML(quiz);
          console.log(quiz.title);
        } catch (e) {
          console.log(e);
          quiz = 'there is an error in the json';
        }
      }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);

  }
};
