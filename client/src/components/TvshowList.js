import {gql}  from "@apollo/client";
import { graphql } from '@apollo/client/react/hoc';
import { Component } from "react";

const getTvshowQuery = gql`
{
    tvshows{
        id
        title
    

    }
}
`

class TvshowList extends Component{
   displayTvshows(){
       var data = this.props.data
       if(data.loading){
           return(<div> loading Tvshows ... </div>)
       }else{
           return data.tvshows.map(tvshow=>{
               return(
                   <li key={tvshow.id} >{tvshow.title}</li>
               )
           })
       }
   }

  render(){
   
    return (
      <div id="app">
            <ul id="tvshow_list">
              { this.displayTvshows()}
            </ul>
      </div>
    );
  }
}
  
  export default graphql(getTvshowQuery)(TvshowList);