
import { graphql } from '@apollo/client/react/hoc';
import { Component } from "react";

import {getTvshowsQuery}  from '../queries/queries'
import TvshowDetails from './TvshowDetails';


class TvshowList extends Component{
  constructor(props){
    super(props)
    this.state={
      selected: null
    }
  }
   displayTvshows(){
       var data = this.props.data
       if(data.loading){
           return(<div> loading Tvshows ... </div>)
       }else{
           return data.tvshows.map(tvshow=>{
               return(
                   <li key={tvshow.id} onClick={(e)=>{this.setState({selected:tvshow.id})}}>{tvshow.title}</li>
               )
           })
       }
   }

  render(){
   
    return (
      <div >
            <ul id="tvshow_list">
              { this.displayTvshows()}
            </ul>
            <TvshowDetails tvshowID={this.state.selected}/>
      </div>
    );
  }
}
  
  export default graphql(getTvshowsQuery)(TvshowList);