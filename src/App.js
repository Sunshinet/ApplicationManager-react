import React, { Component } from 'react';
import {BrowserRouter, Route , Switch, Redirect} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Form from './components/Forms/Create/Create';
import Navigation from './components/Navigation/Navigation';
import All from './components/Forms/All/All';
import FullApplication from './components/Forms/FullApplication/FullApllication';
import Edit from './components/Forms/Edit/Edit';
import './App.css';
class App extends Component {


  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Navigation/>
      <Layout>
      <Switch>
         <Route path = "/all-applications/:id/edit" component = {Edit}/>
         <Route path = "/all-applications/:id" component = {FullApplication}/>
         <Route path = "/all-applications" component = {All}/>
         <Route path="/new-application" component = {Form}/>
         <Redirect from="/" to="/all-applications"/>
      </Switch> 
      </Layout>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
