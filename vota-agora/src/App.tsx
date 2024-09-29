import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignInForm from './pages/Login/components/SignInForm';
import SignUpForm from './pages/Login/components/SignUpForm';
import Consultations from './pages/Dashboard/pages/Consultations';
import Profile from './pages/Dashboard/pages/Profile';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard />}>
					<Route index element={<Consultations />} />
					<Route path="profile" element={<Profile />} />
                </Route>
				<Route path="/auth" element={<Login />}>
                    <Route path="signin" element={<SignInForm />} />
                    <Route path="signup" element={<SignUpForm />} />
                </Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
