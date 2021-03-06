var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;

if (dd < 10) { dd = '0' + dd }
if (mm < 10) { mm = '0' + mm }

today = mm + '/' + dd + '/' + today.getFullYear();
// document.querySelector('[data-today]').innerHTML = today;

clientID = '';
invoiceDate = '';
invoiceNo = getRndInteger(1000,9999);
dueDate = '';
itemsIDs = [];


// function addInitTableRow(item, index) {
//     var emptyColumn = document.createElement('tr');
//
//     emptyColumn.innerHTML = '<td class="left"><a class="cut"> - </a><span class="strong" contenteditable>'+ item +'</span> <br><span data-prefix> DA</span>  <span class="right" data-price contenteditable>0.00</span> x <span class="center" contenteditable data-qty>1</span></td>' + '<td class="right"><span data-prefix> DA</span> <span data-price>0.00</span> </td>';
//
//     return emptyColumn;
// }

$('#GenerateInvoice-btn').click(function() {
  $('#main-contentArea').html(invoiceView);
  genereteInvoiceOnContentLoad();
  client = $("#selectClient-filter").val();
  invoiceDate = $("#invoiceDate-input").val();
  invoiceNo = getRndInteger(1000,9999);
  // invStr = "#INV";
  invoiceNoString = invoiceNo.toString();
  dueDate = $("#dueDate-input").val();
  itemsIDs = $("#selectItems-filter").val();
  // invoiceItemsList = JSON.parse(itemsIDs);
  invoiceItemsList = itemsIDs;
  $('#billTo-content').text("Bill To: "+client);
  $('#invoiceNo-content').text(invoiceNo);
  $('#invoiceDate-content').text("Date: "+invoiceDate);
  $('#dueDate-content').text("Due: "+dueDate);
  console.log("Items: ");
  console.log(itemsIDs);
  $('.inventory-body').html("");

  invoiceItemsList.forEach(myFunction);
// console.log(invoiceItemsList.length);
function myFunction(item, index) {
  item = JSON.parse(item);
  // console.log("Item: ");
  // console.log(item);
  // console.log("Item Name OBJ: ");
  // console.log(item.name);
  // console.log("Items Name Array: ");
  // console.log(item[0]);

  // <tr><td class="left"><a class="cut"> - </a><span class="strong" contenteditable>'+invoiceItemsList[index]+'</span> <br><span data-prefix> DA</span>  <span class="right" data-price contenteditable>5.00</span> x <span class="center" contenteditable data-qty>1</span></td> <td class="right"><span data-prefix> DA</span> <span data-price>0.00</span> </td></tr>
  $('.inventory-body').html($('.inventory-body').html()+'<tr><td class="left"><a class="cut"> - </a><span class="strong" contenteditable>'+item.item+'</span> <br><span data-prefix> DA</span>  <span class="right" data-price contenteditable>'+item.price+'</span> x <span class="center" contenteditable data-qty>1</span></td> <td class="right"><span data-prefix> DA</span> <span data-price>0.00</span> </td></tr>');
  // document.getElementById(".inventory-body").innerHTML += index + ":" + item + "<br>";
}

        $.ajax({

                type: "POST",
                url: "backend/api/invoice",
                processData: false,
                contentType: "application/json",
                data: '{ "client_id": "'+ client +'", "Invoice": "'+ invoiceNoString +'", "invoice_date": "'+ invoiceDate +'", "due_date": "'+ dueDate +'" }',
                success: function(r) {
                        console.log(r)
                        toastr['success']("Invoice Generated Successfully");
                        // window.location.reload();
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

(function (window, ElementPrototype, ArrayPrototype, polyfill) {
    function NodeList() {
        [polyfill]
    }
    NodeList.prototype.length = ArrayPrototype.length;
    ElementPrototype.matchesSelector = ElementPrototype.matchesSelector ||
        ElementPrototype.mozMatchesSelector || ElementPrototype.msMatchesSelector || ElementPrototype.oMatchesSelector ||
        ElementPrototype.webkitMatchesSelector || function matchesSelector(selector) {
            return
            ArrayPrototype.indexOf.call(this.parentNode.querySelectorAll(selector), this) > -1;
        };

    ElementPrototype.ancestorQuerySelectorAll = ElementPrototype.ancestorQuerySelectorAll ||
        ElementPrototype.mozAncestorQuerySelectorAll ||
        ElementPrototype.msAncestorQuerySelectorAll ||
        ElementPrototype.oAncestorQuerySelectorAll ||
        ElementPrototype.webkitAncestorQuerySelectorAll ||
        function ancestorQuerySelectorAll(selector) {
            for (var cite = this, newNodeList = new NodeList; cite = cite.parentElement;) {
                if (cite.matchesSelector(selector)) ArrayPrototype.push.call(newNodeList, cite);
            }

            return newNodeList;
        };

    ElementPrototype.ancestorQuerySelector = ElementPrototype.ancestorQuerySelector ||
        ElementPrototype.mozAncestorQuerySelector ||
        ElementPrototype.msAncestorQuerySelector ||
        ElementPrototype.oAncestorQuerySelector ||
        ElementPrototype.webkitAncestorQuerySelector ||
        function ancestorQuerySelector(selector) {
            return this.ancestorQuerySelectorAll(selector)[0] || null;
        };
})(this, Element.prototype, Array.prototype);

/* Helper Functions */
function generateTableRow() {
    var emptyColumn = document.createElement('tr');

    emptyColumn.innerHTML = '<td class="left"><a class="cut"> - </a><span class="strong" contenteditable></span> <br><span data-prefix> DA</span>  <span class="right" data-price contenteditable>0.00</span> x <span class="center" contenteditable data-qty>1</span></td>' + '<td class="right"><span data-prefix> DA</span> <span data-price>0.00</span> </td>';

    return emptyColumn;
}

function parseFloatHTML(element) {
    return parseFloat(element.innerHTML.replace(/[^\d\.\-]+/g, '')) || 0;
}

function parsePrice(number) {
    return number.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');
}

/* Update Number */

function updateNumber(e) {
    var
        activeElement = document.activeElement,
        value = parseFloat(activeElement.innerHTML),
        wasPrice = activeElement.innerHTML == parsePrice(parseFloatHTML(activeElement));

    if (!isNaN(value) && (e.keyCode == 38 || e.keyCode == 40 || e.wheelDeltaY)) {
        e.preventDefault();

        value += e.keyCode == 38 ? 1 : e.keyCode == 40 ? -1 : Math.round(e.wheelDelta * 0.025);
        value = Math.max(value, 0);

        activeElement.innerHTML = wasPrice ? parsePrice(value) : value;
    }

    updateInvoice();
}

/* Update Invoice */

function updateInvoice() {
    var total = 0;
    var cells, price, total, a, i;

    // update inventory cells

    for (var a = document.querySelectorAll('table.inventory tbody tr'), i = 0; a[i]; ++i) {
        // get inventory row cells

        cells = a[i].querySelectorAll('span[data-price]');
        qty = a[i].querySelectorAll('span[data-qty]');

        price = parseFloatHTML(cells[0]) * parseFloatHTML(qty[0]);

        // add price to total
        total += price;

        // set row total
        cells[1].innerHTML = parsePrice(price);
    }

    // update balance cells

    // get balance cells
    cells = document.querySelectorAll('table.balance td:last-child span:first-child');

    // set total
    cells[2].innerHTML = parsePrice(total);
    // set TVATVA

    tva = document.querySelector('[data-tva]').innerHTML;
    tva = tva.match(/\d+/)[0];
    tva = parseInt(tva);

    cells[1].innerHTML = parsePrice((tva * total) / 100);

    document.querySelector('span.total').innerHTML = parsePrice(total);

    // set balance and meta balance
    cells[0].innerHTML = parsePrice(total - parseFloatHTML(cells[1]));

    // update prefix formatting

    var prefix = document.querySelector('#prefix').innerHTML;
    for (a = document.querySelectorAll('[data-prefix]'), i = 0; a[i]; ++i) a[i].innerHTML = prefix;

    // update price formatting

    for (a = document.querySelectorAll('span[data-price]'), i = 0; a[i]; ++i)
        if (document.activeElement != a[i]) a[i].innerHTML = parsePrice(parseFloatHTML(a[i]));
}

/* On Content Load */

function genereteInvoiceOnContentLoad() {
    updateInvoice();

    var
        input = document.querySelector('input'),
        image = document.querySelector('img');

    function onClick(e) {
        var element = e.target.querySelector('[contenteditable]'),
            row;

        element && e.target != document.documentElement && e.target != document.body && element.focus();

        if (e.target.matchesSelector('.add')) {
            document.querySelector('table.inventory tbody').appendChild(generateTableRow());
        } else if (e.target.className == 'cut') {
            row = e.target.ancestorQuerySelector('tr');

            row.parentNode.removeChild(row);
        }

        updateInvoice();
    }

    function onEnterCancel(e) {
        e.preventDefault();

        image.classList.add('hover');
    }

    function onLeaveCancel(e) {
        e.preventDefault();

        image.classList.remove('hover');
    }

    function onFileInput(e) {
        image.classList.remove('hover');

        var
            reader = new FileReader(),
            files = e.dataTransfer ? e.dataTransfer.files : e.target.files,
            i = 0;

        reader.onload = onFileLoad;

        while (files[i]) reader.readAsDataURL(files[i++]);
    }

    function onFileLoad(e) {
        var data = e.target.result;

        image.src = data;
    }

    if (window.addEventListener) {
        document.addEventListener('click', onClick);
        document.addEventListener('mousewheel', updateNumber);
        document.addEventListener('keydown', updateNumber);
        document.addEventListener('keydown', updateInvoice);
        document.addEventListener('keyup', updateInvoice);
        input.addEventListener('focus', onEnterCancel);
        input.addEventListener('mouseover', onEnterCancel);
        input.addEventListener('dragover', onEnterCancel);
        input.addEventListener('dragenter', onEnterCancel);
        input.addEventListener('blur', onLeaveCancel);
        input.addEventListener('dragleave', onLeaveCancel);
        input.addEventListener('mouseout', onLeaveCancel);
        input.addEventListener('drop', onFileInput);
        input.addEventListener('change', onFileInput);
    }
}

window.addEventListener && document.addEventListener('DOMContentLoaded', onContentLoad);
