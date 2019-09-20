jQuery(document).ready(function($){
    let $stockCounter = 0;
$('#search-list').attr('list-style-type', 'none');
//    the delay function set as a variable
    const delay = (function(){
        let timer = 0;
        return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
        };
    })();
//    search function
   $('#search-input').on( 'keyup', function() {
		let searchTerm = $( this ).val().toLowerCase();
       		let dataString = '[data-search-term ^= ' + '"' + searchTerm + '"' + '], ' + '[data-tag ^= ' + '"' + searchTerm + '"' + ']';

		delay( function() {
			if( searchTerm.length === 0 ) {
				$( "#stock-name-results" ).html( "" );
				$( "#stock-name" ).show();
			} else {
				//Hide the full lists of stocks
				$( "#stock-name" ).hide();

				//Clear the search results
				$( "#stock-name-results" ).html( "" );

				//Search the full list of stocks and append the results to the search results ul
				$( "#stock-name li" ).filter( dataString ).clone().appendTo( $( "#stock-name-results" ) );
		$("#search-list li").off('click').on('click', function() {
                $('.data-item').css('background-color', '#a0c4ff');
                $(this).css("background-color", "pink");
                let $that = $(this).text();
                let $stock = $that.split('— ');
                $symbol = $stock[1].toLowerCase();
                localStorage.content = $symbol;
                console.log($symbol);
            });
			}
		}, 500 );
	 } );

    $.ajax({
            url: `https://tradingstrategyguides.com/wp-content/plugins/trading-calculator/cache.json`,
            method: 'GET',
            dataType: "JSON"
        }).then(function(data) {

//   connecting to wordpress ajax handler
//    const data = {
//		action: 'get_trading_data',  // We pass php values differently!
//	};
//	jQuery.get(ajax_url, data, function (response) {
//	   console.log( 'this is our response', response );
//        $('#search-list').load(data);

            let $stock = '';
            let $stockArr = [];
//        adds the data values and creates the lis to the stock array before anything is added to the searchlist in the dom
            $.each(data, function(d, i) {
                $stock = $(`<li class='data-item' data-search-term='${i.name.toLowerCase()}' data-tag='${i.symbol.toLowerCase()}'>`).append(i.name + " — " + i.symbol);
                $stockArr.push($stock);
            });
//        after the data is looped through and the stock array is created then the data is added to the search list
            $('#stock-name').append($stockArr);
//click event for selecting individual stocks from the searchlist
            $(".data-item").off('click').on('click', function() {
                $('.data-item').css('background-color', '#a0c4ff');
                $(this).css("background-color", "pink");
                let $that = $(this).text();
                let $stock = $that.split('— ');
                $symbol = $stock[1].toLowerCase();
                localStorage.content = $symbol;
                console.log($symbol);
            });
        });
//    click event for add the selected stock to the stock table
    $('#add-stock').off('click').on('click', function(event) {
        if ($stockCounter >= 10){
            $('#too-much').show();
            event.preventDefault();
            return;
        } else {
            $('#too-much').hide();
            $stockCounter = $stockCounter + 1;
        }
    // console.log('this is stock Counter', $stockCounter)
//        once a stock is selected from the list another ajax call is made to get that indivdual stocks price data to display in the table
        $.ajax({
                url: `https://api.iextrading.com/1.0/stock/${localStorage.content}/quote`,
                method: 'GET',
                dataType: "JSONP"
            }).then(function(data) {
                let $tr = $('<tr class="rows">').append(
                    $('<td class="table-name">').text(data.companyName),
                    $('<td class="table-symbol">').text(data.symbol),
                    $('<td class="table-price">').text(data.latestPrice),
                    $('<input class="table-percent" value=0>').text(0), $('<td class="table-invest">').text(0),
                    $('<td class="table-shares">').text(0),
                    $('<button id="trash" class="btn btn-danger"><i class="fa fa-trash"></i></button>')
                )
                    $('#stock-table').append($tr);
                    $('#stock-table').show();
                    $('#calculate-button').show();
        });
    });


        $('#calculate-button').on('click', function(event) {
            let percentTotal = 0;
            let value = parseInt($(this).val());
            console.log('this is value',value);
            $('.table-percent').each(function() {
            if (isNaN(value)){
                 percentTotal = 0
            }
                percentTotal = percentTotal + parseInt($(this).val());

            })
            console.log('this is percenttotal', percentTotal);

            console.log('this is percenttotal', percentTotal);

            if (percentTotal > 100){
//                console.log($(this));
//                $('td tr th .rows .table-percent').attr('color', 'red');
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
                    $investCell.empty().append('$' + $investmentTotal.toFixed(2));
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
    });


});
