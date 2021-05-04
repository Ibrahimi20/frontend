import React from 'react';
import axios from 'axios';
import {Form, Button} from 'react-bootstrap';


export default class Edit extends React.Component {
    constructor(props){
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
    componentDidMount(){
        axios.get('http://localhost:5000/'+ this.props.match.params.id).then(res=>{
            this.setState({
                Fonction : res.data.Fonction,
                nom : res.data.nom,
                prenom : res.data.prenom,
                email : res.data.email,
                CNI: res.data.CNI
                })
        }).catch(err=> alert(err));
    }
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

        axios.post('http://localhost:5000/update/'+ this.props.match.params.id,personne)
        .then(res=>{
          console.log(res.data)
          console.log('Student successfully updated')
        }).catch(err=> console.log(err))

      }
      

    render(){
        return (
            <div>
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
                        <Button variant ='danger' type='submit' >Update personne </Button>
                        
                    </Form.Group>
                
        </Form>

            </div>
        )
    }


}