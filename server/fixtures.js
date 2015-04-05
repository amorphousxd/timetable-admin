Meteor.startup(function () {

    // Initial database content

    if (Meteor.users.find().count() === 0) {
        var _id = Accounts.createUser({
            email: '123@123.ru',
            username: '123',
            password: '123123',
            profile: {
                'name': 'kanye west',
                'phone': '123',
                organization: 'HSE',
                'fields': {
                    activity: [
                        {
                            action: 'Registered',
                            actionDate: new Date()
                        }
                    ]
                }
            }
        });
    }

    if (Organizations.find().count() === 0) {
        Organizations.insert({
            name: 'HSE'
        });
    }

    var organizationId = Organizations.findOne({name: 'HSE'})._id;

    if(Objects.find().count() === 0){
        var objectId = Objects.insert({
            organization: organizationId,
            name: 'МП',
            auditories: [213, 215]
        });
        //var object = Objects.findOne({_id: objectId});
        //Organizations.update({name: 'HSE'}, {$push: {objects: objectId}});
    }

    if(Teachers.find().count() === 0){
        Teachers.insert({
            fio: 'Клышинский Эдуард Станиславович',
            organization: organizationId
        });
        Teachers.insert({
            fio: 'Востриков Александр Владимирович',
            organization: organizationId
        });
        Teachers.insert({
            fio: 'Скок Борис Викторович',
            organization: organizationId
        });
    }

    if(Elements.find().count() === 0){
        Elements.insert({
            'name': 'red-rect',
            'top': '0px',
            'left': '0px'
        })
    }

    if(Faculties.find().count() === 0){
        Faculties.insert({
            organization: organizationId,
            name: 'ФИТиВТ',
            type: 'IT'
        })
    }

    if(Faculties.find().count() < 2){
        Faculties.insert({
            organization: organizationId,
            name: 'ПМИ',
            type: 'IT'
        })
    }

    if(Groups.find().count() < 2){
        var facultyId = Faculties.findOne({name: 'ФИТиВТ'})._id;
        Groups.insert({
            faculty: facultyId,
            year: 3,
            name: 'АП-31',
            studentsCount: 31,
            contacts: {
                phone: '+7-909-999-99-99'
            }
        });
        Groups.insert({
            faculty: facultyId,
            year: 3,
            name: 'С-31',
            studentsCount: 25,
            contacts: {
                phone: '+7-909-999-99-99'
            }
        })
    }

    if(Courses.find().count() === 0){
        var teacherIds = Teachers.find({organization: organizationId}).map(function(teacher){
            return teacher._id;
        });
        var facultiesIds = Faculties.find({organization: organizationId}).map(function(faculty){
            return faculty._id;
        });
        var groupIds = Groups.find({faculty:{$in: facultiesIds}}).map(function(group){
            return group._id;
        });
        Courses.insert({
            name: 'Инструментальные что-то программирования',
            hours: {
                total: 120,
                lab: 60,
                practise: 40,
                lecture: 20
            },
            teachers: teacherIds,
            groups: groupIds,
            organization: organizationId
        })
    }

});