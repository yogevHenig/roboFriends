import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

class App extends Component {
	constructor(){
		super();
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount(){
		const proxyurl = "https://cors-anywhere.herokuapp.com/";
		const url = "https://jsonplaceholder.typicode.com/users"; // site that doesn’t send Access-Control-*
		fetch(proxyurl + url)
			.then(response => response.json())
			.then(users => this.setState({ robots: users }));
	}


	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render(){
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		});
		if (robots.length === 0) {
			return <h1>Loading</h1>
		} else {
			return (
				<div className='tc'>
					<h1 className="f2">RoboFriends</h1>
					<SearchBox searchChange={ this.onSearchChange }/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots={ filteredRobots }/>
						</ErrorBoundry>	
					</Scroll>	
				</div>
			);
		}
	}
}

export default App ;
