import React, { Component } from 'react';
import './Form.css';
import { Redirect } from "react-router-dom";
import Network from "../services/NetworkService";
import User from '../models/User.js';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      shouldRedirect: false
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  launchPost = () => {
    if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === '') {
      alert("contenu manquant");
      return;
    }

    if (!this.state.email.includes('@')) {
      alert("adresse mail invalide");
      return;
    }

    let userNameArray = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    if (userNameArray.includes(this.state.email)) {
      alert("un compte utilisant cette adresse éléctronique existe déjà");
      return;
    }

    let user = new User(this.state.firstName,this.state.lastName,this.state.email);

    Network.net_post(user).then(() => {
      //ajout username local store
      userNameArray.push(this.state.email);
      localStorage.setItem('users', JSON.stringify(userNameArray));
      this.setState({
        shouldRedirect: true,
      });
      console.log(this.state.email + " posted");
    }).catch((error) => {
        console.log(error);
        alert("erreur lors de l'envoie du formulaire");
    });

  };

  render() {
    return (
      this.state.shouldRedirect ?
        <Redirect to="/"/>
        :
        <div className="form">
          <input type="text" name='lastName' placeholder='Nom' value={this.state.lastName}
                 onChange={this.handleChange}/>
          <input type="text" name='firstName' placeholder='Prénom' value={this.state.firstName}
                 onChange={this.handleChange}/>
          <input type="email" name='email' placeholder='email' value={this.state.email} onChange={this.handleChange}/>
          <button onClick={() => this.launchPost()}>CREER</button>
        </div>
    );
  }
}

export default Form;

