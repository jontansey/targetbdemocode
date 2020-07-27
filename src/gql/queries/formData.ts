import { gql } from 'apollo-boost';

export const FORM_DATA = gql`
	query getFormData {
		name @client
		age @client
	}
`;
