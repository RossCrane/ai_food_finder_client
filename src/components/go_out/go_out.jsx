import React, { useState } from 'react';
import {
	CitySelect,
	CountrySelect,
	StateSelect,
} from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

import { useAppContext } from '../../AppContext';

import { getGoOutOptions } from '../../services/services';

import './go_out.css';

const GoOut = () => {
	const navigate = useNavigate();

	const [submitted, setSubmitted] = useState(false);
	const [formState, setFormState] = useState({
		countryid: '',
		countryName: '',
		stateid: '',
		stateName: '',
		cityid: '',
		cityName: '',
		craving: '',
		notWant: '',
	});

	const { user, isLoaded, isSignedIn } = useUser();

	const { setApiResponse } = useAppContext();

	const handleFormStateChange = (e, key, name) => {
		setFormState((prevFormState) => ({
			...prevFormState,
			[key]: e.id,
			[name]: e.name,
		}));
	};

	const handleInputChange = (e) => {
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

		const data = await getGoOutOptions(clerkUserId, formState);
		if (data) {
			setApiResponse(data);
			navigate('/options');
		}
		setSubmitted(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Country</h2>
			<CountrySelect
				value={formState.countryid}
				onChange={(e) => handleFormStateChange(e, 'countryid', 'countryName')}
				placeHolder="Select Country"
			/>
			<h2>State</h2>
			<StateSelect
				countryid={formState.countryid}
				value={formState.stateid}
				onChange={(e) => handleFormStateChange(e, 'stateid', 'stateName')}
				placeHolder="Select State"
			/>
			<h2>City</h2>
			<CitySelect
				countryid={formState.countryid}
				stateid={formState.stateid}
				value={formState.cityid}
				onChange={(e) => handleFormStateChange(e, 'cityid', 'cityName')}
				placeHolder="Select City"
			/>
			<div className="form-input-container">
				<textarea
					className="form-input"
					placeholder="What foods are you currently craving?"
					value={formState.craving}
					name="craving"
					onChange={handleInputChange}
				/>
				<textarea
					className="form-input"
					placeholder="What foods do you currently not want to eat?"
					value={formState.notWant}
					name="notWant"
					onChange={handleInputChange}
				/>
			</div>
			<div className="submit-button-container">
				<button type="submit" className="submit-button" disabled={submitted}>
					{submitted ? 'Loading...' : 'Submit'}
				</button>
			</div>
		</form>
	);
};

export default GoOut;
