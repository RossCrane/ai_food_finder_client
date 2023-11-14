import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';

export const ClerkFrontend = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function Clerk({ children }) {
	return <ClerkProvider frontend={ClerkFrontend}>{children}</ClerkProvider>;
}
