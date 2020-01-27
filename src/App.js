import React from 'react';
import {Redirect, Switch} from 'react-router';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Results from './Components/Results.js'
import Quiz from './Components/Quiz.js'

function App() {
  return (
          <Router>
            <Switch>
              <Route exact path="/quiz" component={Quiz}/>
              <Route exact path="/results" component={Results}/>
              <Redirect from="/*" to="/quiz" />
            </Switch>
          </Router>
  );
}
export default App;
