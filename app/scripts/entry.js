/* jshint devel:true */

var filereader = require('./filereader.js');
var jsontohtml = require('./jsontohtml.js');

//initialize the modal
$(document).ready(function(){
  $('.modal-trigger').leanModal();
});

//adding the event listener to the button
$('.readBytesButtons').click(function(evt) {
  filereader.readFile();
});
