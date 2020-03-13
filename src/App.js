// load up our libraries etc
import React, {Component} from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";
import {
  BrowserRouter as Router, 
  Route, 
  Switch,
} from 'react-router-dom'
// load up our comp
import SearchForm from './components/SearchForm'
import MainNav from './components/MainNav'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import PhotoList from './components/PhotoList'
import MainHeader from './components/MainHeader'
import ContentHeader from './components/ContentHeader'
import Loading from './components/Loading'
import Overlay from './components/Overlay'
// other stuff
import apiKey from './config'
import './App.scss';

class App extends Component {

  constructor() {
    super();
    this.state = {
      images: [],
      query: '',
      home:[],
      overlayImage:'',
      overlayActive:false,
      loading:true
    };
  }

  // these could be abstracted somewhere else but its just easy right here for now
  tags = ['skulls','squid','star citizen','graffitti','wingsuit']
  tagHeadlines = ['skullzi to rattle them bonez',
                  'It\'s Squidzzz baby.',
                  'Spacey operaz on-a-Toastieez',
                  'pretty pictuzes on pretier streeetzz',
                  'wheeeeeeeeeeeeeeeeeeeee !'
                 ]

  componentDidMount(){
    // setup the data
    this.tags.forEach((search)=>{ 
      this.performSearch(search,"load") 
    })
  }

  toggleLoading = (currentState) => {
    this.setState({ loading:currentState });
  }

  toggleOverlay = () => {
    this.setState(prevState=>{ 
      return{overlayActive:!prevState.overlayActive} 
    })
  }

  setOverlayImage = (imageUrl, e) => {
    this.setState(prevState=>{ 
      return{overlayImage:imageUrl} 
    })
  }

  processData = (data) => {
    // this build an object for displaying the flicker data
    const processedData = data.map((item)=>{
      const thumbUrl = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_q.jpg`
      const fullUrl = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`
      const desc = item.title
      const id = item.id
      return {desc, thumbUrl, fullUrl, id}
    })

    return processedData
  }

  performSearch = (query, context) => {
    const queryUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
   
    axios.get(queryUrl)
      .then(response => {
        // if no context its search and updates search images
        if(!context){
            this.setState(prevState =>{
              return { images: this.processData(response.data.photos.photo), 
                       query:query,
                       loading:false }
            });
        // if it's loading intial tag data for later    
        }else if(context === "load"){
            this.setState(prevState =>{
              return {
                  [query] : this.processData(response.data.photos.photo),
                  home:[ ...prevState.home, 
                      this.processData(response.data.photos.photo)[Math.floor(Math.random() * 12)],
                      this.processData(response.data.photos.photo)[Math.floor(Math.random() * 12)+13] ]
                }
            });
        }
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
    });
  }

  render(){
    return (
      <Router basename="/kpow-react-flicka">
        <MainHeader />
        <Overlay 
            overlayImage={this.state.overlayImage} 
            overlayActive={this.state.overlayActive}
            toggleOverlay={this.toggleOverlay} 
          />
        <div className="container">
          
          <Route path="/" render={routeProps => (
              <SearchForm {...routeProps} 
                          handleSearch={this.performSearch} 
                          toggleLoading={this.toggleLoading}
                />
          )} /> 

          <MainNav data={this.tags}/>

          <Switch>
                <Route exact path="/"  render={()=>{
                  if(this.state[this.tags[0]]){
                    return( <> 
                            <Helmet title="(Kpow)=>Pix" />
                            <Home />
                            <PhotoList 
                              data={this.state.home} 
                              query={null} 
                              toggleOverlay={this.toggleOverlay}
                              setOverlay={this.setOverlayImage}/> 
                            </>)
                    }else{ 
                      return <Loading /> 
                    }
                }} />
                
                {/* loop through tags to create routes */}
                { 
                  this.tags.map((tag, index)=>{
                    return(
                      <Route exact path={`/${tag}`} key={`${tag}-rooty-${index}`} render={()=>{
                        if(this.state[tag]){
                          return( <> 
                                  <Helmet title={`images for: ${tag}`} />
                                  <ContentHeader title={this.tagHeadlines[index]} key={`${tag}-${index}`} />
                                  <PhotoList 
                                    data={this.state[tag]} 
                                    query={null} key={`${index}-${tag}`}
                                    toggleOverlay={this.toggleOverlay} 
                                    setOverlay={this.setOverlayImage} /> 
                                  </>)
                          }else{ 
                            return <Loading />  
                          }
                      }} />  
                    )
                  })
                }

                <Route path="/search/:query" render={({match})=>(
                    <><Helmet title={`searched for: ${match.params.query}`} />
                      <PhotoList 
                        data={this.state.images} 
                        loading = {this.state.loading}
                        query={match.params.query} 
                        search={this.performSearch} 
                        setOverlay={this.setOverlayImage}
                        toggleOverlay={this.toggleOverlay}
                      /></>
                 )} />

                <Route component={PageNotFound} /> 
          </Switch>

        </div>
      </Router>
    )
  }
}

export default App;
