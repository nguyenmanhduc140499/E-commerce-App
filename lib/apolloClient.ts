import {
    createHttpLink,
    ApolloClient,
    InMemoryCache,
} from "@apollo/client";

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
});
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({ resultCaching: false }),// Disables result caching. Turn false in development evn
});
export default client