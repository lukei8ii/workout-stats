var myApp = angular.module("myApp", []);

myApp.factory("Workout", function($rootScope) {
	var Workout = {};

	if (typeof window.localStorage != "undefined") {
		Workout.exercises = JSON.parse(localStorage.getItem("workout-stats"));
	}

	if (Workout.exercises === null || Workout.exercises === undefined) {
		Workout.exercises = [
			{
				name: "Press",
				amount: 130
			},
			{
				name: "Upright Row",
				amount: 105
			},
			{
				name: "Curl",
				amount: 80
			},
			{
				name: "Bench Press",
				amount: 190
			},
			{
				name: "Flyes",
				amount: 80
			},
			{
				name: "Incline Bench Press",
				amount: 125
			},
			{
				name: "Deadlift",
				amount: 200
			},
			{
				name: "Squat",
				amount: 200
			}
		];
	}

	return Workout;
});

var plateDenominations = [45, 35, 25, 10, 5, 2.5];

function WorkoutCtrl(Workout) {
	var workoutCtrl = this;
	workoutCtrl.workout = Workout;

	workoutCtrl.subtractTenPercent = function(exercise) {
		exercise.amount = 5 * Math.round(exercise.amount * .9 / 5);
		workoutCtrl.change();
	};

	workoutCtrl.addFive = function(exercise) {
		exercise.amount = 5 * Math.round((exercise.amount + 5) / 5);
		workoutCtrl.change();
	};

	workoutCtrl.calculatePlates = function(amount) {
		var plates = [];
		amount = amount / 2; // how much weight do we put on one side

		plateDenominations.forEach(function(denomination) {
			while (amount >= denomination) {
				plates.push(denomination);
				amount -= denomination;
			}
		});

		return plates.join(" + ");
	};

	workoutCtrl.change = function() {
		// console.log("changed!");

		if (typeof window.localStorage != "undefined") {
			localStorage.setItem("workout-stats", JSON.stringify(Workout.exercises));
		}
	};
};

myApp.controller("WorkoutCtrl", WorkoutCtrl);
