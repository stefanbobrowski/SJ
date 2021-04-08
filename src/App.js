import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Album from './pages/Album/Album.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';
import PageNotFound from './pages/PageNotFound/PageNotFound.jsx';
import Header from './components/Header/Header.jsx';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Album albumName={'I'} />
        </Route>
        <Route exact path="/I">
          <Album albumName={'I'} />
        </Route>
        <Route exact path="/II">
          <Album albumName={'II'} />
        </Route>
        <Route exact path="/III">
          <Album albumName={'III'} />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>

        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
