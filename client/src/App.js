import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Header from './Components/Header/Header'
import List from './Components/List/List'
import KontaktCard from './Components/KontaktCard/KontaktCard'
import KontaktFormular from './Components/KontaktFormular/KontaktFormular'



function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/test"/>
        <Route path="/kontakt/:id">
          <KontaktCard/>
        </Route>

        <Route path="/kontakt">
          <KontaktFormular/>
        </Route>
        
        <Route path="/">
          <List/>
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;
