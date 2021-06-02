import React from 'react';
import './homepage.styles.scss'
import Directory from '../../components/directory/directory.component';

import { HomePageContainer } from './homepage.styles.jsx';

const HomePage = () => (
    <HomePageContainer>
        <Directory />
    </HomePageContainer>
);

export default HomePage;