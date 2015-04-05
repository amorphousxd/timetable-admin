var checkedDep = new Tracker.Dependency();

Template.userListCourses.events({
    'click #addButton': function(event, template){
        event.preventDefault();
        var id = Courses.insert({});
        Router.go('/user/update/courses/'+id);
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
            Courses.remove({_id: id});
            checkedDep.changed();
        })
    }
});

Template.userListCourses.rendered = function(){
};

Template.userListCourses.helpers({
    faculties: function(){
        return Faculties.find({});
    },
    teachersOfCourse: function(teacherIds){
        return Teachers.find({_id: {$in: teacherIds}}).map(function(teacher){
            return teacher.fio;
        }).join(',\n')
    },
    groupsOfCourse: function(groupIds){
        return Groups.find({_id: {$in: groupIds}}).map(function(group){
            return group.name;
        }).join('\n')
    },
    noChecked: function(){
        checkedDep.depend();
        return $('input:checked').length === 0;
    }
});