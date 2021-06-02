import React from 'react';
import './shop.component.styles.scss';

import CollectionsOverview from '../collections-overview/collections-overview.component';

import {Route} from 'react-router-dom';

import CollectionPage from '../../pages/collection/collection.component';

import { firestore , convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

import { connect } from 'react-redux';
import {updateCollections} from '../../redux/shop/shop.actions';

import WithSpinner from '../with-spinner/with-spinner.component';


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  
    state = {
      loading : true
    }
  
  unSubscribeFromSnapshot = null ;

  componentDidMount() {
      const {updateCollections} = this.props;
      const collectionRef = firestore.collection('collections');

      // fetch("https://firestore.googleapis.com/v1/projects/crwn-db-f7e71/databases/(default)/documents/collections")
      // .then(response => response.json())
      // .then(collections => console.log(collections));

     collectionRef.get().then(snapshot => {
       const collectionsMap = convertCollectionSnapshotToMap(snapshot);
       console.log(collectionsMap);
       updateCollections(collectionsMap);
       this.setState({loading : false});
      });
  }

  render() {
    const { match } = this.props;
    const {loading } = this.state;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props)=> <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
        <Route path={`${match.path}/:collectionId`} render={(props)=> <CollectionsPageWithSpinner isLoading={loading} {...props} />} />
      </div>
  );
  }
} 

const mapDispatchToProps = dispatch => ({
  updateCollections : collectionsMap => dispatch(updateCollections(collectionsMap))
})


export default connect(null , mapDispatchToProps)(ShopPage);