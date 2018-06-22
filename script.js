$(document).ready(() => {

    console.log('hello! welcome to trading calculator');

    // search function

    $("#search-input").on("keyup", function() {
      let value = $(this).val().toLowerCase();
      $("#search-list li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)

      });
    });


const $stockObj = [
  {
    name: "Google",
    symbol: "GOOG",
    price: "100"
  },
  {
    name: "Apple",
    symbol: "AAPL",
    price: "200"
  },
  {
    name: "Finance and Markets",
    symbol: "FAM",
    price: "300"
  }
];

$.each($stockObj, function(d,i){
  const populateSearchList = $('<li>').append(i.name + " - " + i.symbol)
  $('#stock-name').append(populateSearchList);
})

$('div li').click(function(){
  let that = this;
  console.log(that);
  $('div li').css('background-color', '#a0c4ff');
  $(this).css('background-color', 'pink');
})

// const populateTable;

  // const handleStockData = data =>{
  //   data.foreach( el => {
  //     let $newLi = $('<li>Hello</li>');
  //     newLi.text(${el.name})
  //   })

  // }
// ajax call
// const ajax1 = $.ajax({
//   url: 'https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol,name',
//   method: 'GET',
//   dataType: "JSONP"
// })
// const ajax2 = $.ajax({
//   url: 'https://api.iextrading.com/1.0/stock/aapl/price',
//   method: 'GET',
//   dataType: "JSONP"
// })
//
//    $.ajax ({
//        url: 'https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol,name',
//        method: 'GET',
//        dataType: "JSONP"
//
//    })
//    .then(data => {
//      $.each(data, function(d,i){
//
//       let $stock = $('<li>').append(i.name + " - " + i.symbol);
//
//        // let $li = $('<li>').append(
//        //   $('<li>').text(i.name)
//        // )
//        $('#stock-name').append($stock);
//        // $('#stock-symbol').append($symbol)
//      })
//
//      $("div li").click(function(){
//        $(this).css("background-color", "pink");
//      });
//
//
//    })
   // console.log('this is data', data.name);
   // Hide li when clicked


});
