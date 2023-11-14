import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';
import { useUser } from '@clerk/clerk-react';

import { getOptions } from '../../services/services';

import './cook.css';

const Cook = () => {
	const navigate = useNavigate();

	const [submitted, setSubmitted] = useState(false);
	const [formState, setFormState] = useState({
		craving: '',
		notWant: '',
		ingredients: '',
	});

	const { user, isLoaded, isSignedIn } = useUser();

	const { setApiResponse } = useAppContext();

	const handleFormStateChange = (e) => {
		setFormState((prevFormState) => ({
			...prevFormState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (submitted) return;
		setSubmitted(true);

		if (!isLoaded || !isSignedIn) {
			console.error('User data is not fully loaded or user is not signed in.');
			return;
		}

		const clerkUserId = user.id;

		const data = await getOptions(clerkUserId, formState);
		if (data) {
			setApiResponse(data);
			navigate('/options');
		}
		setSubmitted(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<div className="form-input-container">
					<textarea
						className="form-input"
						placeholder="Enter on hand ingredients here..."
						value={formState.ingredients}
						name="ingredients"
						onChange={handleFormStateChange}
					/>
				</div>
				<div>
					<div className="form-input-container">
						<textarea
							className="form-input"
							placeholder="What foods are you currently craving?"
							value={formState.craving}
							name="craving"
							onChange={handleFormStateChange}
						/>
						<textarea
							className="form-input"
							placeholder="What foods do you currently not want to eat?"
							value={formState.notWant}
							name="notWant"
							onChange={handleFormStateChange}
						/>
					</div>
				</div>
				<div className="submit-button-container">
					<button type="submit" className="submit-button" disabled={submitted}>
						{submitted ? 'Loading...' : 'Submit'}
					</button>
				</div>
			</div>
		</form>
	);
};

export default Cook;
