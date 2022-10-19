const emailList = [] //array of emails from users with deactivated property accounts  
const listBody = { //body object used for api call to update contact list 
    "vids": [],
    "emails": emailList
}
const createBody = [] //body array used for api call to batch create contacts 

const getDeactivatedProps = property => { //callback for filter method on array of properties from JSON file
    if (property.status === "deactivated"){ 
        return true; //returning true adds property to new deactivated array
    } else {
        return false; //returning false does not add property to new deactivated array 
    };
};

const getMatchingUser = user => { //callback for filter method on array of users from JSON file
    let hasDeactivatedProperty = false; //variable that deteremines whether user object is added to new filtered array or not
    let accounts = user.associated-accounts; //renaming object field for readability in for loop
    if (!hasDeactivatedProperty){ //will always run because it is false by default
        for (let i = 0; i < accounts.length; i++){//loop through each property account linked to user 
            let match = deactivatedProps.includes(accounts[i].toString()); //checks if a property account number is present in list of deactivated properties
            if (match){ //if the user has a deactivated property, set filter return variable to true to add the user instance to array for deposit
                hasDeactivatedProperty = true;
            } else { //if the user has no deactivated properties, their filter return variable stays false and they are not added to new array for deposit 
                return;
            };
        };
    };
    return hasDeactivatedProperty; //returning true adds array element to new list, returning false does not
};

const populateBodies = deactivatedList => { //takes in array of users linked to a deactivated property
    deactivatedList.forEach(function(user){ //transforms each user into form ready for api call request body 
        emailList.push(user.email); //populates email array for contact list update api call
        let newUser = { //object matching api syntax 
            email: user.email, //opted for email vs id due to already having email available in JSON file vs waiting for vid from api call
            properties: [
                { property: 'first_name', value: user.first_name },
                { property: 'last_name', value: user.last_name },
                { property: 'company', value: user.company },
                { property: 'company_website', value : user.company_domain },
                { property: 'phone', value: user.phone }
            ]
        };
        createBody.push(newUser); //populate user creation body array 
    })
}

var userRequest = new XMLHttpRequest();
userRequest.open("GET", "./data/users.json", false);
userRequest.send(null)
var users = JSON.parse(userRequest.responseText); //array of user objects from JSON file

var propRequest = new XMLHttpRequest();
propRequest.open("GET", "./data/properties.json", false);
propRequest.send(null)
var properties = JSON.parse(propRequest.responseText); //array of property objects from JSON file

const deactivatedList = users.filter(getMatchingUser); //array of users who are linked to deactivated properties for deposit 

const deactivatedProps = properties.filter(getDeactivatedProps); //array of deactivated properties 

populateBodies(deactivatedList); //used to set exported bodies for both api calls

module.exports = { listBody, createBody };



