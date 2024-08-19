import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar/index";

// Pages
import HomePage from "./pages/Homepage";
import AboutPage from "./pages/Aboutpage";
import SinglePage from "./pages/Singlepage";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/search/:searchTerm" component={SearchPage} />
          <Route path="/singleshow/:id" component={SinglePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
