import 'styles/main.scss';
import 'index.css'
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Page from 'components/Pages/Page';
import Home from 'views/home/Home';
import Users from 'views/users/Users';
import Missing from './views/404'

function App() {
	return (
		<div className='app font-poppins'>
			<Router>
				<Page>
					<Switch>
						<Route exact path='/'>
							<Home />
						</Route>
						<Route path='/users'>
							<Users />
						</Route>
						<Route path='*'>
							<Missing />
						</Route>
					</Switch>
				</Page>
			</Router>
		</div>
	);
}

export default App;
