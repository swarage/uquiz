/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint devel:true */

	var filereader = __webpack_require__(1);
	var jsontohtml = __webpack_require__(2);

	//initialize the modal
	$(document).ready(function(){
	  $('.modal-trigger').leanModal();
	});

	//adding the event listener to the button
	$('.readBytesButtons').click(function(evt) {
	  filereader.readFile();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint devel:true */

	var jsontohtml = __webpack_require__(2);

	//function to read the JSON file once the button is clicked
	module.exports = {
	  readFile: function() {

	    var quiz;

	    var files = $('#files').prop("files");
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
	      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
	        //$('#byte_content').text(evt.target.result);
	        console.log("file is read");
	        try {
	          quiz = $.parseJSON(evt.target.result);
	          jsontohtml.jsonToHTML(quiz);
	          console.log(quiz.title);
	        } catch (e) {
	          console.log(e);
	          quiz = "there is an error in the json";
	        }
	      }
	    };

	    var blob = file.slice(start, stop + 1);
	    reader.readAsBinaryString(blob);

	  }
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	/* jshint devel:true */

	var isProperQuiz = function(quiz) {

	  if (quiz === undefined) {
	    console.log("no quiz");
	    return false;
	  }

	  //check to see if the title is actually a title
	  if (quiz.title === undefined || typeof quiz.title !== 'string') {
	    console.log("no title");
	    return false;
	  }

	  //check to see if description is actually a description
	  if (!quiz.description || typeof quiz.description != "string") {
	    console.log("no description");
	    return false;
	  }

	  //check to see if questions are actually questions
	  if (!quiz.questions || !(quiz.questions instanceof Array)){
	    console.log("no questions");
	    return false;
	  } else {
	    for (var i = 0; i < quiz.questions.length; i++) {
	      var question = quiz.questions[i];
	      console.log(typeof question.title + ": " + question.title);
	      if (!question.title || typeof question.title != "string") {
	        console.log("no question title");
	        return false;
	      }
	      if (!question.answers || !(question.answers instanceof Array) || question.answers.length != 4) {
	        console.log("no answers");
	        return false;
	      }
	    }
	  }

	  //check to see if answers are actually answers
	  if (!quiz.answers || !(quiz.answers instanceof Array)) {
	    console.log("no answer array");
	    return false;
	  } else {
	    for (var i = 0; i < quiz.answers.length; i++) {
	      var answer = quiz.answers[i];
	      if (["A", "B", "C", "D"].indexOf(answer) < 0) {
	        console.log("not letters");
	        return false;
	      }
	    }
	  }

	  //if it passed all the tests, then it is a valid question
	  return true;

	}

	module.exports = {
	  jsonToHTML: function(quiz) {

	    console.log(quiz);
	    //var quizjson = $.parseJSON(quiz);
	    var generated_html = '';

	    //clear the div so we can repopulate it
	    $("#questions").empty();

	    //if the quiz isn't properly formatted display an error
	    if (!isProperQuiz(quiz)) {
	      $("#questions").html("<h4> this quiz is invalid! </h4>");
	      return;
	    } else {
	      $.get('scripts/quiz.hbs', function (data) {
	        var template = Handlebars.compile(data);
	        generated_html = template(quiz);
	        console.log(generated_html);
	        $("#questions").html(generated_html);
	      }, 'html');
	    }

	    //TODO for this function
	    // - generate the html for each question
	    // -- h3 for quiz title
	    // -- h5 for description
	    // -- p for question title
	    // -- radio boxes for answers
	    // -- submit button towards bottom, cleared every time

	  }
	}


/***/ }
/******/ ]);