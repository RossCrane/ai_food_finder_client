import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [apiResponse, setApiResponse] = useState(null);
	const [detailedResponse, setDetailedResponse] = useState(null);

	return (
		<AppContext.Provider
			value={{
				apiResponse,
				setApiResponse,
				detailedResponse,
				setDetailedResponse,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
