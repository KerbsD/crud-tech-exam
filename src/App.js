import 'styles/main.scss';
import 'index.css'
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import  Page  from 'components/Pages/Page';
import Home from 'views/home/Home';
import Users from 'views/users/Users';

function App() {
	return (
		<div className='app'>
			<Router>
				<Page>
					<Switch>
						<Route exact path='/'>
							<Home />
						</Route>
						<Route path='/users'>
							<Users />
						</Route>
						<Route path='*'>404</Route>
					</Switch>
				</Page>
			</Router>
		</div>
	);
}

export default App;
