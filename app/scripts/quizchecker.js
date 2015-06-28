/* jshint devel:true */

'use strict';

module.exports = {
	answLegend: ['A', 'B', 'C', 'D'],
	checkQuiz: function(quiz) {

		var curQuestion;
		var checkedAnsw;
		var answArr = [];

		console.log('submitted!');
    for (var j = 0; j < quiz.questions.length; j++) {
    	curQuestion = quiz.questions[j];
      for (var k = 0; k < 4; k++) {
      	if ($('#' + curQuestion.condensedtitle + k).is(':checked')) {
      		checkedAnsw = k;
      	}
      }
      if (quiz.answers[j] === this.answLegend[checkedAnsw]) {
      	answArr.push('correct');
      } else {
      	answArr.push('incorrect');
      }
    }
    return answArr;
	}
};

//var myRadio = $('input[name=myRadio]');
//var checkedValue = myRadio.filter(':checked').val();