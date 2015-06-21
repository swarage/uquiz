/* jshint devel:true */

'use strict';

var filereader = require('./filereader.js');

//initialize the modal
$(document).ready(function(){
  $('.modal-trigger').leanModal();
});

//adding the event listener to the button
$('.readBytesButtons').click(function() {
  filereader.readFile();
});
