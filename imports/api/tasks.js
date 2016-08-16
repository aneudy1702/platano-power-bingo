import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
	// this code only runs on the server
	Meteor.publish('tasks', function tasksPublication(){
		return Tasks.find({
			$or: [
				{
					private: {
						$ne: true
					}
				},

				{
					owner: this.userId
				}

			]
		});
	});
}

function mError(errorType) {
	throw new Meteor.Error(errorType);
}
function notAutorizedUser() {
	return mError('not-autorized');
}

function checkUserOwnThisTask(taskId) {
	const task = Tasks.findOne(taskId);

	if (task.private && task.owner !== Meteor.userId()) {
		return notAutorizedUser();
	}

	return true;
}

function checkUserIsSignedInd() {
	// Make sure the user is logged in before inserting a task
	if (!Meteor.userId()) {
		return notAutorizedUser();
	}

	return true;
}

Meteor.methods({
	'tasks.insert' (text) {
		check(text, String);
		checkUserIsSignedInd();

		Tasks.insert({
			text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});		
	},

	'tasks.remove' (taskId) {
		check(taskId, String);
		checkUserOwnThisTask(taskId);

		Tasks.remove(taskId);
	},

	'tasks.setChecked' (taskId, setChecked) {
		check(taskId, String);
		check(setChecked, Boolean);
		checkUserOwnThisTask(taskId);

		Tasks.update(taskId, {
			$set: {
				checked: setChecked
			}
		});
	},

	'tasks.setPrivate' (taskId, setToPrivate) {
		check(taskId, String);
		check(setToPrivate, Boolean);
		checkUserOwnThisTask(taskId);

		Tasks.update(taskId, {
			$set: {
				private: setToPrivate
			}
		});
	}
});