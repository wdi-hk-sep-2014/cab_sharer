Template.layout.events({

  'click #user-icon': function(){
    $('.slide-up').hide();
    if($('#user-wrapper').css("display") === "none"){
      $('#user-wrapper').css('display', 'block');
      $('#map-canvas').slideToggle("slow");
    } else { 
      $('#map-canvas').slideToggle("slow");
      setTimeout(function(){ 
        $('#user-wrapper').css('display', 'none');
      }, 600);
    }
  },

  'click #trips-icon': function(){
    $('.slide-up').css("display", 'none');
    if($('#destination-wrapper').css("display") === "none"){
      $('#destination-wrapper').css('display', 'block');
      $('#map-canvas').slideToggle("slow");
    } else { 
      $('#map-canvas').slideToggle("slow");
      setTimeout(function(){ 
        $('#destination-wrapper').css('display', 'none');
      }, 600);
    }
  },  

  'click #friends-icon': function(){
    alert('icon clicked');
  },

  'click #feedback-icon': function(){
    alert('icon clicked');
  }
});