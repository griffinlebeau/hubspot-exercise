const listId = 202210;
const apiKey = '';
const Hubspot = require('hubspot');
const { listBody, createBody } = require('./create-list');

const createContacts = body => {
    Hubspot.api_call('https://legacydocs.hubspot.com/docs/methods/contacts/batch_create_or_update', 'POST', JSON.stringify(body))
}

const addContactsToList = body => {
    Hubspot.api_call(`https://api.hubapi.com/contacts/v1/lists/${listId}/add?${apiKey}`, 'POST', JSON.stringify(body))

}

createContacts(createBody);
addContactsToList(listBody);

