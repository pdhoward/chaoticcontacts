import React, { Component }   from 'react';
import ListContacts           from './ListContacts';
import * as ContactsAPI       from './utils/ContactsAPI'
import CreateContact          from './CreateContacts'
import { Route }              from 'react-router-dom'



class App extends Component {
  state = {
    contacts: [ ]
  }

  removeContact = (contact) => {
    this.setState( (state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id )
    }) )
    ContactsAPI.remove(contact)
  }
  addContact = (contact) => {
    this.setState( (state) => ({
      contacts: this.state.contacts.push(contact)
    }) )
    ContactsAPI.create(contact)
  }

  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([contact])
      }))
    })
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }
  render() {
    return (
      <div className = 'app'>
        <Route exact path ="/" render={() => (
          <ListContacts
            onDeleteContact = { this.removeContact }
            contacts={this.state.contacts}
            />
          )} />

        <Route exact path ="/create" render={({history}) => (
          <CreateContact
            onCreateContact={ (contact) => {
              this.createContact(contact)
              history.push('/')
            }}
            />
          )} />

       </div>
    );
  }
}

export default App;
