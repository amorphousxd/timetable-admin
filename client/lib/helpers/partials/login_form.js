Template.loginForm.helpers({
    alert: function() {
        return Session.get('authAlert');
    }
});

Template.loginForm.events({
    'submit form': function(event, template){
        event.preventDefault();
        var email = trimInput(template.find('#login-email').value.toLowerCase()),
            pass = template.find('#login-pass').value;
        if (isNotEmpty(email) && isEmail(email) && isNotEmpty(pass) && isValidPassword(pass)) {
            Meteor.loginWithPassword(email, pass, function(err) {
                if (err) return Session.set('authAlert', 'Неверно введен email / пароль');
                var user = Meteor.user();
                Session.set('authAlert', 'Welcome back, ' + user.profile.fullName + '!');
                if (!user.roles || user.roles.indexOf('admin') == -1){
                    Router.go('/user/home');
                } else {
                    Router.go('admin');
                }
            });
        }
        return false;
    },
    'click #test-user': function(event, template){
        event.preventDefault();
        template.find('#login-email').value = '123@123.ru';
        template.find('#login-pass').value = '123123';
        $('#login-button').click();
    }
});