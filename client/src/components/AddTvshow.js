
import { graphql } from '@apollo/client/react/hoc';
import * as compose from 'lodash.flowright';
import { Component } from "react";
import {getDirectorsQuery, addTvshowMutation, getTvshowsQuery}  from '../queries/queries'

class AddTvshow extends Component{ 
    constructor(props){
        super(props)
        this.state = {
            title:"",
            story:"",
            realseDate:"",
            EpNumber:parseInt(1),
            genre:"",
            DirectorId:"",
        }
    }



    displayDirectors(){
        var data =  this.props.getDirectorsQuery
  
        if(data.loading){
            return(<option>loading Directors</option>)
        }else{
            return data.directors.map(director=>{
                return(
                    <option key={director.id} value={director.id} >{director.name}</option>
                )
            })
        }
    }

    submitForm(e){
        e.preventDefault();
        console.log(this.state);
      this.props.addTvshowMutation({
            variables: {
                title: this.state.title,
                story: this.state.story,
                realseDate: this.state.realseDate,
                EpNumber: this.state.EpNumber,
                genre: this.state.genre,
                DirectorId: this.state.DirectorId
           
        },
        refetchQueries: [{ query: getTvshowsQuery }]
      
        })
       
    }

   render(){
    
     return (
      <form id="add_tvShow" onSubmit={ this.submitForm.bind(this) }>
          <div className="field">
              <label>Tvshow title:</label>
              <input type="text" onChange={(e)=> this.setState({title:e.target.value})}/>
          </div>
          <div className="field">
              <label>Story:</label>
              <input type="text" onChange={(e)=> this.setState({story :e.target.value})}/>
          </div>
          <div className="field">
              <label>RealseDate:</label>
              <input type="text" onChange={(e)=> this.setState({realseDate:e.target.value})}/>
          </div>
          <div className="field">
              <label>EpNumber:</label>
              <input type="number"  onChange={(e)=> this.setState({EpNumber:parseInt(e.target.value)})}/>
          </div>

          <div className="field">
              <label>Genre:</label>
              <input type="text" onChange={(e)=> this.setState({genre:e.target.value})}/>
          </div>

          <div className="field">
              <label>Director:</label>
              <select onChange={(e)=> this.setState({DirectorId:e.target.value})}>
            {this.displayDirectors()}
            </select>
          </div>
            <button>+</button> 
      </form>

     )}
 }
   
   export default compose(
   graphql(getDirectorsQuery,{name:"getDirectorsQuery"}),
   graphql(addTvshowMutation,{name:"addTvshowMutation"})
   
   )(AddTvshow);