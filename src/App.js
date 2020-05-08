import React, { Component } from 'react';
import { authEndpoint, clientId, redirectUri, scopes } from './config';
import hash from './hash';
import Main from './components/Main';
import logo from './logo.svg';
import './App.css';
import state from './store';

class App extends Component {
	constructor() {
		super();
		this.state = {
			token: null,
			item: {
				album: {
					images: [{ url: '' }],
				},
				name: '',
				artists: [{ name: '' }],
				duration_ms: 0,
			},
			is_playing: 'Paused',
			progress_ms: 0,
		};
	}
	componentDidMount() {
		// Set token
		let _token = hash.access_token || localStorage.getItem('token');

		if (_token) {
			// Set token
			this.setState({
				token: _token,
			});
			localStorage.setItem('token', _token);
			state.token = _token;
			// this.getCurrentlyPlaying(_token);
		}
	}

	clearLocalStorage() {
		localStorage.setItem('token', '');
	}

	render() {
		return (
			<div className="App">
				<header>
					{!this.state.token && (
						<div className="App-header">
							<img src={logo} className="App-logo" alt="logo" />
							<a
								className="btn btn--loginApp-link"
								href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
									'%20'
								)}&response_type=token&show_dialog=true`}
							>
								Login to Spotify
							</a>
						</div>
					)}
					{this.state.token && <Main token={this.state.token} />}
				</header>
			</div>
		);
	}
}

export default App;
