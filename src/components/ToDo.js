import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { Form, Input, Button } from 'antd';
import { Divider } from 'antd';



class ToDo extends Component {
    constructor(){
        super();
        this.state={
            id:0,
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
        let task={id:this.state.id,title:this.state.task};
        this.state.tasks.push(task);
        this.setState({tasks:this.state.tasks});
        this.setState({id:this.state.id+1});
        this.saveToLocalStorage();

    }

    saveToLocalStorage=()=>{
        localStorage["tasks"] = JSON.stringify(this.state.tasks);
    }

    render(){
        return(
            <Card title="My To-do List">

               {this.state.tasks.length > 0 ?this.state.tasks.map((item)=>{
                return <DisplayTask task={item} key={item.id} />
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
        return  <Card type="inner" className="m-1">
            {this.props.task.title}   
            </Card>
    }
}

    export default ToDo;