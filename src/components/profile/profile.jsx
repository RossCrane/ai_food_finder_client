import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

import { submitUserPreferences } from '../../services/services';

const Profile = () => {
	const navigate = useNavigate();

	const [allergies, setAllergies] = useState('');
	const [diets, setDiets] = useState('');

	const { user, isLoaded, isSignedIn } = useUser();

	const handleSubmit = async (e) => {
		e.preventDefault();
		navigate('/protected');

		if (!isLoaded || !isSignedIn) {
			console.error('User data is not fully loaded or user is not signed in.');
			return;
		}

		const clerkUserId = user.id;
		const primaryEmailAddress = user.primaryEmailAddress?.emailAddress;

		if (!primaryEmailAddress) {
			console.error('Primary email address is not available.');
			return;
		}

		try {
			const result = await submitUserPreferences(
				clerkUserId,
				primaryEmailAddress,
				allergies,
				diets
			);
			// console.log('Preferences saved:', result);
		} catch (error) {
			console.error('Failed to save preferences:', error);
		}
	};

	return (
		<div>
			<div>
				<div className="form-input-container">
					<textarea
						className="form-input"
						placeholder="Do you have any allergies?"
						value={allergies}
						onChange={(e) => setAllergies(e.target.value)}
					/>
					<textarea
						className="form-input"
						placeholder="Are you on any diets?"
						value={diets}
						onChange={(e) => setDiets(e.target.value)}
					/>
				</div>
			</div>
			<div className="submit-button-container">
				<button className="submit-button" onClick={handleSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default Profile;
