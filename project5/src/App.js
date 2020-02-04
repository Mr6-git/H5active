import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from './routes';
import NavBar from './page/index.js'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount() {
	}

	render() {
		return (
			<React.Fragment>
				<Router>
					<Route path="/" component={NavBar} />
					{routes.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							exact={route.exact}
							render={props => (
								<Suspense fallback={null}>
									<route.component {...props} routes={route.routes} />
								</Suspense>
							)}
						/>
					))}
				</Router>
			</React.Fragment>
		);
	}
}

export default App;
