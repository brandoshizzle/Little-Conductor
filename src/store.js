import { store } from '@risingstack/react-easy-state';
import { observe } from '@nx-js/observer-util';

const state = localStorage.getItem('state')
	? store(JSON.parse(localStorage.getItem('state')))
	: store({
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
	localStorage.setItem('state', JSON.stringify(state));
});

export default state;

window.state = state;
