var facultyDep = new Tracker.Dependency();
var currentFaculty = '';

Template.userListGroups.events({
    'change #faculties-dropdown': function(event, template){
        event.preventDefault();
        currentFaculty = template.find('#faculties-dropdown').value;
        facultyDep.changed();
    },
    'click #addButton': function(event, template){
        event.preventDefault();
        var id = Groups.insert({});
        console.log(id)
        Router.go('/user/update/groups/'+id);
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
        if(!currentFaculty.length){
            return Groups.find({});
        } else {
            console.log(currentFaculty);
            var faculty = Faculties.findOne({name: currentFaculty});
            if(!faculty) return [];
            console.log(faculty)
            return Groups.find({faculty: faculty._id});
        }
    }
});