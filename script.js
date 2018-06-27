$(document).ready(() => {
// var $symbol;
    console.log('hello! welcome to trading calculator');

    // search function

    $("#search-input").on("keyup", function() {
      let value = $(this).val().toLowerCase();
      $("#search-list li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)

      });
    });

// AJAX calls
function ajaxOne(){
  $.ajax({
      url: 'https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol,name',
      method: 'GET',
      dataType: "JSONP"
  });
};


  $.ajax({
  url: 'https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol,name',
  method: 'GET',
  dataType: "JSONP"
})
.then(function(data) {
  $.each(data, function(d,i){
  let $stock = $('<li>').append(i.name + " — " + i.symbol);
  $('#stock-name').append($stock);
    });


    $("div li").off('click').on('click', function(){

      $('div li').css('background-color', '#a0c4ff');
      $(this).css("background-color", "pink");
     let  $that = $(this).text();
     let  $stock = $that.split('— ');
      $symbol = $stock[1].toLowerCase();

     localStorage.content = $symbol;
      // const addStock = function(){
      //   console.log('clicked')
      // }
    })
    // .then(data => {
    //   url: 'https://api.iextrading.com/1.0/stock/' + $symbol + '/price',
    //   // method: "GET",
    //   // dataType: "JSONP"
    // });
  });
$('#add-stock').on('click', function(){
  $.ajax({
  url: `https://api.iextrading.com/1.0/stock/${localStorage.content}/quote`,
  method: 'GET',
  dataType: "JSONP"
})
.then(function(data){
  let $tr = $('<tr>').append(
      $('<td>').text(data.companyName),
      $('<td>').text(data.symbol),
      $('<td>').text(data.latestPrice),
      $('<input>').text(0),
      $('<td>').text(0),
      $('<td>').text(0)

)
 $('#stock-table').append($tr);
})
console.log(localStorage[0]);
// console.log($symbol);
});
//
// const getSymbols = $.ajax({
//   url: `https://api.iextrading.com/1.0/stock/${$symbol}/price`,
//   method: 'GET',
//   dataType: 'JSONP'
// })
//
//
});
//
//
// // AJAX handlers
//

  //   $.each(data, function(d,i){
  //   let $stock = $('<li>').append(i.name + " — " + i.symbol);
  //   $('#stock-name').append($stock);
  // });
//
// $('#add-stock').off('click').on('click', function(){
//    console.log('this is symbol', $symbol);
// })
//
// const addToStockTable = data => {
//
// }
