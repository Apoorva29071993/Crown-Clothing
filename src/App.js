import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './components/shop/shop.component.jsx';
import {Route , Switch } from 'react-router-dom';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import {auth , createUserProfileDocument} from './firebase/firebase.utils';


class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      currentUser : null
    }
  }

  unSubscribeFromAuth = null ;


//In this method after loggin in from gmail we get userAuth object and if it is true we use createUserProfileDocument method
//to save a copy in firestore and send back the userRef object and after that we store it in the state object for local use
  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser : {
              id : snapshot.id ,
              ...snapshot.data()
            }
          });

          console.log(this.state);

        });

        
      }
      else{
        this.setState({currentUser : userAuth})
      }
     
    })
  }

  componentWillUnmount () {
    this.unSubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }

 
}

export default App;
