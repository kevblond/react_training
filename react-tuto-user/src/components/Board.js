import React, { Component } from 'react';
import './Board.css';
import Ceil from './Ceil.js';
import EmptyCeil from "./EmptyCeil";
import { Redirect } from "react-router-dom";
import Network from '../services/NetworkService.js';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      form: false,
      shouldRedirect: false
    };
  }

  componentDidMount() {
    // localStorage.removeItem('users');
    const localUsernameArray = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    console.log("localstorage " + localUsernameArray);
    const users = [];
    localUsernameArray.forEach((username) => {
      Network.net_get(username).then((user) => {
        users.push(user);
      }).finally(() => {
        console.log("setState get");
        this.setState({
          users: users,
        });
      });
    });
  }

  launchForm = () => {
    this.setState({
      shouldRedirect: true,
    });
  };

  clearStorage = () => {

    let localUsernameArray = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    let usersCopy = this.state.users;
    localUsernameArray.forEach((user) => {

      Network.net_delete(user).then(() => {
        usersCopy = usersCopy.filter((el)=>{
          return el.email === user;
        });
        let indexUsernameFound;
        if ((indexUsernameFound = localUsernameArray.indexOf(user)) > -1) {
          localUsernameArray.splice(indexUsernameFound, 1);
        }

      }).catch((error) => {
        alert("erreur lors de la suppression de " + user);
        console.log(error);

      }).finally(() => {
        localStorage.setItem('users', JSON.stringify(localUsernameArray));
        console.log('setState delete');
        this.setState({
          users: usersCopy,
        });
      });
    });
  };

  renderCeils = () => {
    return this.state.users.map(({firstName, lastName, email}, i) => (
      <Ceil key={i} firstName={firstName} lastName={lastName} email={email}/>
    ));
  };

  render() {
    return (
      this.state.shouldRedirect
        ? <Redirect to="/form"/>
        : <div className="users">
          {this.renderCeils()}
          <EmptyCeil onClick={this.launchForm}/>
          <button onClick={() => this.clearStorage()}>clear</button>
        </div>
    );
  }
}

export default Board;