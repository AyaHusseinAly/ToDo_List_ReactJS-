import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { Form, Input, Button } from 'antd';
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';



class ToDo extends Component {
    constructor(){
        super();
        this.state={
            task:"",
            tasks:[]
        }
    }
    componentDidMount(){
        if(localStorage["tasks"]){
        let tasks = JSON.parse(localStorage["tasks"])
        
        this.setState({tasks:tasks})
        }
    }

    addtask=()=>{
        let id=0;
        if(this.state.tasks.length!=0)
            id=this.state.tasks[this.state.tasks.length-1].id+1;

        let task={id:id,title:this.state.task,done:false};
        this.state.tasks.push(task);
        this.setState({tasks:this.state.tasks});
        this.saveToLocalStorage();

    }

    saveToLocalStorage=()=>{
        localStorage["tasks"] = JSON.stringify(this.state.tasks);
    }
    donetask=(id)=>{
        let index;
        for (var i=0; i < this.state.tasks.length; i++) {
            if (this.state.tasks[i].id === id) {
                index = i;
            }
        }
        //console.log(id)
        //console.log(index)
        this.state.tasks[index].done=true;
        this.setState({tasks:this.state.tasks});
        this.saveToLocalStorage();

    }
    removetask=(id)=>{
        let index;
        for (var i=0; i < this.state.tasks.length; i++) {
            if (this.state.tasks[i].id === id) {
                index = i;
            }
        } 
        this.state.tasks.splice(index, 1);
        this.setState({tasks:this.state.tasks});
        this.saveToLocalStorage();
     
    }
    render(){
        return(
            <Card title="My To-do List">

               {this.state.tasks.length > 0 ?this.state.tasks.map((item)=>{
                return <DisplayTask task={item} key={item.id} doneTask={this.donetask} removeTask={this.removetask}/>
            }):"No tasks yet"}


                <div   style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                        }}   
                        className="m-1">
                    <Form>
                        <span className="m-2"><b>Task</b></span>
                        <Input
                            type="text"
                            style={{
                            width: 250,
                            }}
                            className="m-2"
                            onChange={(e)=>this.setState({task:e.target.value})}
                        />
                            <Button type="primary" htmlType="submit" className="m-2" onClick={this.addtask}>Add</Button>

                    </Form>
                </div>
            </Card>
        );
    }

}

class DisplayTask extends React.Component{
    render(){
        let style={
            backgroundColor:"Aquamarine"
        }
        if(this.props.task.done==false){
            return  <Card type="inner" className="m-1">
                {this.props.task.title}   
                <div style={{float:"right"}}>
                    <CheckCircleOutlined className="m-1" style={{ fontSize: '200%', color:"green"}} onClick={()=>this.props.doneTask(this.props.task.id)}/>
                    <CloseCircleOutlined className="m-1" style={{ fontSize: '200%', color:"red"}} onClick={()=>this.props.removeTask(this.props.task.id)} />

                </div>
                </Card>
        }
        else{
            return  <Card type="inner" className="m-1" style={style}>
            {this.props.task.title}   
            <div style={{float:"right"}}>
                    <CheckCircleOutlined className="m-1" style={{ fontSize: '200%', color:"green"}} onClick={()=>this.props.doneTask(this.props.task.id)}/>
                    <CloseCircleOutlined className="m-1" style={{ fontSize: '200%', color:"red"}} onClick={()=>this.props.removeTask(this.props.task.id)} />

            </div>
            </Card>
        }
    }
}

    export default ToDo;