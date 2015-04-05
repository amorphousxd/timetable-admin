Meteor.startup(function () {

    if (Meteor.users.find().count() === 0) {
        var _id = Accounts.createUser({
            email: '123@123.ru',
            username: '123',
            password: '123123',
            profile: {
                'name': 'kany west',
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

    if(Objects.find().count() === 0){
        var organizationId = Organizations.findOne({name: 'HSE'})._id;
        var objectId = Objects.insert({
            organization: organizationId,
            name: 'МП',
            auditories: [213, 215]
        });
        //var object = Objects.findOne({_id: objectId});
        //Organizations.update({name: 'HSE'}, {$push: {objects: objectId}});
    }

    if(Elements.find().count() === 0){
        Elements.insert({
            'name': 'red-rect',
            'top': '0px',
            'left': '0px'
        })
    }

    if(Faculties.find().count() === 0){
        var organizationId = Organizations.findOne({name: 'HSE'})._id;
        Faculties.insert({
            organization: organizationId,
            name: 'ФИТиВТ'
        })
    }
    if(Faculties.find().count() < 2){
        var organizationId = Organizations.findOne({name: 'HSE'})._id;
        Faculties.insert({
            organization: organizationId,
            name: 'ПМИ'
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


});