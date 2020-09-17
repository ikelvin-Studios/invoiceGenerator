var count = 0;
var digits = '';
// var requestString = '';
// var currentMenu = '';
// var previousMenu = '';

$(".digit").on('click', function() {
  var num = ($(this).clone().children().remove().end().text());
  if (count < 11) {
    $("#output").append('<span>' + num.trim() + '</span>');
    digits += num.trim();
    count++
  }
});

$('.fa-long-arrow-left').on('click', function() {
  $('#output span:last-child').remove();
  count--;
})

function dial(target){
  sendRequest(target);
}

function dialInput(){
  // digits = $("#output").val();
  if (digits != '') {
    // alert("Digits are "+ digits);
    dial(digits);
  } else {
    alert("There is nothing");
  }

}


function next(){
  sendRequest(getRequest());

}

function getRequest(){
  requestString = $("#requestString").val();
  $("#requestString").val("");
  return requestString;
}

function sendRequest(request){
  networkAccess(request)
  return true;
}
