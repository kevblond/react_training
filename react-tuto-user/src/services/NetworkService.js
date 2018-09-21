import axios from 'axios';
import User from '../models/User.js';

class Network {
  static net_post = ({firstName,lastName,email}) => {
    console.log(firstName+ " "+lastName+ " " +email);
    console.log(process.env.REACT_APP_BASE_URL);
    return new Promise(((resolve, reject) => {
      axios.post(process.env.REACT_APP_BASE_URL + '/user', {
        username: email,
        firstName: firstName,
        lastName: lastName,
        email: email
      }).then((response) => {
        console.log(response);
        resolve();
      })
        .catch((error) => {
          reject(error);
        });
    }));
  };

  static net_get = (user) => {
    return new Promise((resolve,reject) => {
      axios.get(process.env.REACT_APP_BASE_URL + '/user/' + user)
        .then((response) => {
          resolve(new User(response.data.firstName, response.data.lastName, response.data.email));
          console.log(user + " get");
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  };

  static net_delete = (user) => {
    return new Promise((resolve,reject) => {
      axios.delete(process.env.REACT_APP_BASE_URL + '/user/' + user).then((response) => {
          console.log("delete " + user);
          console.log(response);
          resolve();
        }).catch((error) => {
          reject(error);
        });
    });
  };
}

export default Network;