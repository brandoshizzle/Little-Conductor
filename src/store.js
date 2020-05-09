import { store } from '@risingstack/react-easy-state';
import { observe } from '@nx-js/observer-util';

export const user = localStorage.getItem('user')
	? store(JSON.parse(localStorage.getItem('user')))
	: store({
			name: '',
			id: '',
			token: '',
			allPlaylists: {},
			album: {},
			selectedPlaylists: [],
			progress: {
				done: 0,
				total: 0,
				percent: 0,
			},
			errors: [],
	  });

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
	console.log(test);
	return test;
}

window.user = user;
