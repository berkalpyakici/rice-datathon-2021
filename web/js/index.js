var httpRequest;
var vendorRequest;
var payments;
var vendors;

function getPaymentsJSON() {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = storePayments;
    httpRequest.open("GET", "https://raw.githubusercontent.com/berkalpyakici/rice-datathon-2021/main/data/payments.json", true);
    httpRequest.send();
}

function storePayments() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            payments = JSON.parse(httpRequest.responseText);
        } else {
            alert("error: could not process request");
        }
    }
}

function getVendors() {
    vendorRequest = new XMLHttpRequest();
    vendorRequest.onreadystatechange = storeVendors
    const url = "https://raw.githubusercontent.com/berkalpyakici/rice-datathon-2021/main/data/vendors.json";
    vendorRequest.open("GET", url, true);
    vendorRequest.send();
}

function storeVendors() {
    if (vendorRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            vendors = JSON.parse(httpRequest.responseText);
            alert(vendors[0]);
        } else {
            alert("error: could not process request");
        }
    }
}

function vendorToName(vendorNumber) {
    for (vendor in vendors) {
        if (vendors.vendor === vendorNumber) {
            return vendor;
        }
    }
}

function getPaymentData(agencyNumber) {
    var agencyPayments = payments[agencyNumber];
    var payData = [];
    var labels = [];

    for (var vendorNumber in agencyPayments) {
        payData.push(agencyPayments[vendorNumber]);
        labels.push(vendorToName(vendorNumber));
    }

    var data = {
        datasets: [{
            data: data
        }],

        labels: labels
    }
    return data;
}

function drawPieChart(data) {
    var canvas = document.querySelector(".pieChart");
    canvas.height = window.innerheight;
    canvas.width = window.innerwidth;

    var ctx = canvas.getContext("2d");
    var pieChart = new Chart(ctx, {
        type: "doughnut",
        data: data
    });
}

function listTopVendors(agencyNumber) {
    var agencyPayments = payments[agencyNumber];
    var topVendors = [];
    for (var vendorNumber in agencyPayments) {
        var name = vendorToName(vendorNumber);
        var totalPaid = agencyPayments[vendorNumber];
        topVendors.push([name, totalPaid]);
    }
    topVendors.sort(function(a, b) { return b.totalPaid - a.totalPaid })

    lst = document.querySelector(".uk-list");
    for (vendor in topVendors.slice(0, 5)) {
        var item = document.createElement("li");
        item.textContent = vendor.name;
        lst.appendChild(item);
    }
}

function populatePage() {
    btn = document.querySelector("input");
    btn.onclick = function() {
        drawPieChart(getPaymentData(0));
        // listTopVendors(0);
    }
}

function run() {
    getPaymentsJSON();
    getVendors();
    populatePage();
}

run();
