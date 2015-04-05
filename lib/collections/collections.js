Organizations = new Meteor.Collection("organizations");
Objects = new Meteor.Collection("objects");
Elements = new Meteor.Collection("elements");
Groups = new Meteor.Collection("groups");
Faculties = new Meteor.Collection("faculties");
Subjects = new Meteor.Collection("subjects");
Courses = new Meteor.Collection("courses");
Teachers = new Meteor.Collection("teachers");

if(Meteor.isServer){
    Meteor.publish('elements', function(){ return Elements.find(); });
} else {
    Meteor.subscribe('elements');
}