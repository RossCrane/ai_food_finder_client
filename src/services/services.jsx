export const getOptions = async (
	clerkUserId,
	{ ingredients, craving, notWant }
) => {
	const cravingText = craving ? ` I am craving ${craving}` : '';
	const notWantText = notWant ? ` and I do not want ${notWant}` : '';

	let diets = '';
	let allergies = '';

	try {
		const userPrefsResponse = await fetch(
			`http://localhost:5000/user/preferences?clerkUserId=${clerkUserId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					// Include authentication headers if necessary
				},
			}
		);
		if (userPrefsResponse.ok) {
			const userPrefs = await userPrefsResponse.json();
			diets = userPrefs.diets ? ` I am on a ${userPrefs.diets} diet.` : '';
			allergies = userPrefs.allergies
				? ` I am allergic to ${userPrefs.allergies}.`
				: '';
		}
	} catch (error) {
		console.error('Error fetching user preferences:', error);
	}

	const prompt = `I am hungry and looking to cook. I have ${ingredients} on hand.${cravingText}${notWantText}${diets}${allergies}. Please provide me with five options and no additional text before or after. I understand that your data can be out of date, just give me the best options you can.`;

	const options = {
		method: 'POST',
		body: JSON.stringify({ message: prompt }),
		headers: { 'Content-Type': 'application/json' },
	};

	try {
		const response = await fetch('http://localhost:5000/completions', options);
		const data = await response.json();
		// console.log(data);
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
};

export const getDetailedRecipe = async (recipeTitle) => {
	const options = {
		method: 'POST',
		body: JSON.stringify({
			message: `Can you give me more details for ${recipeTitle}?`,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const response = await fetch('http://localhost:5000/completions', options);
		const data = await response.json();
		// console.log(data);
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const getGoOutOptions = async (
	clerkUserId,
	{ countryName, stateName, cityName, craving, notWant }
) => {
	const cravingText = craving ? ` I am craving ${craving}` : '';
	const notWantText = notWant ? ` and I do not want ${notWant}` : '';

	let diets = '';
	let allergies = '';

	try {
		const userPrefsResponse = await fetch(
			`http://localhost:5000/user/preferences?clerkUserId=${clerkUserId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					// Include authentication headers if necessary
				},
			}
		);
		if (userPrefsResponse.ok) {
			const userPrefs = await userPrefsResponse.json();
			diets = userPrefs.diets ? ` I am on a ${userPrefs.diets} diet.` : '';
			allergies = userPrefs.allergies
				? ` I am allergic to ${userPrefs.allergies}.`
				: '';
		}
	} catch (error) {
		console.error('Error fetching user preferences:', error);
	}

	const prompt = `I am hungry and looking to go out to a restaurant. My location is ${countryName}, ${stateName}, ${cityName}.${cravingText}${notWantText}${diets}${allergies} Please provide me with five options and remove the preface text before the five options. I understand that your data can be out of date, just give me the best options you can.`;

	// console.log(prompt);

	const options = {
		method: 'POST',
		body: JSON.stringify({ message: prompt }),
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const response = await fetch('http://localhost:5000/completions', options);
		const data = await response.json();
		// console.log(data);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const submitUserPreferences = async (
	clerkUserId,
	primaryEmailAddress,
	allergies,
	diets
) => {
	try {
		const response = await fetch('http://localhost:5000/user/preferences', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				clerkUserId,
				emailAddress: primaryEmailAddress,
				allergies,
				diets,
			}),
		});

		if (response.ok) {
			return await response.json();
		} else {
			throw new Error(`HTTP Error: ${response.statusText}`);
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};
