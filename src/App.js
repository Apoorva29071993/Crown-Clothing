import React, { useEffect } from 'react';
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


const App = ({checkUserSession , currentUser}) => {

  useEffect(() => {
      checkUserSession();
  } , [checkUserSession]);

    return (
      <div>
        <Header/>
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckOutPage} />
        <Route path="/signin" render={() => currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );

}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser,
  collectionsArray : selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  checkUserSession : () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
