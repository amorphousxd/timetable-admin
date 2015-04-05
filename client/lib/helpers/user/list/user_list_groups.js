var facultyDep = new Tracker.Dependency();
var currentFaculty = '';
var checkedDep = new Tracker.Dependency();

Template.userListGroups.events({
    'change #faculties-dropdown': function(event, template){
        event.preventDefault();
        currentFaculty = template.find('#faculties-dropdown').value;
        facultyDep.changed();
    },
    'click #addButton': function(event, template){
        event.preventDefault();
        var id = Groups.insert({});
        Router.go('/user/update/groups/'+id);
    },
    'click .checkbox': function(event, template){
        event.preventDefault();
        var checkbox = $(event.currentTarget).find('input[type="checkbox"]');
        checkbox.prop('checked', !checkbox.prop('checked'));
        checkedDep.changed();
    },
    'click #deleteSelected': function(event, template){
        event.preventDefault();
        $('input:checked').each(function(index, element){
            var id = $(element).attr('id').split('_')[1];
            Groups.remove({_id: id});
            checkedDep.changed();
        })
    }
});

Template.userListGroups.rendered = function(){
    currentFaculty = document.getElementById('faculties-dropdown').value;
    facultyDep.changed();
};

Template.userListGroups.helpers({
    faculties: function(){
        return Faculties.find({});
    },
    groups: function(){
        facultyDep.depend();
        if(document.getElementById('faculties-dropdown') != null)
        currentFaculty = document.getElementById('faculties-dropdown').value;
        if(!currentFaculty.length){
            return Groups.find({});
        } else {
            var faculty = Faculties.findOne({name: currentFaculty});
            if(!faculty) return [];
            return Groups.find({faculty: faculty._id});
        }
    },
    noChecked: function(){
        checkedDep.depend();
        return $('input:checked').length === 0;
    }
});