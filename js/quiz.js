(function(){
    'use strict';

	var app = angular.module('myQuiz', []);

	//$http : This service allows to load external content, here from the json file.
	//$sce  : This servce allows to inject html from the my json file direclty to my html document
	app.controller('QuizCtrl', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

		//Initial State (Before the Quiz begins)
		$scope.score = 0;
		$scope.activeQuestion = -1; //I will show the "Into" screen if the value is -1,  and disappear it when more than -1
		$scope.activeQuestionAnswered = 0;
		$scope.percentage = 0;

		$http.get('quiz_data.json').then(function (quizData) {
			$scope.myQuestions = quizData.data; // all questions in the json file
			$scope.totalQuestions = $scope.myQuestions.length; //number of question in the json file
		});

		$scope.selectAnswer = function(qIndex, aIndex) {
			//verify whether the question has been answered
            var questionState = $scope.myQuestions[qIndex].questionState;
            if(questionState != 'answered') {
                $scope.myQuestions[qIndex].selectedAnswer = aIndex; //here I check the selected answer the user has clicked on
                var correctAnswer = $scope.myQuestions[qIndex].correct; //correct answer from the JSON file
                $scope.myQuestions[qIndex].correctAnswer = correctAnswer;
                //Now I will check the answer clicked on matches the correct answer or not
                if (aIndex === correctAnswer){
                    $scope.myQuestions[qIndex].correctness = 'correct';
                    $scope.score += 1;
                } else {
                    $scope.myQuestions[qIndex].correctness = 'incorrect';
                }
                //The reason I have to write this line of code because the user can still click on the individual answers
                //Even I turned off the cursor and hover-state, ANGULAR is still paying attension to every one of the answers and user can still click on the answers
                //But now after adding this line of code, after first answer selection, user can click but nothing will happen
                $scope.myQuestions[qIndex].questionState = 'answered';
            }
            $scope.percentage = (($scope.score / $scope.totalQuestions)*100).toFixed(1);
		};

        $scope.isSelected = function (qIndex, aIndex) {
            return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
        };
        $scope.isCorrect = function (qIndex, aIndex) {
            return $scope.myQuestions[qIndex].correctAnswer === aIndex;
        };

        $scope.selectContinue = function () {
            return $scope.activeQuestion += 1;
        };

        $scope.createShareLinks = function (percentage) {
            var url = 'http://shafaiatul.com/';

            var emailLink = '<a class="btn email" href="mailto:?subject=Try to beat my Quiz Score!&amp;body=I scored a '+percentage+'% on this quiz about DRUGS. Try to beat my score at '+url+' ">Email a friend</a>';

            var twitterLink = '<a target="_blank" class="btn twitter" href="http://twitter.com/share?text=I scored a '+percentage+'%25 on this quiz on DRUGS. Try to beat my score at&amp;hashtags=DRUGQuiz&amp;url='+url+' ">Tweet your score</a>';

            var newMarkup = emailLink + twitterLink;

            return $sce.trustAsHtml(newMarkup);
        };
	}]);

})();
