$(document).ready(() => {

    console.log('hello! welcome to trading calculator');

    // search function

    $("#search-input").on("keyup", function() {
      let value = $(this).val().toLowerCase();
      $("#search-list li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)

      });
    });


// const $stockObj = [
//   {
//     name: "Google",
//     symbol: "GOOG",
//     price: "100"
//   },
//   {
//     name: "Apple",
//     symbol: "AAPL",
//     price: "200"
//   },
//   {
//     name: "Finance and Markets",
//     symbol: "FAM",
//     price: "300"
//   }
// ];

// $.each($stockObj, function(d,i){
//   const populateSearchList = $('<li>').append(i.name + ' -' + i.symbol);
//   $('#stock-name').append(populateSearchList);
// })


// New click event for handling data

// $('#stock-name li').on('click', function(){
//   console.log($(this).data())
// })
//
//
// $('div li').click(function(){
//   let that = $(this).text();
//   let regexp = /that-(.*)/;
//   let symbol = that.split('-');
//
//   $('div li').css('background-color', '#a0c4ff');
//   $(this).css('background-color', 'pink');
//   $('#add-stock').click(function(){
//     let $tr = $('<tr>').append(
//       $('<td>').text(symbol[0]),
//       $('<td>').text(symbol[1]),
//       $('<td>').text(symbol.price),
//       $('<td> <input>').text(0),
//       $('<td>').text(0),
//       $('<td>').text(0),
//       $('<td>').text(0)
//
//     );
//       $('#stock-table').append($tr);
//   });
// });

//  <th>Symbol</th>



// wordpress cron job
// .on

// const populateTable = function(){
//   let $tr = ('<tr>')
// }


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
   $.ajax({
       url: 'https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol,name',
       method: 'GET',
       dataType: "JSONP"
   }).done(function(data){
     $.each(data, function(d,i){
     let $stock = $('<li>').append(i.name + " — " + i.symbol);
     $('#stock-name').append($stock);

   })
   .then(data => {

       // $('#stock-symbol').append($symbol)
     })
   })
   $('#add-stock').off('click').on('click', function(){
      console.log('this is symbol', $symbol);
   })
   .then(data=>{
    $.ajax({
       url: `https://api.iextrading.com/1.0/stock/${$symbol}/price`,
       method: 'GET',
       dataType: 'JSONP'
       })
       console.log('this is data', data)
   })
   // console.log('this is data', data.name);
   // Hide li when clicked
   $("div li").off('click').on('click', function(){
     // console.log(this);
     $('div li').css('background-color', '#a0c4ff');
     $(this).css("background-color", "pink");
    let  $that = $(this).text();
    let  $stock = $that.split('— ');
    let  $symbol = $stock[1].toLowerCase();
    console.log($symbol);
     // const addStock = function(){
     //   console.log('clicked')
     // }
   });

// const getData( =>{
//
// })

});
