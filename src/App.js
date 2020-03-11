import React, {Component} from 'react';
import axios from 'axios';
import apiKey from './config'
import {
  BrowserRouter as Router, 
  Route, 
  Switch,
  withRouter
} from 'react-router-dom'


import SearchForm from './components/SearchForm'
import MainNav from './components/MainNav'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import PhotoList from './components/PhotoList'
import MainHeader from './components/MainHeader'


import './App.scss';



class App extends Component {

  constructor() {
    super();
    this.state = {
      images: [],
      query: '',
      loading: true
    };
  }
  
  componentDidMount(){
    this.performSearch();
  }

  processData(data){
    const processedData = data.map((item)=>{
      const thumbUrl = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_q.jpg`
      const desc = item.title
      return {desc, thumbUrl}
    })

    return processedData
  }
  
  performSearch = (query = 'skulls') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState(prevState=>{
          return {
            images: this.processData(response.data.photos.photo),
            query:query,
            loading: false
          }
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      }); 
  }

  render(){
    return (
      <>
      <MainHeader />
      <Router>
        <div className="container">
          
        <SearchForm handleSearch={this.performSearch}/>    

          <MainNav />

          <Switch>
              <Route exact path="/"  component={Home} />
              <Route path="/search/:query" 
                     render={({match}) => { this.performSearch(match.params.query) }}/> 
              <Route component={PageNotFound} /> 
          </Switch>

          <PhotoList data={this.state.images} query={this.state.query} />            

        </div>
      </Router>
      </>
    )
  }
}

export default App;
