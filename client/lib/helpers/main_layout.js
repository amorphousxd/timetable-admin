Template.mainLayout.rendered = function () {
    Meteor.subscribe('elements', {
        onReady: function(){
            /*var element = Elements.findOne({name: 'red-rect'});
            var id = element._id;
            console.log(element[0]);
            var $div = $('<div class="red-rect"> <div />').appendTo('body');
            $div.css({
                'position': 'absolute',
                'top': element.top,
                'left': element.left
            })
            $($div).draggable({ drag:function(event, ui){
            }, stop: function(event, ui){
                Elements.update({_id: id}, {$set: {top: ui.position.top + 'px', left: ui.position.left + 'px'}})
            }});*/
        }
    });
};