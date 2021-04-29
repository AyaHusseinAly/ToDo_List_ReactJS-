import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';


class Movies extends React.Component{

    constructor(props){
        super();
        this.state={
        }
    }

    render(){
        return <div>
            <MovieList />
        </div>
    }
}

class MovieList extends React.Component{

    constructor(){
        super();
        this.state={
            movies:[],
            loading:false
        };
    }

    async componentDidMount(){
        this.setState({loading:true});
        setTimeout(async ()=>{

        
        let res= await fetch("https://api.themoviedb.org/3/movie/popular?api_key=8502e697a810bde0cc7964dda7b20da9&page=1",{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        });
        let resJson = await res.json();
        console.log(resJson.results);
        this.setState({movies:resJson.results,loading: false});
    },1000)
    }

    render(){
        return<div className="container">
        {!this.state.loading ? this.state.movies.map((item)=>{
            return <MovieView key={item.id}  movie={item} />
        }): "Loading Movies"}
    </div>
    }
}

class MovieView extends React.Component{
    constructor(){
        super();
        
    }

    render(){
        return( 
        <Card
        className="m-2"
        hoverable
        style={{ 
            width: 400,height:"auto",display: "flex",
        //justifyContent: "center",
        //alignItems: "left" 
    }}
        cover={<img src={"https://image.tmdb.org/t/p/w500"+this.props.movie.poster_path} style={{width:100,height:100}} />}
      >
        <div>{this.props.movie.original_title}</div>
      </Card>
        );
    }
}

export default Movies;