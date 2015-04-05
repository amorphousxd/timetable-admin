var facultyDep = new Tracker.Dependency();
var currentFaculty = '';

Template.userListGroups.events({
    'change #faculties-dropdown': function(event, template){
        event.preventDefault();
        currentFaculty = template.find('#faculties-dropdown').value;
        facultyDep.changed();
    }
});

Template.userListGroups.helpers({
    faculties: function(){
        return Faculties.find({});
    },
    groups: function(){
        facultyDep.depend();
        if(!currentFaculty.length){
            return Groups.find({});
        } else {
            var faculty = Faculties.findOne({name: currentFaculty});
            if(!faculty) return [];
            return Groups.find({faculty: faculty._id});
        }
    }
});