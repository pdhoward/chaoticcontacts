

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


// rather thank use class extends Component,
// we deploy a stateless functional component
class ListContacts extends Component {

  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: ''})
  }

  render() {
    const { contacts, onDeleteContact } = this.props
    const { query } = this.state

    let showingContacts

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contacts.filter((contact) => match.test(contact.name))

    }
    else {
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'))

    return (
      <div className = 'list-contacts'>

        <div className = 'list-contacts-top'>
          <input
            className = 'search-contacts'
            type='text'
            placeholder = 'Search contacts'
            value={this.state.query}
            onChange = { (event) => this.updateQuery(event.target.value)}
          />
      </div>

      {showingContacts.length !== contacts.length && (
        <div className = 'showing-contacts'>
          <span> Showing {showingContacts.length } out of {contacts.length } in our directory</span>
          <button onClick={this.clearQuery}> Show All </button>

        </div>
      )}

      <ol className='contact-list'>
        {showingContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
                }}
                />

              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>

             <button  onClick={()=>onDeleteContact(contact)} className='contact-remove' >
              Remove
             </button>

          </li>
        ))}
      </ol>
    </div>
    )
  }
}

export default ListContacts