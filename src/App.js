import React, { Component } from 'react';
import ListContacts from './ListContacts';

class App extends Component {

  state = {
    contacts: [
      {
        "id": "pat",
        "name": "Patrick Howard",
        "email": "patrick.howard@xio.com",
        "avatarURL": "http://localhost:5001/ryan.jpg"
      },
      {
        "id": "bill",
        "name": "Bill Smith",
        "email": "bill@xio.com",
        "avatarURL": "http://localhost:5001/michael.jpg"
      },
      {
        "id": "sally",
        "name": "Sally West",
        "email": "sally@xio.com",
        "avatarURL": "http://localhost:5001/tyler.jpg"
      }
    ]
  }

  removeContact = (contact) => {
    this.setState( (state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id )
    }) )
  }
  render() {
    return (
      <ListContacts onDeleteContact = { this.removeContact }
                    contacts={this.state.contacts} />
    );
  }
}

export default App;
