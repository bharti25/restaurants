import React from 'react';
import Restaurants from '../src/components/Home/Restaurants';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import logo from './static/images/logo.png';

function App() {
  return (
    <div>
      {/* <head>
        <title>Restaurants</title>
        <link rel = "icon" href = {logo} type = "image/x-icon"></link>
      </head> */}
      <Restaurants />
    </div>
  );
}

library.add(faSearch)

export default App;
