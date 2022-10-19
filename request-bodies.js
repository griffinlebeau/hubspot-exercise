const emailList = []
const listBody = {
    "vids": [],
    "emails": emailList
}
const createBody = []

const getDeactivatedProps = property => {
    if (property.status === "deactivated"){
        return true;
    } else {
        return false;
    };
};

const getMatchingUser = user => {
    let hasDeactivatedProperty = false;
    let accounts = user.associated-accounts;
    if (!hasDeactivatedProperty){
        for (let i = 0; i < accounts.length; i++){
            let match = deactivatedProps.includes(accounts[i].toString());
            if (match){
                hasDeactivatedProperty = true;
            } else {
                return;
            };
        };
    };
    return hasDeactivatedProperty;
};

const populateBodies = deactivatedList => {
    deactivatedList.forEach(function(user){
        emailList.push(user.email);
        let newUser = { 
            email: user.email,
            properties: [
                { property: 'first_name', value: user.first_name },
                { property: 'last_name', value: user.last_name },
                { property: 'company', value: user.company },
                { property: 'company_website', value : user.company_domain },
                { property: 'phone', value: user.phone }
            ]
        };
        createBody.push(newUser);
    })
}

var userRequest = new XMLHttpRequest();
userRequest.open("GET", "./data/users.json", false);
userRequest.send(null)
var users = JSON.parse(userRequest.responseText);

var propRequest = new XMLHttpRequest();
propRequest.open("GET", "./data/properties.json", false);
propRequest.send(null)
var properties = JSON.parse(propRequest.responseText);

const deactivatedList = users.filter(getMatchingUser);

const deactivatedProps = properties.filter(getDeactivatedProps);

populateBodies(deactivatedList);

module.exports = { listBody, createBody }



