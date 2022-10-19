const listId = 202210; //list of users with deactivated properties 
const apiKey = ''; //replace with personal api key
const Hubspot = require('hubspot'); 
const { listBody, createBody } = require('./request-bodies'); //imported api call request bodies 

async function createContacts(body) {
    const result = await Hubspot.api_call('https://legacydocs.hubspot.com/docs/methods/contacts/batch_create_or_update', 'POST', JSON.stringify(body));
    console.log(result);
    return result;
}

async function  addContactsToList(body) {
    const result = await Hubspot.api_call(`https://api.hubapi.com/contacts/v1/lists/${listId}/add?${apiKey}`, 'POST', JSON.stringify(body));
    console.log(result);
    return result;
}

createContacts(createBody); //invoke api call to create contacts of users linked to deactivated properties
addContactsToList(listBody); //invoke api call to add contacts to list of accounts associated with deactivated properties 

