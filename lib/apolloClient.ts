import {
    createHttpLink,
    ApolloClient,
    InMemoryCache,
} from "@apollo/client";

const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    credentials: "include",
});
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({ resultCaching: false }),// Disables result caching. Turn false in development evn
});
export default client