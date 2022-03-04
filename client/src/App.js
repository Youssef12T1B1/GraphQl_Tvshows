import {
  ApolloClient,  ApolloProvider,InMemoryCache
} from "@apollo/client";

import TvshowList from "./components/TvshowList";
import AddTvshow from "./components/AddTvshow";
 const client = new ApolloClient({
   uri: 'http://localhost:5000/graphql',
   cache: new InMemoryCache()

 })

function App() {
  return (
      <ApolloProvider client={client}>
         <div id="app">
          <h1>Tv Shows Lists</h1>
          <TvshowList/>
          <AddTvshow/>
        </div>
      </ApolloProvider>
 
  );
}

export default App;
