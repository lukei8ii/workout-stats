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
				amount: 80,
				bar: 20
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

	workoutCtrl.calculatePlates = function(exercise) {
		var plates = [],
				bar = exercise.bar === undefined ? 45 : exercise.bar,
				amount = (exercise.amount - bar) / 2; // how much weight do we put on one side

		if (bar > 0) {
			plateDenominations.forEach(function(denomination) {
				while (amount >= denomination) {
					plates.push(denomination);
					amount -= denomination;
				}
			});
		} else {
			plates.push(amount);
		}

		return plates.join(" + ");
	};

	workoutCtrl.change = function() {
		if (typeof window.localStorage != "undefined") {
			localStorage.setItem("workout-stats", JSON.stringify(workoutCtrl.workout.exercises));
		}
	};

	workoutCtrl.remove = function(exercise) {
		workoutCtrl.workout.exercises = workoutCtrl.workout.exercises.filter(function(obj) {
			return obj.name !== exercise.name;
		});
		workoutCtrl.change();
	};

	workoutCtrl.addNew = function() {
		workoutCtrl.workout.exercises.push({name: "", amount: 0});
		workoutCtrl.change();
	};
};

myApp.controller("WorkoutCtrl", WorkoutCtrl);
