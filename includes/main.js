var page = "main";

var homeView = "";
var quizView = "";

function loadPages() {
  homeView = getPageView("#homeView");
  invoiceView = getPageView("#invoiceView");
}

function getPageView(viewID) {
  viewData = $(viewID).html();
  $(viewID).html("");
  return viewData;
}

$(document).ready(function(){
loadPages();
 // Show the Modal on load
loadAccount();
getReady();
// activateMode();
console.log("What is mode again: "+mode);
 var upcount = 0;

 console.log("homepage is active");
 $('#main-contentArea').html(homeView);
 // $('#main-contentArea').append(invoiceView);
activateMode();
generateLists();
});

function getReady(){
  $(".account-name").text(accountData.Name);
}

function generateLists(){
  if (mode == "admin") {
    porpulateSalesReps();
    porpulateItems();
  }
  porpulateInvoices();
  porpulateClients();
  porpulateInvoiceSelections();
}

function porpulateSalesReps(){
  $.ajax({

                        type: "GET",
                        url: "backend/api/users",
                        processData: false,
                        contentType: "application/json",
                        data: '',
                        success: function(r) {
                                let list = JSON.parse(r)
                                let listLength = list.length;
                                $(".salesRep-count").text(listLength);
                                if (listLength > 0) {
                                  $('#salesRep-list').html("");
                                }
                                count = 0;
                                $.each(list, function(index) {
                                  count++;
                                  console.log("Got Reps");
                                  console.log(list[index]);
                                  label = '';
                                  if (list[index].status == "ACTIVE") {
                                    label = '<span class="label label-success">ACTIVE</span>';
                                  } else if (list[index].status == "DISABLED") {
                                    label = '<span class="label label-warning">DISABLED</span>';
                                  }

                                  listItem = '<tr><td>'+count+'. <a href="#">'+list[index].name+'</a></td><td>'+list[index].email+'</td><td>'+label+'</td></tr>'

                                        $('#salesRep-list').html(
                                                $('#salesRep-list').html() + listItem
                                        )

                                })

                        },
                        error: function(r) {
                                console.log(r)
                        }

                });
}

function porpulateItems(){
  $.ajax({

                        type: "GET",
                        url: "backend/api/items",
                        processData: false,
                        contentType: "application/json",
                        data: '',
                        success: function(r) {
                                let list = JSON.parse(r)
                                let listLength = list.length;
                                $(".items-count").text(listLength);
                                if (listLength > 0) {
                                  $('#items-list').html("");
                                }
                                count = 0;
                                $.each(list, function(index) {
                                  count++;
                                  console.log("Got items");
                                  console.log(list[index]);
                                  label = '';
                                  if (list[index].status == "AVAILABLE") {
                                    label = '<span class="label label-success">AVAILABLE</span>';
                                  } else if (list[index].status == "OUT OF STOCK") {
                                    label = '<span class="label label-warning">OUT OF STOCK</span>';
                                  }

                                  listItem = '<tr><td> <a href="#">'+list[index].id+'</a></td><td>'+list[index].item+'</td><td>GHS'+list[index].price+'</td><td>'+label+'</td></tr>'

                                        $('#items-list').html(
                                                $('#items-list').html() + listItem
                                        )

                                })

                        },
                        error: function(r) {
                                console.log(r)
                        }

                });
}

function porpulateInvoices(){
  $.ajax({

                        type: "GET",
                        url: "backend/api/invoice",
                        processData: false,
                        contentType: "application/json",
                        data: '',
                        success: function(r) {
                                let list = JSON.parse(r)
                                let listLength = list.length;
                                $(".invoice-count").text(listLength);
                                if (listLength > 0) {
                                  $('#invoice-list').html("");
                                }
                                count = 0;
                                $.each(list, function(index) {
                                  count++;
                                  console.log("Got invoice");
                                  console.log(list[index]);
                                  label = '';
                                  if (list[index].status == "PENDING") {
                                    label = '<span class="label label-success">PENDING</span>';
                                  } else if (list[index].status == ">COMPLETED") {
                                    label = '<span class="label label-warning">>COMPLETED</span>';
                                  } else if (list[index].status == "DUE") {
                                    label = '<span class="label label-warning">DUE</span>';
                                  }

                                  listItem = '<tr><td><a href="#">#INV'+list[index].Invoice+'</a></td><td><a href="#">'+list[index].client_id+'</a></td><td>'+list[index].invoice_date+' [Due: '+list[index].due_date+']</td><td>'+label+'</td></tr>'

                                        $('#invoice-list').html(
                                                $('#invoice-list').html() + listItem
                                        )

                                })

                        },
                        error: function(r) {
                                console.log(r)
                        }

                });
}

function porpulateClients(){
  $.ajax({

                        type: "GET",
                        url: "backend/api/clients",
                        processData: false,
                        contentType: "application/json",
                        data: '',
                        success: function(r) {
                                let list = JSON.parse(r)
                                let listLength = list.length;
                                $(".clients-count").text(listLength);
                                if (listLength > 0) {
                                  $('#clients-list').html("");
                                }
                                count = 0;
                                $.each(list, function(index) {
                                  count++;
                                  console.log("Got Reps");
                                  console.log(list[index]);

                                  if (list[index].company == "") {
                                    list[index].company = "NA";
                                  }
                                  label = '';
                                  if (list[index].status == "ACTIVE") {
                                    label = '<span class="label label-success">ACTIVE</span>';
                                  } else if (list[index].status == "INACTIVE") {
                                    label = '<span class="label label-warning">INACTIVE</span>';
                                  }

                                  listItem = '<tr><td><a href="#">'+list[index].id+'</a></td><td>'+list[index].name+'</td><td>'+list[index].company+'</td><td>'+list[index].contact+'</td><td>'+label+'</td></tr>'

                                        $('#clients-list').html(
                                                $('#clients-list').html() + listItem
                                        )

                                })

                        },
                        error: function(r) {
                                console.log(r)
                        }

                });
}

function porpulateInvoiceSelections(){
  $.ajax({

    type: "GET",
    url: "backend/api/clients",
    processData: false,
    contentType: "application/json",
    data: '',
    success: function(r) {
            let list = JSON.parse(r)
            count = 0;
            output = '<label>Select Client </label> <select id="selectClient-filter" name="multiselect4[]" class="multiselect multiselect-custom form-control"> ';
            $.each(list, function(index) {
              count++;
              console.log("Got Reps");
              console.log(list[index]);
              labelCompany = '';
              if (list[index].company != "") {
                labelCompany = '[From: '+list[index].company+']';
              }



              output += '<option value="'+list[index].name+ ' '+labelCompany+'">'+list[index].name+ ' '+labelCompany+'</option>';
                    // $("#selectClient-filter").append('<option value="'+list[index].name+labelCompany+'">'+list[index].name+labelCompany+'</option>');
                    console.log("Should append Client Now Now");
                    // $("#selectClient-filter").html(
                    //         $("#selectClient-filter").html() + listItem
                    // )

            })

            output += '</select> <br>';
              $("#selectClientField").html(output);

    },
    error: function(r) {
            console.log(r)
    }

  });

  $.ajax({

    type: "GET",
    url: "backend/api/items",
    processData: false,
    contentType: "application/json",
    data: '',
    success: function(r) {
            let list = JSON.parse(r)

            count = 0;
            output = '<label>Select Items </label> <select id="selectItems-filter" name="selectItems[]" class="multiselect multiselect-custom form-control" multiple="multiple"> ';
            $.each(list, function(index) {
              // count++;
              // console.log("Got items");
              // console.log(list[index]);
              // label = '';
              // if (list[index].status == "AVAILABLE") {
              //   label = '<span class="label label-success">AVAILABLE</span>';
              // } else if (list[index].status == "OUT OF STOCK") {
              //   label = '<span class="label label-warning">OUT OF STOCK</span>';
              // }

              output += '<option value=\''+JSON.stringify(list[index])+'\'">'+list[index].item+' [Price: '+list[index].price+']</option>';
              // $("#selectItems-filter").append('<option value="'+list[index]+'">'+list[index].item+'</option>');
                console.log("Should append item Now Now");
                    // $("#selectItems-filter").html(
                    //         $("#selectItems-filter").html() + listItem
                    // )

            })
            output += '</select> <br>';
              $("#selectItemsField").html(output);
              $('#multiselect1, #multiselect2, #single-selection, #multiselect5, #multiselect6').multiselect({
                maxHeight: 300
              });

              $('#multiselect3-all').multiselect({
                includeSelectAllOption: true,
              });

              $('#selectClient-filter').multiselect({
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                maxHeight: 200
              });

              $('#selectItems-filter').multiselect({
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                maxHeight: 200
              });

              $('#multiselect-size').multiselect({
                buttonClass: 'btn btn-default btn-sm'
              });

              $('#multiselect-link').multiselect({
                buttonClass: 'btn btn-link'
              });

              $('#multiselect-color').multiselect({
                buttonClass: 'btn btn-primary'
              });

              $('#multiselect-color2').multiselect({
                buttonClass: 'btn btn-success'
              });
    },
    error: function(r) {
            console.log(r)
    }

  });
}

$('#AddSalesRep-btn').click(function() {

        $.ajax({

                type: "POST",
                url: "backend/api/users",
                processData: false,
                contentType: "application/json",
                data: '{ "name": "'+ $("#salesRepName-input").val() +'", "email": "'+ $("#salesRepEmail-input").val() +'" }',
                success: function(r) {
                        console.log(r)
                        toastr['success']("Added Successfully");
                        window.location.reload();
                        // setupAccount(r);
                },
                error: function(r) {
                  toastr['error']("Error: Failed To Add, May be due to no internet connection");
                        // setTimeout(function() {
                        // $('[data-bs-hover-animate]').removeClass('animated ' + $('[data-bs-hover-animate]').attr('data-bs-hover-animate'));
                        // }, 2000)
                        // $('[data-bs-hover-animate]').addClass('animated ' + $('[data-bs-hover-animate]').attr('data-bs-hover-animate'))
                        console.log(r)
                }

        });

});

$('#AddItem-btn').click(function() {

        $.ajax({

                type: "POST",
                url: "backend/api/items",
                processData: false,
                contentType: "application/json",
                data: '{ "item": "'+ $("#itemName-input").val() +'", "price": "'+ $("#itemPrice-input").val() +'" }',
                success: function(r) {
                        console.log(r)
                        toastr['success']("Added Successfully");
                        window.location.reload();
                        // setupAccount(r);
                },
                error: function(r) {
                  toastr['error']("Error: Failed To Add, May be due to no internet connection");
                        // setTimeout(function() {
                        // $('[data-bs-hover-animate]').removeClass('animated ' + $('[data-bs-hover-animate]').attr('data-bs-hover-animate'));
                        // }, 2000)
                        // $('[data-bs-hover-animate]').addClass('animated ' + $('[data-bs-hover-animate]').attr('data-bs-hover-animate'))
                        console.log(r)
                }

        });

});
$('#AddClient-btn').click(function() {

        $.ajax({

                type: "POST",
                url: "backend/api/clients",
                processData: false,
                contentType: "application/json",
                data: '{ "company": "'+ $("#companyName-input").val() +'", "name": "'+ $("#contactName-input").val() +'", "contact": "'+ $("#clientContact-input").val() +'" }',
                success: function(r) {
                        console.log(r)
                        toastr['success']("Added Successfully");
                        window.location.reload();
                        // setupAccount(r);
                },
                error: function(r) {
                  toastr['error']("Error: Failed To Add, May be due to no internet connection");
                        // setTimeout(function() {
                        // $('[data-bs-hover-animate]').removeClass('animated ' + $('[data-bs-hover-animate]').attr('data-bs-hover-animate'));
                        // }, 2000)
                        // $('[data-bs-hover-animate]').addClass('animated ' + $('[data-bs-hover-animate]').attr('data-bs-hover-animate'))
                        console.log(r)
                }

        });

});
//
// function showRecordView(){
//   var count = recordList.length;
//   var listItems = '<li class="header"><strong>You have <span id="assessment-count"> '+count+' </span> Assessment Records</strong></li>';
//   // $("#assessment-count").html(count);
//   for (var i = 0; i < count; i++) {
//     listItems += '<li><a href="#"><div class="media"><div class="media-left"><i class="fa fa-fw fa-flag-checkered text-muted"></i></div><div class="media-body"><p class="text"><strong><span>'+recordList[i].subjectName+'</span></strong> <span>'+recordList[i].subjectYear+' on '+recordList[i].date+' '+recordList[i].fromTime+' - '+recordList[i].toTime+'</span></p><span class="timestamp">Score: '+recordList[i].score+' out of '+recordList[i].total+'</span></div></div></a></li>';
//   }
//   listItems += '<li class="footer"><a onclick="resetRecords()" class="more">Clear Records</a></li>';
//   $("#records-view").html(listItems);
//
// }
