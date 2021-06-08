import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./components/Homepage";
import Newsdetails from "./components/Newsdetails";
import SearchResults from "./components/SearchResults";
import Bookmarkslist from "./components/Bookmarkslist";
import "./styles.css";

function App() {
  return (
    <Layout>
      <div className="container">
        <Switch>
          <Route component={Homepage} path="/" exact />
          <Route component={Bookmarkslist} path="/boomarkslist" exact />
          <Route component={SearchResults} path="/search" exact />
          <Route component={Newsdetails} path="/" />
        </Switch>
      </div>
    </Layout>
  );
}

export default App;
