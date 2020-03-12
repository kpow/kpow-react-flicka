import React, {Component} from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router, 
  Route, 
  Switch,
} from 'react-router-dom'

import SearchForm from './components/SearchForm'
import MainNav from './components/MainNav'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import PhotoList from './components/PhotoList'
import MainHeader from './components/MainHeader'
import ContentHeader from './components/ContentHeader'

import apiKey from './config'
import './App.scss';

class App extends Component {

  constructor() {
    super();
    this.state = {
      images: [],
      query: '',
      loading:true
    };
  }
  
  componentDidMount(){
    this.performSearch();
  }

  processData(data){
    const processedData = data.map((item)=>{
      const thumbUrl = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_q.jpg`
      const desc = item.title
      const id = item.id
      return {desc, thumbUrl, id}
    })

    return processedData
  }
  
  
  performSearch = (query = 'skulls') => {
    const queryUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
    // this is weird conditional because if i dont do this it fires continous
    if(this.state.query !== query){

      axios.get(queryUrl)
        .then(response => {

          this.setState(prevState =>{
            return {
              images: this.processData(response.data.photos.photo),
              query:query,
              loading:false
          }});
         
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
      });
    }  
  }

  render(){
    return (
      <Router>
        <MainHeader />
        <div className="container">

          <Route path="/" render={routeProps => (
              <SearchForm {...routeProps} handleSearch={this.performSearch}/>
          )} /> 

          <MainNav />

          <Switch>
              <Route exact path="/"  render={()=>{
                return( <> <Home />
                          <PhotoList data={this.state.images} query={this.state.query} /> </>)
              }} />
              <Route exact path="/squids"  render={(match)=>{
                  this.performSearch('squid')
                  return (<><ContentHeader title="It's Squidzzz baby." />
                          <PhotoList data={this.state.images} query={this.state.query} /> </>)
              }} />
              <Route exact path="/voodoo"  render={(match)=>{
                  this.performSearch('voodoo')
                  return (<><ContentHeader title="The Voodoozz you dozz" />
                          <PhotoList data={this.state.images} query={this.state.query} /></> )
              }} />
               <Route exact path="/mars"  render={(match)=>{
                  this.performSearch('mars')
                  return (<><ContentHeader title="To Marzzz and abooovez" />
                        <PhotoList data={this.state.images} query={this.state.query} /></> )
              }} />
              <Route path="/search/:query" render={(match)=>{
                  this.performSearch(match.match.params.query)
                  return <PhotoList data={this.state.images} query={this.state.query} />
              }} />
              <Route component={PageNotFound} /> 
          </Switch>
            
          

        </div>
      </Router>
    )
  }
}

export default App;
