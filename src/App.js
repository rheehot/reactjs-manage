import React from 'react';
import { HashRouter as Router,Route} from 'react-router-dom'; 
import AppNav from './components/AppNav';
import customer from './components/customer';
import Home from './components/Home';
import './App.css';

class App extends React.Component{
  render(){
    return(
      <div>
        <Router>
          <AppNav>
            <div>
              <Route exact path="/" component={Home}/>
              <Route exact path="/customer" component={customer}/>
            </div>
          </AppNav>
        </Router>
      </div>
    );
  }
};

export default App;