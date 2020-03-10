import React, {Component} from 'react';
import {
  BrowserRouter as Router, 
  Route, 
  Switch
} from 'react-router-dom'
import axios from 'axios';

import SearchForm from './components/SearchForm'
import MainNav from './components/MainNav'
import PhotoList from './components/PhotoList'
import './App.scss';

class App extends Component {
  render(){
    return (
      <Router>
        <div className="container">
          
          <SearchForm />      

          <MainNav />

          <Switch>
              <Route exact path="/" component={PhotoList} />
              {/* <Route path="/about" render={ () => <About title='About' /> } />
              <Route exact path="/teachers" component={Teachers} />
              <Route path="/teachers/:topic/:name" component={Featured} />
              <Route path="/courses" component={Courses} />
              <Route component={NotFound} /> */}
          </Switch>

        </div>
      </Router>
      
    )
  }
}

export default App;
