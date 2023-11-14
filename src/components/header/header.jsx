import React from 'react';
import logo from '../../assets/utensils-solid.svg';
import './header.css';
import { SignedOut, SignedIn, UserButton } from '@clerk/clerk-react';

import { useNavigate } from 'react-router-dom';

const Header = () => {
	const navigate = useNavigate();

	const handleSignIn = () => {
		navigate('/protected');
	};

	const handleProfile = () => {
		// console.log('navigate to profile, in the future');
		navigate('/profile');
	};

	return (
		<header className="header">
			<img className="header-logo" src={logo} alt="logo" />
			<h1 className="header-title">AI Food Finder</h1>
			<div className="header-buttons">
				<SignedOut>
					<button className="nav-buttons" onClick={handleSignIn}>
						Sign In
					</button>
				</SignedOut>
				<SignedIn>
					<div className="profile-container">
						<button className="profile-button" onClick={handleProfile}>
							Profile
						</button>
						<UserButton></UserButton>
					</div>
				</SignedIn>
			</div>
		</header>
	);
};

export default Header;
