var accountData = [];
var mode = "";


function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// function checkCookie() {
//   var user = getCookie("username");
//   if (user != "") {
//     alert("Welcome again " + user);
//   } else {
//     user = prompt("Please enter your name:", "");
//     if (user != "" && user != null) {
//       setCookie("username", user, 365);
//     }
//   }
// }

function loadAccount() {
  accountData = getCookie("accountData");
  if (accountData != "") {
    accountData = JSON.parse(getCookie("accountData"));
    console.log("Account Loaded Successful");
    console.log(accountData);
    $("#startupModal").modal("show");

  } else {
      if (page=="main") {
        window.location.assign("./login.html");
      }
  }
}

function setupAccount(accountData) {
  accountDataString = JSON.stringify(accountData);
  setCookie("accountData", accountData, 1095);
  console.log("Registered");
  loadAccount();
  window.location.assign("./");

}

function resetAccount(){
  setCookie("accountData", "", -1100);
  window.location.reload();
}

// function getReady(){
//   $(".account-name").text(studentName);
// }

function checkMode(){
  var newMode = accountData.Role;
  if (newMode =="admin") {
    mode = "admin";
  } else {
    mode = "user";
  }
  return mode;
}

function activateMode(){
  console.log("Mode Activation Began");
  // showRecordView()
  mode = checkMode();
  console.log("The Mode is:"+mode);
  if (mode == "admin") {
    $(".salesRep-view").hide();
    $(".salesRep-only").hide();
    $(".account-name").text("Admin");
  } else if (mode == "user") {
    $(".admin-view").hide();
    $(".admin-only").hide();
    $(".account-name").text("Caeser");
  }
}
//
// function changeMode(newMode){
//   var newMode = newMode;
//   if (newMode == "admin") {
//     setCookie("mode", "", -1100);
//   } else if (newMode == "salesRep") {
//     setCookie("mode", "salesRep", 1095);
//   }
//   window.location.reload();
// }
function printPageArea(areaID){
    $(".add").hide();
    $(".cut").hide();
    var printContent = document.getElementById(areaID);
    var WinPrint = window.open('', '', 'width=900,height=650');
    WinPrint.document.write(printContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
    $(".add").show();
    $(".cut").show();
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
