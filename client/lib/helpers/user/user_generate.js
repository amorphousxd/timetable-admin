var facultiesDep = new Tracker.Dependency();

Template.userGenerate.events({
    'click #generateButton': function(event, template){

    },
    'click .checkbox': function(event, template){
        event.preventDefault();
        var checkbox = $(event.currentTarget).find('input[type="checkbox"]');
        checkbox.prop('checked', !checkbox.prop('checked'));
        facultiesDep.changed();
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
        facultiesDep.depend()
        var idList = [];
        $('input:checked').each(function(index, element){
            idList.push($(element).attr('id').split('_')[1]);
        });
        return Groups.find({faculty: {$in: idList}});
    },
    facultySelected: function(){
        facultiesDep.depend();
        return $('.faculty-checkbox input:checkbox:checked').length;
    }
});