import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import ToDo from './components/ToDo';
import Movies from './components/Movies';

  

import { Navbar, Nav } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

    
  

class App extends Component {
    constructor(props){
        super();
        this.state={
            render:"",
            
        }
        
    }

    rerenderParentCallback=()=> {
        this.forceUpdate();
        //this.setState({rerender:"render"}); 
        //console.log("rerender");
      }
    logout=()=>{
        localStorage.removeItem("logged");
        this.forceUpdate();
    }   
    render() {
        let style={
            color:"Cyan"
        }
            if(localStorage.logged){
            
                return (
                
                <Router className="App">
                    <div>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand>ReactJS</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                            <div >
                                <Link to="/" className="m-2">To-Do</Link>    
                                <Link to="/movies" className="m-2">Movies</Link>
                                <button className="m-2 btn text-white" onClick={this.logout}>Logout</button>
                            </div>
                    
                            </Nav>
                            <Nav>
                            
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                        {/* A <Switch> looks through its children <Route>s and
                            renders the first one that matches the current URL. */}
                        <Switch>
                        <Route path="/movies">
                            <Movies></Movies>
                        </Route>
                        <Route path="/">
                            <ToDo></ToDo>
                        </Route>
                        </Switch>
                    </div>
                </Router>
        
                );
            }
            else{
                return (
                    <Login rerenderParentCallback={this.rerenderParentCallback}></Login>
                );
            }
    }
}


    export default App;