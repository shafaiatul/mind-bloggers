(function(){

	var app = angular.module('myQuiz', []);

	//$http : This service allows to load external content, here the json file.
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
		})

		$scope.selectAnswer = function(qIndex, aIndex) {
			alert (qIndex + ' and ' + aIndex);
		}

	}])

})();