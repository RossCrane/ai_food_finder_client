import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useMatch, useNavigate } from 'react-router-dom';

import './logged_in.css';

function LoggedIn() {
	const navigate = useNavigate();
	const isCookRoute = useMatch('/cook');
	const isGoOutRoute = useMatch('/go-out');
	const { isSignedIn, user, isLoaded } = useUser();

	useEffect(() => {
		if (isLoaded && isSignedIn) {
			// User data is loaded and user is signed in
			const emailAddress = user.primaryEmailAddress?.emailAddress;
			const userId = user.id;
			if (emailAddress) {
				// console.log("User's email address:", emailAddress);
			}
		}
	}, [isLoaded, isSignedIn, user]);

	const handleCookClick = () => {
		navigate('/cook');
	};

	const handleGoOutClick = () => {
		navigate('/go-out');
	};

	if (isCookRoute || isGoOutRoute) {
		return null; // Hide the buttons when on /cook or /go-out routes
	}

	return (
		<div>
			<div className="main-buttons">
				<button className="main-button" onClick={handleCookClick}>
					Cook
				</button>

				<button className="main-button" onClick={handleGoOutClick}>
					Go Out
				</button>
			</div>
			<div>
				<h1>Welcome to AI Food Finder - Your Personalized Dining Companion!</h1>
				<h2>
					Are you tired of the age-old question, "What should I eat today?" Look
					no further! Our app is here to simplify your dining decisions and
					cater to your unique preferences.
				</h2>
				<br />
				<h1>Personalize Your Experience:</h1>
				<p className="intro-text-details">
					In the profile tab on the right, you have the power to customize your
					dietary preferences and allergies. Whether you're vegan, gluten-free,
					or just trying to cut back on carbs, we've got you covered. And the
					best part? You can update your profile at any time, ensuring that your
					choices align with your ever-changing tastes.
				</p>
				<br />
				<h1>Streamlined Decision-Making:</h1>
				<p className="intro-text-details">
					Once you're ready to eat, head to the main page. Whether you're
					planning to cook a meal at home or venture out to a restaurant, our
					app will guide you through a simple and enjoyable decision-making
					process.
				</p>
				<br />
				<h1>Tailored Recommendations:</h1>
				<p className="intro-text-details">
					You won't have to scratch your head or endlessly scroll through menus.
					We'll ask you a few prompts to understand your cravings and dietary
					restrictions. Then, voilà! You'll receive five curated options to
					choose from, each tailored to your preferences.
				</p>
				<br />
				<h1>Detailed Information:</h1>
				<p className="intro-text-details">
					Click on any of the recommended choices to delve deeper. Get detailed
					information about the dishes, view mouthwatering images, and read user
					reviews. We provide you with all the information you need to make the
					perfect choice. Say goodbye to food indecision and hello to a more
					enjoyable dining experience with AI Food Finder. It's time to eat with
					confidence, every time! Ready to get started? Let's discover your next
					delicious meal together.
				</p>
			</div>
		</div>
	);
}

export default LoggedIn;
