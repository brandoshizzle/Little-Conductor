import { store } from '@risingstack/react-easy-state';
import { observe } from '@nx-js/observer-util';
import merge from 'lodash/merge';

const defaultUser = {
	name: '',
	id: '',
	token: '',
	allPlaylists: {},
	filteredPlaylists: [],
	selectedAlbums: [],
	allAlbums: {},
	selectedPlaylists: [],
	progress: {
		done: 0,
		total: 0,
		percent: 0,
	},
	log: (newLine, color) => {
		const textColor = color || 'normal';
		const colors = {
			start: 'green',
			normal: '#ddd',
			end: 'red',
		};
		user.logArray.unshift({ text: newLine, color: colors[textColor] });
	},
	logArray: [],
	errors: [],
};

export const user = store(
	localStorage.getItem('user') != null ? merge(defaultUser, JSON.parse(localStorage.getItem('user'))) : defaultUser
);

observe(() => {
	localStorage.setItem('user', JSON.stringify(user));
});

// observe(() => {
// 	playlistArray = [];
// 	for (var playlist in user.allPlaylists) {
// 		const newObj = {
// 			...user.allPlaylists[playlist],
// 		};
// 		playlistArray.push(newObj);
// 	}
// 	// playlistArray = Object.values(user.allPlaylists);
// 	console.log(playlistArray);
// });

export function playlistArray() {
	let test = [];
	for (var playlist in user.allPlaylists) {
		const newObj = {
			...user.allPlaylists[playlist],
		};
		test.push(newObj);
	}
	// playlistArray = Object.values(user.allPlaylists);
	// console.log(test);
	return test;
}

window.user = user;
