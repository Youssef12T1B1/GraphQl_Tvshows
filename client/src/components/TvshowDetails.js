
import { graphql } from '@apollo/client/react/hoc';

import { Component } from "react";
import {getTvshowQuery} from '../queries/queries'

class TvshowDetail extends Component{ 
    displayTvshowDetails(){
        const {tvshow} =this.props.data 
        if(tvshow){
            return(
                <div>
                    <h2> {tvshow.title} </h2>
                    <p>{tvshow.story} </p>
                    <p>{tvshow.genre} </p>
                    <p>First episode aired on :{tvshow.realseDate} </p>
                    <p>Total Eps: {tvshow.EpNumber} </p>
                    <p>Director: {tvshow.director.name} </p>
                    <p>All Tvshows directed by : {tvshow.director.name}</p>
                    <ul className='other-stuff'>
                        {tvshow.director.tvshows.map(tv =>{
                            return <li key={tv.id}> {tv.title}</li>
                        })}
                    </ul>
                    
                    

                </div>
            )
        }
        else{
                return(
                    <div> NO TvShow Selected!!!</div>
                )
            }
    }

render(){

  
    return(
        <div id='tvshow_detail'>
               {this.displayTvshowDetails()}

        </div>
    )
}
}

export default graphql(getTvshowQuery, {
    options:(props)=>{
        return{
            variables:{
                id:props.tvshowID
            }
        }
    }
})(TvshowDetail)