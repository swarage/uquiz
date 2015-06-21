/* jshint devel:true */

'use strict';

var isProperQuiz = function(quiz) {

  if (quiz === undefined) {
    console.log('no quiz');
    return false;
  }

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
    for (var i = 0; i < quiz.questions.length; i++) {
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
    for (var i = 0; i < quiz.answers.length; i++) {
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

module.exports = {
  jsonToHTML: function(quiz) {

    console.log(quiz);
    //var quizjson = $.parseJSON(quiz);
    var generatedHtml = '';

    //clear the div so we can repopulate it
    $('#questions').empty();

    //if the quiz isn't properly formatted display an error
    if (!isProperQuiz(quiz)) {
      $('#questions').html('<h4> this quiz is invalid! </h4>');
      return;
    } else {
      $.get('scripts/quiz.hbs', function (data) {
        var template = Handlebars.compile(data);
        generatedHtml = template(quiz);
        console.log(generatedHtml);
        $('#questions').html(generatedHtml);
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
};
