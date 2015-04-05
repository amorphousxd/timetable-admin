Meteor.methods({
    getOrganizationId: function(name){
        var organization = Organizations.find({name: name}).fetch()[0];
        if(organization != null)
        return organization._id;
    }
});