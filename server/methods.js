Meteor.methods({
    getOrganizationId: function(name){
        var organization = Organizations.find({name: name}).fetch()[0];
        return organization._id;
    }
});