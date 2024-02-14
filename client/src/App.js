import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
//import apollo and wrap it around everything so that any comp or any routes we have in here will have access to apollo client and in turn to graphql apis
import Clients from "./components/Clients";
import Projects from "./components/Projects";
import AddClientModal from "./components/AddClientModal";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

//creating client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <> {/*starting of fragement*/}
      <ApolloProvider client={client}> {/*wrapping ApolloClient to everything*/}
      <Router> {/*wrap everything within router tag...this step is performed when we setup react router, we create pages folder*/}
      <Header/>
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects/:id' element={<Project />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        {/*<AddClientModal />
        <Projects />
        <Clients /> , since we added Routes as you can see above, so these things are not longer of any use, will have these comps in Home now*/}
      </div>
      </Router>
      </ApolloProvider>
    </> /*ending of fragement*/
  );
}

export default App;
