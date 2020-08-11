import React, { Component } from 'react';
import { authEndpoint, clientId, redirectUri, scopes } from './config';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, brown } from '@material-ui/core/colors';
import hash from './hash';
import Main from './components/Main';
import logo from './logo.svg';
import './App.css';
import { user } from './store';

const LSTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#668a84',
		},
		secondary: {
			main: brown[500],
		},
	},
});

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
			user.token = _token;
			// this.getCurrentlyPlaying(_token);
		}
	}

	clearLocalStorage() {
		localStorage.setItem('token', '');
	}

	render() {
		return (
			<ThemeProvider theme={LSTheme}>
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
			</ThemeProvider>
		);
	}
}

export default App;
