Template.userUpdate.helpers({
    objects: function() {
        return Objects.find({}).map(function(object, index) {
            object.index = index;
            return object;
        });
    }
});
Template.userUpdate.events({
    'click #addObject': function(event, template){
        $('#addObjectModal')
            .modal('show')
        ;
    }
})