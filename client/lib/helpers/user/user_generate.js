var newChattersDep = new Tracker.Dependency();

Template.userGenerate.events({
    'click #generateButton': function(event, template){
    },
    'click .checkbox': function(event, template){
        event.preventDefault();
        var checkbox = $(event.currentTarget).find('input[type="checkbox"]');
        checkbox.prop('checked', !checkbox.prop('checked'));
        newChattersDep.changed();
    }
});
Template.userGenerate.helpers({
    objects: function() {
        return Objects.find({}).map(function(object, index) {
            object.index = index;
            return object;
        });
    },
    groups: function(){
        return Groups.find();
    },
    facultySelected: function(){
        newChattersDep.depend();
        return $('.faculty-checkbox input:checkbox:checked').length;
    }
});