import React from 'react';

import './header.styles.scss';

import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import {connect } from 'react-redux';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';

import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { signOutStart } from '../../redux/user/user.actions';

const Header = ({currentUser , hidden , signOutStart}) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo"></Logo>
        </Link>

    <div className="options">
        <Link className="option" to="/shop">SHOP</Link>
        <Link className="option" to="/shop">CONTACT</Link>

        {
            currentUser ?
            (<div className="option" onClick={signOutStart}>SIGN OUT</div>)
            :
           ( <Link className="option" to="/signin">SIGN IN</Link>)
        }

        <CartIcon />

    </div>
        {
            hidden ? null : <CartDropDown />
        }
    

    </div>
);

//This method is used to get the values from the root reducer and send it to the Header component as props using connect method
const mapStateToProps =  createStructuredSelector({
    currentUser : selectCurrentUser ,
    hidden : selectCartHidden
})

const mapDispatchToProps = dispatch =>({
    signOutStart : () => dispatch(signOutStart())
})

export default connect(mapStateToProps , mapDispatchToProps)(Header);