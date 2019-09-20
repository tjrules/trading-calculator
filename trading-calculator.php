<?php

/*
  Plugin Name: Trading calculator
  Plugin URI:
  Description: Find stock prices and calculate how many shares you 		need to purchase with your given investment total.
  Version: 1.0
  Author: TJ Stubbs
  Author URI: http://tjstubbs.com
  License:
  Text Domain:
*/

//renders the html and loads all scripts and styles needed for the app.

function render_trading_calc($render){
$bootstrap_js_url = 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js';

$bootstrap_css_url = 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css';

$js_url = plugins_url('/js/script.js', __FILE__);
$admin_ajax_url = plugins_url('/admin-ajax.php', __FILE__);
echo $admin_ajax_url;
echo $js_url;

wp_enqueue_script( $js_url);
wp_enqueue_script($bootstrap_js_url);
wp_enqueue_style($bootstrap_css_url);

// registers all scripts and styles to be ready to be loaded when they // are called.
add_action('init', 'enqueue_calc_styles_and_scripts');
//function enqueue_calc_styles_and_scripts(){
   // wp_enqueue_script( 'script', plugins_url('/js/script.js', __FILE__ //)); 
//};
return $render = "
    <div class='wrapper container'>
        <h1 class='text-center'>Finance and Markets Trading Calculator</h1>
        <!--  Investment Input  -->
        <div class='jumbotron text-center' id='investment-wrapper'>
            <h2>Investment Amount:</h2>
            <input id='investment-input' type='text'>
            <h1 id='input-val-msg'>You must enter a number!</h1>
        </div>

<h2>Stock Lookup</h2>
<p>Start typing in the input field to find your stock:</p>
<input id='search-input' type='text' placeholder='Search...''>
<br>

<div class='search-list' id='search-list'>
<ul class= 'stock-name' id='stock-name'></ul>
</div>

<button id='add-stock'>add stock</button>

        <div class='stocks' id='stocks'>
          <table class='table table-bordered stock-table' id='stock-table'>
            <tr>
              <th id='#table-name'>Name</th>
              <th id='#table-symbol'>Symbol</th>
              <th id='#table-price'>Cost</th>
              <th id='#table-percentage'>Percentage</th>
              <th id='#table-investment'>Dollar Total</th>
              <th id='#table-shares'>Shares Needed</th>
            </tr>
          </table>
          <h1 id='percent-message'>Percentages must add up to 100%.</h1>
          <h1 id='too-much'>You can only add ten stocks at a time.</h1>
          <h1 id='no-duplicates'>Duplicates are not allowed.</h1>
        </div>
        <div id='calculator'>
            <button id='calculate-button'>CALCULATE!</button>
        </div>
        <h6>“Data provided for free by <a href='https://iextrading.com/developer' target=_blank>IEX</a>. View IEX’s <a href='' target=_blank>Terms of Use.”</a></h6>
    </div>";

// connects the php admin-ajax file to be called, which gets the stock data, and then caches it.

//require_once($admin_ajax_url);

// calls the scripts and styles which were registered at the start of the render function. 

    //wp_enqueue_style( 'styles');
   // wp_enqueue_style( 'bootstrap' );
    //wp_enqueue_style( 'fontawesome' );
    //wp_enqueue_script( 'scripts');
    //wp_enqueue_script( 'bootstrap');
   // wp_enqueue_script( 'jquery');

};

// Shortcode method: first parameter is the shortcode, just embed [trading_calc] into your post or page to include the app on your site.

add_shortcode('trading_calc', 'render_trading_calc');
?>
