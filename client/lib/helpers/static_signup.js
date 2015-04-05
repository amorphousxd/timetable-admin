Template.staticSignup.events({
    'submit form': function(event, template){
        event.preventDefault();
        var username = template.find('#signup-username').value,
            fullName = template.find('#signup-fullName').value,
            email = trimInput(template.find('#signup-email').value.toLowerCase()),
            phone = template.find('#signup-phone').value,
            pass = template.find('#signup-pass').value,
            pass2 = template.find('#signup-pass2').value,
            organization = template.find('#signup-organization').value;
        if (isNotEmpty(username) && isNotEmpty(fullName) && isNotEmpty(phone) && isNotEmpty(organization) && isNotEmpty(email) && isEmail(email) && isNotEmpty(pass) && isValidPassword(pass) && isNotEmpty(pass2) && isValidPassword(pass2) && areValidPasswords(pass, pass2)) {
            Meteor.loginWithPassword(email, pass, function(err) {
                if (err) {
                    Meteor.call('getOrganizationId', organization, function(err, id){
                        if(id == null){
                            Organizations.insert({
                                name: organization
                            })
                        }
                        Accounts.createUser({
                            email: email,
                            username: username,
                            password: pass,
                            profile: {
                                'name': fullName,
                                'phone': phone,
                                'organization': organization,
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
                        Meteor.loginWithPassword(email, pass, function (err) {
                            var user = Meteor.user();
                            if (!user.roles || user.roles.indexOf('admin') == -1) {
                                Router.go('/user/home');
                            } else {
                                Router.go('admin');
                            }
                        })
                    });
                } else {
                    var user = Meteor.user();
                    if (!user.roles || user.roles.indexOf('admin') == -1){
                        Router.go('/user/home');
                    } else {
                        Router.go('admin');
                    }
                }
            });
        }
        return false;
    }
});