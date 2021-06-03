import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './components/shop/shop.component.jsx';
import {Route , Switch , Redirect } from 'react-router-dom';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';

import CheckOutPage from "./components/checkout/checkout.component.jsx";

import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

import { checkUserSession } from './redux/user/user.actions';


class App extends React.Component {

  unSubscribeFromAuth = null ;


//In this method after logging in from gmail we get userAuth object and if it is true we use createUserProfileDocument method
//to save a copy in firestore and send back the userRef object and after that we store it in the state object for local use
//auth.onAuthStateChanged is called after logging in from UI

//this.unSubscribeFromAuth --- onAuthStateChanged is a observer for a chain of  events that gets called when a user is added
  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  componentWillUnmount () {
    this.unSubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckOutPage} />
        <Route path="/signin" render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }

 
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser,
  collectionsArray : selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  checkUserSession : () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
