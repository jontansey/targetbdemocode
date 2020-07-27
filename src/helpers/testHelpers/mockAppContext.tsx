import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../../apollo';
import { MemoryRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-boost';

interface MockAppContextProps {
	mockClient?: ApolloClient<any>;
	mockRoute?: string;
}

const MockAppContext: React.FC<MockAppContextProps> = ({
	mockClient = client,
	mockRoute = '/',
	children,
}) => (
	<ApolloProvider client={mockClient}>
		<MemoryRouter initialEntries={[mockRoute]}>{children}</MemoryRouter>
	</ApolloProvider>
);

export default MockAppContext;
