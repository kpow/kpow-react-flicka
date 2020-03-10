import React from 'react';
import SearchForm from './components/SearchForm'
import MainNav from './components/MainNav'
import PhotoList from './components/PhotoList'
import './App.css';

function App() {
  return (
    
    <div className="container">
      
      <SearchForm />      

      <MainNav />

      <PhotoList />

    </div>
    
  );
}

export default App;
