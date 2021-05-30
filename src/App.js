import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './components/shop/shop.component.jsx';
import {Route , Switch , Redirect } from 'react-router-dom';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import {auth , createUserProfileDocument} from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';

import CheckOutPage from "./components/checkout/checkout.component.jsx";


class App extends React.Component {

  unSubscribeFromAuth = null ;


//In this method after logging in from gmail we get userAuth object and if it is true we use createUserProfileDocument method
//to save a copy in firestore and send back the userRef object and after that we store it in the state object for local use
//auth.onAuthStateChanged is called after logging in from UI
  componentDidMount() {
    console.log("App Mounted");

    const {setCurrentUser} = this.props;

    this.unSubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        console.log("User auth started ");
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          
            setCurrentUser ({
              id : snapshot.id ,
              ...snapshot.data()
            })
         

          console.log(this.state);

        });

        
      }
      else{
        setCurrentUser(userAuth);
      }
     
    })
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
  currentUser : selectCurrentUser
})

//dispatch return the action setCurrentUser with argument user
const mapDispatchToProps = (dispatch) => ({
    setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps , mapDispatchToProps)(App);
