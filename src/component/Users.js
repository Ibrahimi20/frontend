import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
//import Button from 'react-bootstrap'


export default class Users extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Fonction : '',
        nom : '',
        prenom : '',
        email : '',
        CNI: ''
}
      this.onchangeFonction = this.onchangeFonction.bind(this);
      this.onChangeNom = this.onChangeNom.bind(this);
      this.onChangePrenom = this.onChangePrenom.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangeCNI = this.onChangeCNI.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

}
   

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    
    onchangeFonction(e){
      this.setState({
        Fonction :e.target.value
      })
    }
    onChangePrenom(e){
      this.setState({
        prenom : e.target.value
      })
    }
    onChangeNom(e){
      this.setState({
        nom : e.target.value
      })
    }
    onChangeEmail(e){
      this.setState({
        email : e.target.value
      })
    }
    onChangeCNI(e){
      this.setState({
        CNI : e.target.value
      })
    }
    cancelForm = ()=>{
      console.log('Reset clicked');
      this.setState({
        Fonction : '',
        nom : '',
        prenom : '',
        email : '',
        CNI: ''
      })
    }
    onSubmit(e){
      e.preventDefault();
      const personne = {
        Fonction : this.state.Fonction,
        nom :this.state.nom ,
        prenom : this.state.prenom,
        CNI : this.state.CNI,
        email : this.state.email,

      }
      console.log(personne);

      axios.post('http://localhost:5000/add',personne).then(res => res.status(200).json('add succed'))
      .catch(err=> console.log(err));
     

         window.location = '/'

    };
    

    


    
  
    render() {
      return (
        <div className='App d-flex flex-column align-items-center'>
          <h1>Ajouter Participant</h1>
          <Form onSubmit = {this.onSubmit} style={{ width: '300px' }}>
            <Form.Group>
              <Form.Label>Fonction</Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Control as='select' required  value={this.state.Fonction}
                            onChange = {this.onchangeFonction}
          >
                <option >Choisir Fonction</option>
                <option value="Etudiant">Etudiant</option>
                <option value="Enseignant">Enseignant</option>
                <option value="Jury">Jury</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <Form.Control type='text' required   value={this.state.nom} onChange={ this.onChangeNom} />
            </Form.Group>
        
            <Form.Group>
              <Form.Label>Prenom</Form.Label>
              <Form.Control type='text'  required value={this.state.prenom} onChange={this.onChangePrenom} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required  value={this.state.email} onChange={this.onChangeEmail} />
            </Form.Group>
            
            <Form.Group>
              <Form.Label>CNI</Form.Label>
              <Form.Control type='text'  required value={this.state.CNI} onChange={this.onChangeCNI}/>
            </Form.Group>


            <Form.Group>
              <Button type='submit' >Ajouter</Button>
              <Button type='reset' style = {{float : "right"}} variant="light" onClick = {this.cancelForm} >Reset</Button>
            </Form.Group>
            
      </Form>
    </div>
      );
    }
  }