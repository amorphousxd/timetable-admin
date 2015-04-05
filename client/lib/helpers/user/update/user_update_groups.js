var groupDependency = new Tracker.Dependency();

Template.userUpdateGroups.helpers({
   group: function(){
       var group = Groups.findOne({_id: Router.current().params.id});
       if(!group) return {};
       var a = Faculties.findOne({_id: group.faculty});
       if(!a) return group;
       group.facultyName = a.name;
       this.group = group;
       groupDependency.changed();
       return group;
   },
    faculties: function(){
        groupDependency.depend();
        var group = this.group;
        if(!group) return Faculties.find({});
        return Faculties.find({}).map(function(object, index) {
            object.selected = object._id === group.faculty;
            return object;
        });
    }
});

Template.userUpdateGroups.events({
    'click #saveButton': function(event, template){
        event.preventDefault();
        var groupId = template.find('#groupId').value || Router.current().params.id;
        var name = template.find('#group-name').value,
            year = template.find('#group-year').value,
            faculty = template.find('#faculties-dropdown').value,
            students = template.find('#group-students').value,
            phone = template.find('#group-phone').value;
        var facultyId = template.find('#faculty_'+faculty).value.split('-')[1];
        if(isNotEmpty(name) && isNotEmpty(year) && isNotEmpty(faculty) && isNotEmpty(facultyId) && isNotEmpty(students) && parseInt(students) && parseInt(year) && isNotEmpty(phone)){
           Groups.update({_id: groupId}, {$set: {
               name: name,
               year: parseInt(year),
               faculty: facultyId,
               studentsCount: parseInt(students),
               'contacts':{
                   phone: phone
               }
           }});
            $('#error-message').addClass('hidden')
            $('#success-message').removeClass('hidden')
        } else {
            $('#error-message').removeClass('hidden')
            $('#success-message').addClass('hidden')
        }
    },
    'click .close': function(){
        $('#success-message').addClass('hidden')
    },
    'click #cancelButton': function(){
        Router.go('/user/update/groups');
    }
});