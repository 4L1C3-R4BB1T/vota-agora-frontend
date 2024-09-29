import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignInForm from './pages/Login/components/SignInForm';
import SignUpForm from './pages/Login/components/SignUpForm';
import Home from './pages/Home';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth" element={<Login />}>
                    <Route path="signin" element={<SignInForm />} />
                    <Route path="signup" element={<SignUpForm />} />
                </Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
