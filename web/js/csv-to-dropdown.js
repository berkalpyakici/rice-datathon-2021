/*
let dropdown = document.getElementById('agency');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Select';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

const url = "https://raw.githubusercontent.com/berkalpyakici/rice-datathon-2021/main/web/List_Agencies.json";

const request = new XMLHttpRequest();
request.open('GET', url, true);


request.onload = function() {
  if (request.status === 200) {
    const data = JSON.parse(request.responseText);
    console.log(request);
    console.log(request[0]);
    let option;
    for (let i = 0; i < data.length; i++) {
      option = document.createElement('option');
      //console.log(option);
      option.text = data[i].name;
      option.value = data[i].abbreviation;
      dropdown.add(option);
    }
   } else {
    // Reached the server, but it returned an error
  }   
}

request.onerror = function() {
  console.error('An error occurred fetching the JSON from ' + url);
};

request.send();*/
$(document).ready(function () {

  var List;
    jQuery.ajax({
      url: "https://raw.githubusercontent.com/berkalpyakici/rice-datathon-2021/main/web/List_Agencies.json",
      type: "POST",
      dataType: "json",
      async: false,
      success: function (data) {
      List = data.aaData;
        $('#ch_user1').empty();
        $('#ch_user1').append('<option value="">All</option>');
        for (i in List ) {
            $('#ch_user1').append('<option value="' + List[i].value + '">' + List[i].text + '</option>');
        }
      }
  });
});