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
import Loading from './components/Loading'

import apiKey from './config'
import './App.scss';

class App extends Component {

  constructor() {
    super();
    this.state = {
      images: [],
      query: ''
    };
  }
  
  tags = ['skulls','squid','voodoo','mars']
  headlines = ['skulls to rattle them bonez',
               'It\'s Squidzzz baby.',
               'The Voodoozz you dozz',
               'To Marzzz and abooovez' ]

  componentDidMount(){
    this.tags.forEach((search)=>{ 
      this.performSearch(search,"load") 
    })
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

  performSearch = (query, context) => {
    const queryUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
    // this is weird conditional because if i dont do this it fires continous
    if(this.state.query !== query){
      axios.get(queryUrl)
        .then(response => {
          if(!context){
            this.setState(prevState =>{
              return {
                images: this.processData(response.data.photos.photo),
                query:query
            }});
          }else if(context === "load"){
              this.setState(prevState =>{
                return {
                  [query] : this.processData(response.data.photos.photo)
              }});
          }
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
                  if(this.state[this.tags[0]]){
                    return( <> <Home />
                            <PhotoList data={this.state[this.tags[0]]} query={this.tags[0]} /> </>)
                    }else{ return <Loading />  }
                }} />

                <Route exact path={`/${this.tags[1]}`} render={()=>{
                  if(this.state[this.tags[1]]){
                    return( <> <ContentHeader title={this.headlines[1]} />
                            <PhotoList data={this.state[this.tags[1]]} query={null} /> </>)
                    }else{ return <Loading />  }
                }} />

                <Route exact path={`/${this.tags[2]}`}  render={()=>{
                  if(this.state[this.tags[2]]){
                    return( <> <ContentHeader title={this.headlines[2]} />
                            <PhotoList data={this.state[this.tags[2]]} query={null} /> </>)
                    }else{ return <Loading />  }
                }} />

               <Route exact path={`/${this.tags[3]}`}  render={()=>{
                  if(this.state[this.tags[3]]){
                    return( <> <ContentHeader title={this.headlines[3]} />
                            <PhotoList data={this.state[this.tags[3]]} query={null} /> </>)
                    }else{ return <Loading />  }
                }} />

                <Route path="/search/:query" render={({match})=>{
                    this.performSearch(match.params.query)
                    if(this.state.images){
                      return <PhotoList data={this.state.images} query={this.state.query} />
                    }else{ return <Loading /> }
                }} />

                <Route component={PageNotFound} /> 
          </Switch>

        </div>
      </Router>
    )
  }
}

export default App;
