var ussdCode = '*961#';

var requestString = '';
var currentMenu = 'mainMenu';
var previousMenu = '';
var menuStep = 0;

function checkEndpointAccess(userID){
  if (ussdCode == userID) {
    return true;
  } else {
    return false;
  }
}

function endpointAccess(userID, sampleMSISDN, userData, msgType = 1){
  if (msgType != 1) {
    USSDFlow(userData);
  } else {
    currentMenu = 'mainMenu';
    showMenu('mainMenu');
  }
}

function showMenu(menuName, menuStep = 1){
  if (menuName == 'mainMenu') {
    output = '<div id="main-view" class=""> WELCOME TO E-BASED SMART PREPAID SYSTEM <ol> <li>Top Up Credit</li> <li>Check Balance</li> <li>Statement Request</li> <li>Contact Us</li> </ol> </div>';
  } else if (menuName == 'topupMenu') {
    if (menuStep == 1) {
      output = '<div id="topup-view-step-1" class=""> Enter Amount of Choice </div>';
    } else if (menuStep == 2) {
      output = '<div id="topup-view-step-2" class=""> <ol> <li>Add Meter Number</li> <li>Previous Meter 1</li> <li>Previous Meter 2</li> </ol> </div>';
    } else if (menuStep == 3) {
      output = '<div id="topup-view-step-3" class=""> Enter Meter Number </div>';
    } else if (menuStep == 4) {
      output = '<div id="topup-view-step-4" class=""> Confirm topup to Meter Number: #Pi33535 <ol> <li>Confirm Meter Number</li> <li>Cancel</li> </ol> </div>';
    } else if (menuStep == 5) {
      output = '<div id="topup-view-step-5" class=""> Thanks For Purchasing Credit, You will see a Mobile Money Prompt Soon</div>';
    } else if (menuStep == 6) {
      output = '<div id="topup-view-step-6" class=""> Authorize Payment of GHS 10.00 from your account to EpSystem for Prepaid Top Up Service. Enter MMpin to continue. </div>';
    } else if (menuStep == 7) {
      output = '<div id="topup-view-step-7" class=""> <ol> <li>Confirm Purchase</li> <li>Cancel</li> </ol> </div>';
    } else if (menuStep == 8) {
      output = '<div id="topup-view-step-7" class=""> Purchase of GHS10.00 credit wat a success </div>';
    } else {
      output = '<div id="topup-view-error" class=""> Your option does not exist </div>';
    }

  } else if (menuName == 'balanceMenu') {
    if (menuStep == 1) {
      output = '<div id="balance-view-step-1" class=""> <ol> <li>Add Meter Number</li> <li>Previous Meter 1</li> <li>Previous Meter 2</li> </ol> </div>';
    } else if (menuStep == 2) {
      output = '<div id="balance-view-step-2" class=""> Enter Meter Number </div>';
    } else if (menuStep == 3) {
      output = '<div id="balance-view-step-3" class=""> Confirm Meter Number: #Pi33535 <ol> <li>Confirm Meter Number</li> <li>Cancel</li> </ol> </div>';
    } else if (menuStep == 4) {
      output = '<div id="balance-view-step-4" class=""> Your Meter Balance is #GHS Amount </div>';
    } else {
      output = '<div id="balance-view-error" class=""> Your option does not exist </div>';
    }

  } else if (menuName == 'statementMenu') {
    if (menuStep == 1) {
      output = '<div id="statement-view-step-1" class=""> <ol> <li>Add Meter Number</li> <li>Previous Meter 1</li> <li>Previous Meter 2</li> </ol> </div>';
    } else if (menuStep == 2) {
      output = '<div id="statement-view-step-2" class=""> Enter Meter Number </div>';
    } else if (menuStep == 3) {
      output = '<div id="statement-view-step-3" class=""> Confirm Meter Number: #Pi33535 <ol> <li>Confirm Meter Number</li> <li>Cancel</li> </ol> </div>';
    } else if (menuStep == 4) {
      if (true) {
        output = '<div id="statement-view-step-4" class=""> Recent Topup records for Meter Number: #Pi33535 <ol> <li>#GHS Amount on Date </li> <li>#GHS Amount on Date </li> </ol> </div>';
      } else {
        output = '<div id="statement-view-step-5" class=""> There is no recent Topup records for Meter Number: #Pi33535 </div>';
      }
    } else {
      output = '<div id="statement-view-error" class=""> Your option does not exist </div>';
    }

  } else if (menuName == 'contactMenu') {
    output = '<div id="contact-view" class=""> Send Us SMS via: 0244162072 <br/> 0. Back To HomeScreen</div>';

  } else if (menuName == 'abort') {
    output = '<div id="abort-view" class=""> Connection Aborted </div>';

  } else {
    output = 'Invalid Input Entered, Retry';
  }
// alert("hey: "+menuName+"; Step: "+menuStep);
// alert("Output: "+output);
$("#view-area").html(output);

}

function USSDFlow(userData) {
  // showMenu('topupMenu');

  if (currentMenu == 'mainMenu') {
    if (userData == 1) {
      currentMenu = 'topupMenu';
      menuStep = 1;
      showMenu('topupMenu');
    } else if (userData == 2) {
      currentMenu = 'balanceMenu';
      showMenu('balanceMenu');
    } else if (userData == 3) {
      currentMenu = 'statementMenu';
      showMenu('statementMenu');
    } else if (userData == 4) {
      currentMenu = 'contactMenu';
      showMenu('contactMenu');
    } else {
      showMenu('invalid');
    }

  } else if (currentMenu == 'topupMenu') {
    //TODO: Do something with userData
    if (menuStep == 1) {
      menuStep = 2;
      showMenu('topupMenu', 2);
    } else if (menuStep == 2) {
      if (userData == 1) {
        menuStep = 3;
        showMenu('topupMenu', 3);
      } else {
        // TODO: Get UserData as selection of and fetch as Meter Number
        menuStep = 4;
        showMenu('topupMenu', 4);
      }
    } else if (menuStep == 3) {
      // TODO: Get UserData as Meter Number
      menuStep = 4;
      showMenu('topupMenu', 4);
    } else if (menuStep == 4) {
      if (userData == 1) {
        menuStep = 5;
        showMenu('topupMenu', 5);
      } else {
        showMenu('abort');
      }
    } else if (menuStep == 5) {
      menuStep = 6;
      showMenu('topupMenu', 6);
    } else if (menuStep == 6) {
      // TODO: Take Momo Pin check if its 4 digits
      menuStep = 7;
      showMenu('topupMenu', 7);
    } else if (menuStep == 7) {
        if (userData == 1) {
          menuStep = 8;
        showMenu('topupMenu', 8);
      } else {
        showMenu('abort');
      }
    } else {
      showMenu('invalid');
    }

  } else if (currentMenu == 'balanceMenu') {
    if (userData == 1) {
      showMenu('topupMenu');
    } else if (userData == 2) {
      showMenu('topupMenu');
    } else if (userData == 3) {
      showMenu('topupMenu');
    } else if (userData == 4) {
      showMenu('topupMenu');
    } else {
      showMenu('invalid');
    }

  } else if (currentMenu == 'statementMenu') {
    if (userData == 1) {
      showMenu('topupMenu');
    } else if (userData == 2) {
      showMenu('topupMenu');
    } else if (userData == 3) {
      showMenu('topupMenu');
    } else if (userData == 4) {
      showMenu('topupMenu');
    } else {
      showMenu('invalid');
    }

  } else if (currentMenu == 'contactMenu') {
    if (userData == 0) {
      showMenu('mainMenu');
    } else {
      showMenu('invalid');
    }

  } else {
    showMenu('invalid');
  }
  // if (currentMenu == 'mainMenu') {
  //
  //
  // } else {
  //
  // }

}
