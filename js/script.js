jQuery(document).ready(function($){
  
	console.log('Hello! welcome to the trading calculator created by TJ Stubbs! If you are interested in seeing some of my work feel free to check out my github /tjrules');
  
// Stock Counter keeps track of how many stocks have been added to the stock list. It's called globally 

  let $stockCounter = 0;

  // This is the search function basically it's a filter function that grabs the search input using the keyup listener to track what is typed into the input box value takes the letters typed into the search input and converts them to lower case another function grabbing the search list and each list item within the search list and grabs the text converts it to lower case and then compares the list item to what is being typed into the search input using index of.

//  search function

$('#search-input').on('keyup', function(){
var searchTerm = $(this).val().toLowerCase();
    $('#search-list li').each(function(){
        if ($(this).filter('[data-search-term ^= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
            $(this).show();
        }
//        else {
//            $(this).hide();
//        };
    });
});
 
// This ajax call is making a GET request for JSONP to a stock quote api from IEX. After the api call is made a .each loops through the entire dataset of all the stocks in the database and appending list items of all the stocks and their symbols together as individual list items in the stock-name list box

  $.ajax({
   	 action: 'admin-ajax'
    	 url: '../admin-ajax.php',
    	 method: 'GET',
    	 dataType: "JSONP",
    	 cache: true
  }).then(function(data) {
//    console.log('this is data from admin-ajax.php',data);
    $.each(data, function(d, i) {

      let $stock = $(`<li data-search-term=${i.name.toLowerCase()}>`).append(i.name + " — " + i.symbol);
      $($stock).addClass('data-item');
      $('#stock-name').append($stock);
    });
// This is the click event for clicking on the stocks that the user wants to hightlight, when a name is clicked on it will turn off any previous hilight and hightlight the
// currently clicked on stock, it also splits the text from the clicked on stock into an array and stores the symbol as a local storage variable so that it can be used to make an
// an additional ajax call for that particular stock so that the current price can be acquired and added into your stock list.
    $("#search-list div li").off('click').on('click', function() {
      $('div li').css('background-color', '#a0c4ff');
      $(this).css("background-color", "pink");
      let $that = $(this).text();
      let $stock = $that.split('— ');
      $symbol = $stock[1].toLowerCase();
      localStorage.content = $symbol;
      console.log($symbol);
// Attempt at a keyboard event that adds the stock selected to the list when enter is hit, but It's not seeming to work
      // $('div li').keyup(function(e){
      //   if(e.which == 13) {
      //     console.log('entered');
      //     $('#add-stock').click();
      //   }
      // const addStock = function(){
      //   console.log('clicked')
      // }
    })
      })


    // .then(data => {
    //   url: 'https://api.iextrading.com/1.0/stock/' + $symbol + '/price',
    //    method: "GET",
    //    dataType: "JSONP"
    // });
  // });
// console.log($(this));
// checkStockCounter = (event) =>{
//
// }


  $('#add-stock').off('click').on('click', function(event) {
    // let $contents = {}, $text;
    //   $('#stock-table .rows').each(function() {
    //     $text = $(this).text();
    //     console.log('this is row', $text);
    //       if (!($text in $contents)){
    //         $contents[$text] = true;
    //       } else {
    //         $(this.parentNode).remove();
    //       }
    //     });
    // Check Duplicates callback function
    // checkStockCounter();
    // checkDup();
    if ($stockCounter >= 10){
      $('#too-much').show();
      event.preventDefault();
    } else {
      $('#too-much').hide();
      $stockCounter = $stockCounter + 1;
    // console.log('this is stock Counter', $stockCounter)
    $.ajax({
      url: `https://api.iextrading.com/1.0/stock/${localStorage.content}/quote`,
      method: 'GET',
      dataType: "JSONP"})
      .then(function(data) {
        let $tr = $('<tr class="rows">').append(
          $('<td class="table-name">').text(data.companyName),
          $('<td class="table-symbol">').text(data.symbol),
          $('<td class="table-price">').text(data.latestPrice),
          $('<input class="table-percent">').text(0), $('<td class="table-invest">').text(0),
          $('<td class="table-shares">').text(0),
          $('<button id="trash" class="btn btn-danger"><i class="fa fa-trash"></i></button>')
      )
      $('#stock-table').append($tr);
      $('#stock-table').show();
      $('#calculate-button').show();
    })

    // let $txt = $(this).children('td:eq(1)').text();
    // if ($seen[localStorage[0]]){
    //    console.log('this is txt', $txt);
    //   $('#no-duplicates').show();
    //    $(this).off('click');
    //   return false;
    //
    //
    // } else {
    //
    //   $('#no-duplicates').hide();
    //   $seen[localStorage[0]] = true;
    // }
    //  console.log(localStorage[0]);
    // console.log($symbol);
}
  });


// const checkDup = () => {
//
// }
  // }

  $('#calculate-button').on('click', function(event) {
    let percentTotal = 0;

    // const investTotal = $('#investment-input').val();
    // let sharesArr = [];
    // let investArr = [];
    // let percentArr = [];
    // let costArr = $('.');

    //   const getPrices = () => {
    //     $('.table-price').each(function(d,i){
    //     let prices = [];
    //     let price = $(this).text();
    //     prices.push(price)
    //      prices.parseInt();
    // console.log('table-price data', prices);
    //   })
    // }
    // console.log(investTotal);
    // if (typeof(investTotal) !== NaN) {
    //   $('#input-val-msg').hide();
    //   console.log('your investment total is', investTotal);
    // } else {
    //   $('#input-val-msg').show();
    // }

    $('.table-percent').each(function() {
      // percentTotal = 0;
      percentTotal = percentTotal + parseInt($(this).val());
      // if (percentTotal === 100) {
      //   $('#percent-message').hide();
      // } else {
      //   $('#percent-message').show();
      //   console.log('does not equal 100');
      // }
    })
    console.log('this is percenttotal', percentTotal);
    if (percentTotal !== 100){
      $('#percent-message').show();
      event.preventDefault();
    } else {
    // console.log(calcPercent);
      $('#percent-message').hide();
    // Loops through each table row and calculates the data
    $('.rows').each(function(d, i) {
      // console.log('this is data',i);
      let $price = 0;
      let $percent = 0;
      let $investment = 0;
      let $percentToDecimal = 0;
      let $investmentTotal = 0;
      let $shareTotal = 0;
      let $investCell = $(this).find('.table-invest');
      let $shareCell = $(this).find('.table-shares');
      $price = $(this).find('.table-price').text();
      // $parsePrice = parseFloat($price) * 1;
      $percent = $(this).find('input.table-percent').val();
      $investment = $('#investment-input').val();
      $percentToDecimal = parseFloat($percent) / 100.0;
      $investmentTotal = $investment * $percentToDecimal;
      $shareTotal = $investmentTotal / $price;
      $investCell.empty().append('$' + $investmentTotal);
      $shareCell.empty().append($shareTotal.toFixed(2));
      // let $sharesNeeded =
      // let $splitRowData = i.split(">");
      console.log('this is price', $price);
      // console.log('this is ParsePrice', $parsePrice);
      console.log('this is percent', $percent);
      console.log('this is investment', $investment);
      console.log('this is percent', $percentToDecimal);
      console.log('this is investmentTotal', $investmentTotal);
      console.log('this is shareTotal', $shareTotal);
    });
}
  })

  // Delete Table Row
  $('#stock-table').on('click', '.btn', function() {
    // event.preventDefault();
    $stockCounter = $stockCounter - 1;
    $('#too-much').hide();
    console.log('stock count subtracted', $stockCounter);
    $(this).closest('tr').remove();
    return false;
  })

});
//
//
//  AJAX handlers
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
