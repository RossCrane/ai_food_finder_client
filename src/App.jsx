import React from 'react';
import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	RedirectToSignIn,
	SignIn,
	SignUp,
} from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

import Header from './components/header/header.jsx';
import LoggedIn from './components/logged_in/logged_in.jsx';
import Cook from './components/cook/cook.jsx';
import GoOut from './components/go_out/go_out';
import AIOptions from './components/ai_options/ai_options.jsx';
import Profile from './components/profile/profile.jsx';
import { AppProvider } from './AppContext';

import './App.css';

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key');
}

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

function PublicPage() {
	return (
		<>
			<Header></Header>
			<LoggedIn />
		</>
	);
}

function ClerkProviderWithRoutes() {
	const navigate = useNavigate();

	return (
		<ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
			<Routes>
				<Route path="/" element={<PublicPage />} />
				<Route
					path="/sign-in/*"
					element={
						<SignIn routing="path" path="/sign-in" redirectUrl="/protected" />
					}
				/>
				<Route
					path="/sign-up/*"
					element={
						<SignUp routing="path" path="/sign-up" redirectUrl="/protected" />
					}
				/>
				<Route
					path="/protected"
					element={
						<>
							<SignedIn>
								<Header></Header>
								<LoggedIn />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
				<Route
					path="/profile"
					element={
						<>
							<SignedIn>
								<Header></Header>
								<Profile />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
				<Route
					path="/cook"
					element={
						<>
							<SignedIn>
								<Header></Header>
								<Cook />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
				<Route
					path="/go-out"
					element={
						<>
							<SignedIn>
								<Header></Header>
								<GoOut />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
				<Route
					path="/options"
					element={
						<>
							<SignedIn>
								<Header></Header>
								<AIOptions />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
				<Route
					path="/recipe"
					element={
						<>
							<SignedIn>
								<Header></Header>
								<Cook />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
			</Routes>
		</ClerkProvider>
	);
}

function App() {
	return (
		<BrowserRouter>
			<AppProvider>
				<ClerkProviderWithRoutes />
			</AppProvider>
		</BrowserRouter>
	);
}

export default App;
