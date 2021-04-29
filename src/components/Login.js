import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './ToDo';




class Login extends Component {

    constructor(props){
        super();
        this.state={
            username:"",
            password:"",
            email:"",
        }
        
    }

    setInputValue=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    login=async ()=>{
        let user = {
            email:this.state.email,
            password:this.state.password
        }
        let res= await fetch("https://reqres.in/api/login",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(user)
        });
        let resJson = await res.json();
        if(resJson.token){
            //alert("Login success");
            localStorage.logged=true;
            this.props.rerenderParentCallback();

        }else{
            alert(resJson.error)
        }
    }
    render() {

        return (
            <div>
                
                <div className="App-header">
                    <h1>Login</h1>
                    Username:<input type="text" value={this.state.username} onChange={this.setInputValue} name="username" /><br/>
                    Password:<input type="password" style={{color:"black"}} value={this.state.password} onChange={this.setInputValue} name="password" /><br/>
                    Email:<input type="email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} name="email" /><br/>
                    <button onClick={this.login} style={{color:"black"}}>Login</button>
                </div>
            </div>

        );
    }
}


    export default Login;