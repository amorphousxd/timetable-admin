Template.userHome.helpers({
    organization: function(){
        return Organizations.findOne();
    }
})