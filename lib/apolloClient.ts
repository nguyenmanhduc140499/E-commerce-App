import {
    createHttpLink,
    ApolloClient,
    InMemoryCache,
} from "@apollo/client";
console.log(process.env.GRAPHQL_API_URL)
const httpLink = createHttpLink({
    uri: `${process.env.GRAPHQL_API_URL}/graphql`,
});
const client = new ApolloClient({
    link: httpLink,
    credentials: "include",
    cache: new InMemoryCache({ resultCaching: false }),// Disables result caching. Turn false in development evn
});
export default client