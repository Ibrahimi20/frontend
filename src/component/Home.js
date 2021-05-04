import axios from 'axios';
import React from 'react';
import {Link} from "react-router-dom";

const Person = props=>{
  return (<tr>
    <td>{props.person.Fonction}</td>
    <td>{props.person.nom}</td>
    <td>{props.person.prenom}</td>
    <td>{props.person.email}</td>
    <td>{props.person.CNI}</td>
    <td>
      <Link to={"/Edit/" + props.person._id}>Edit</Link>|  <a href="#" onClick={() => { props.deletePerson(props.person._id) }}>delete</a>
    </td>
  
</tr>)
}


export default class Users extends React.Component{
    constructor(props){
    
      super(props);
      this.state = {
        personnes : []  
      }  


      this.deletePerson = this.deletePerson.bind(this);
    }
    componentDidMount(){

      axios.get('http://localhost:5000/').then(response=>{
        console.log(response.data);
        this.setState({personnes : response.data})
        
      }).catch((error)=>{
        console.log(error);
      })
    }

    personeList(){
      return this.state.personnes.map(currentPerson => {
        return <Person key={currentPerson._id} deletePerson = {this.deletePerson} person = {currentPerson}/>
      })
    }

    deletePerson(id){
      axios.delete('http://localhost:5000/'+id).then(res=>console.log(res.data));

      this.setState({
        personnes : this.state.personnes.filter(el => el._id != id)
      })
     
    }


    render(){
      return(
        <div>
           <h3>Personnes</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Fonction</th>
              <th>nom</th>
              <th>prenom</th>
              <th>email</th>
              <th>CNI</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.personeList() }
          </tbody>
        </table>

        </div>
      )
    }
  }