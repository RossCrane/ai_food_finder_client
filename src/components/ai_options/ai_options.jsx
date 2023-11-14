import React, { useState } from 'react';
import { useAppContext } from '../../AppContext';
import { getDetailedRecipe } from '../../services/services';

import './ai_options.css';

const Accordion = ({ title, details, fetchDetails }) => {
	const [isActive, setIsActive] = useState(false);

	const handleTitleClick = () => {
		setIsActive((prevActive) => !prevActive);
		if (!isActive) {
			fetchDetails(title);
		}
	};

	// Function to render and format details
	const renderDetails = (details) => {
		if (!details) return 'Loading...';

		// Format the details to include line breaks before each "-"
		const formattedDetails = details.choices[0].message.content.replace(
			/ - /g,
			'\n - '
		);

		return formattedDetails.split('\n').map((line, index) => (
			<React.Fragment key={index}>
				{line}
				<br />
			</React.Fragment>
		));
	};

	return (
		<div className="accordion-item">
			<div className="accordion-title" onClick={handleTitleClick}>
				<div>{title}</div>
				<div>{isActive ? '-' : '+'}</div>
			</div>
			{isActive && (
				<div className="accordion-content">{renderDetails(details)}</div>
			)}
		</div>
	);
};

const AIOptions = () => {
	const { apiResponse } = useAppContext();
	const [detailedContent, setDetailedContent] = useState({});

	// Function to fetch detailed content
	const fetchDetailedContent = async (title) => {
		if (detailedContent[title]) {
			return; // Skip fetching if details are already available
		}

		const detailedData = await getDetailedRecipe(title);
		setDetailedContent((prevState) => ({
			...prevState,
			[title]: detailedData,
		}));
	};

	// Regular expression to split the options correctly
	const splitRegex = /\d+\./;

	// Extracting options from the API response
	let options = apiResponse
		? apiResponse.choices[0].message.content.split(splitRegex)
		: [];
	// Filter out empty strings and trim whitespace
	options = options
		.filter((option) => option.trim())
		.map((option) => option.trim());

	return (
		<div>
			<h2>Options</h2>
			<div className="accordion">
				{options.map((option, index) => (
					<Accordion
						key={index}
						title={`${index + 1}. ${option}`}
						details={detailedContent[`${index + 1}. ${option}`]} // Accessing details using the full title
						fetchDetails={() => fetchDetailedContent(`${index + 1}. ${option}`)} // Passing the full title
					/>
				))}
			</div>
		</div>
	);
};

export default AIOptions;
