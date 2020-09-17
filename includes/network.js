var request= '';
var currentConnection = '';
var sampleMSISDN = '0549500940';

function networkAccess(request){

  if (currentConnection == '') {
    if (checkEndpointAccess(request)) {
      request = request;
      currentConnection = request;
      $("#mainUSSDModal").modal("show");
      endpointAccess(currentConnection, sampleMSISDN, request, 1);

    } else {
      $("#noServiceModal").modal("show");
    }
  } else {
    // $("#mainUSSDModal").modal("hide");
    // $("#mainUSSDModal").modal("show");
    endpointAccess(currentConnection, sampleMSISDN, request, 0);

  }

  return true;
}
