/* jshint devel:true */

'use strict';

var quizChecker = require('./quizchecker.js');

var isProperQuiz = function(quiz) {

  if (quiz === undefined) {
    console.log('no quiz');
    return false;
  }

  var i;

  //check to see if the title is actually a title
  if (quiz.title === undefined || typeof quiz.title !== 'string') {
    console.log('no title');
    return false;
  }

  //check to see if description is actually a description
  if (!quiz.description || typeof quiz.description !== 'string') {
    console.log('no description');
    return false;
  }

  //check to see if questions are actually questions
  if (!quiz.questions || !(quiz.questions instanceof Array)){
    console.log('no questions');
    return false;
  } else {
    for (i = 0; i < quiz.questions.length; i++) {
      var question = quiz.questions[i];
      console.log(typeof question.title + ': ' + question.title);
      if (!question.title || typeof question.title !== 'string') {
        console.log('no question title');
        return false;
      }
      if (!question.answers || !(question.answers instanceof Array) || question.answers.length !== 4) {
        console.log('no answers');
        return false;
      }
    }
  }

  //check to see if answers are actually answers
  if (!quiz.answers || !(quiz.answers instanceof Array)) {
    console.log('no answer array');
    return false;
  } else {
    for (i = 0; i < quiz.answers.length; i++) {
      var answer = quiz.answers[i];
      if (['A', 'B', 'C', 'D'].indexOf(answer) < 0) {
        console.log('not letters');
        return false;
      }
    }
  }

  //if it passed all the tests, then it is a valid question
  return true;

};

//register a helper to check for equality because handlebars does not come with logical operators
Handlebars.registerHelper('ifSame', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

module.exports = {
  jsonToHTML: function(quiz) {

    var i;

    //console.log(quiz);
    //var quizjson = $.parseJSON(quiz);
    var generatedHtml = '';

    //clear the div so we can repopulate it
    $('#questions').empty();

    //if the quiz isn't properly formatted display an error
    if (!isProperQuiz(quiz)) {
      $('#questions').html('<h4> this quiz is invalid! </h4>');
      return;
    } else {
      $.get('quiz.hbs', function (data) {
        //compile the handlebars template, but passed in the condensed titles to create valid ids
        //in addition, clear the answered questions so there aren't any prefilled answers
        var template = Handlebars.compile(data);
        for (i = 0; i < quiz.questions.length; i++) {
          quiz.questions[i].condensedtitle = quiz.questions[i].title.replace(/\s/g, '');
          quiz.questions[i].answered = '';
        }

        //console.log(quiz);

        //generate the html and fill the questions div with the generated html
        generatedHtml = template(quiz);
        $('#questions').html(generatedHtml);

        //check the submitted answers with the answers given by the JSON file
        //and re-render the html with the correct/incorrect answers
        $('#submit').click(function(){
          var answers = quizChecker.checkQuiz(quiz);
          var titles = $('#questions h6');
          for(i = 0; i < titles.length; i++) {
            if (answers[i] === 'correct') {
              titles.eq(i).attr('id', 'correct');
            } else {
              titles.eq(i).attr('id', 'incorrect');
            }
          }
        });
      }, 'html');
    }

    

  }
};
