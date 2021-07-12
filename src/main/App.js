import React from 'react';

import Rotas from './Rotas';
import NavBar from '../components/NavBar';

import 'toastr/build/toastr.min.js';

import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';
import 'toastr/build/toastr.css';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class App extends React.Component {

  render(){

    return (
      <>
        <NavBar />
      <div className="container">
            <Rotas />
        </div>
      </>
    );
  }
}

export default App;
