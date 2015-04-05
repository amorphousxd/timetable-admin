var courseDependency = new Tracker.Dependency();

Template.userUpdateCourses.rendered = function(){
    $('.ui.dropdown').dropdown({
        action: function(){

        }
    });
};

Template.userUpdateCourses.helpers({
    course: function(){
        var course = Courses.findOne({_id: Router.current().params.id});
        courseDependency.changed();
        return course;
    },
    teachersOfCourse: function(teacherIds){
        if(!teacherIds) return Teachers.find({});
        return Teachers.find({}).map(function(teacher){
            teacher.checked = teacherIds.contains(teacher._id);
            return teacher;
        })
    },
    groupsOfCourse: function(groupIds){
        if(!groupIds) return Groups.find({});
        return Groups.find({}).map(function(group){
            group.checked = groupIds.contains(group._id);
            return group;
        })
    }
});

Template.userUpdateCourses.events({
    'click #saveButton': function(event, template){
        event.preventDefault();
        var organizationId = document.getElementById('organizationId').value;
        var courseId = template.find('#courseId').value || Router.current().params.id;
        var teachers = [];
        var groups = [];
        $('input:checked').each(function(index, element){
            var id = $(element).attr('id').split('_');
            if(id[0] === 'teacher'){
                teachers.push(id[1]);
            }
            if(id[0] === 'group'){
                groups.push(id[1]);
            }
        });
        var name = template.find('#course-name').value;
        if(isNotEmpty(name) && teachers.length > 0 && groups.length > 0){
            Courses.update({_id: courseId}, {$set: {
                name: name,
                teachers: teachers,
                groups: groups,
                organization: organizationId,
                hours: {
                    total: 100,
                    lab: 40,
                    practise: 40,
                    lecture: 20
                }
            }});
            $('#error-message').addClass('hidden');
            $('#success-message').removeClass('hidden');
        } else {
            $('#error-message').removeClass('hidden')
            $('#success-message').addClass('hidden')
        }
    },
    'click .close': function(){
        $('#success-message').addClass('hidden')
    },
    'click #cancelButton': function(){
        Router.go('/user/update/courses');
    },
    'click .checkbox': function(event, template){
        event.preventDefault();
        var checkbox = $(event.currentTarget).find('input[type="checkbox"]');
        checkbox.prop('checked', !checkbox.prop('checked'));
    }
});

Array.prototype.contains = function(k) {
    for(var i=0; i < this.length; i++){
        if(this[i] === k){
            return true;
        }
    }
    return false;
}