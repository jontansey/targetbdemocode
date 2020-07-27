import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './apollo';
import * as serviceWorker from './serviceWorker';

import { Home } from './pages';

export const App: React.FC = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={Home} />
		</Switch>
	</Router>
);

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
