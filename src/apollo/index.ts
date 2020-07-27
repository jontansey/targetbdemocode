import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { FORM_DATA } from '../gql/queries/formData';

const cache = new InMemoryCache();

const client = new ApolloClient({
	uri: 'https://48p1r2roz4.sse.codesandbox.io', // http://localhost:your-gql-server
	resolvers: {},
	cache,
});

cache.writeQuery({
	query: FORM_DATA,
	data: {
		name: '',
		age: '',
	},
});

cache.writeData({
	data: {
		name: '',
	},
});

export default client;
