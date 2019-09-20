<?php

$test = 'testing 1 2 3';
echo $test;

add_action("wp_ajax_stock_data", "get_stock_data");

function get_stock_data(){
	if(is_cache_old()) {
		$result = get_data_from_source();
		if($result === false) {
			//If source data not available then load from cache.
			$result = get_data_from_cache();
			if($result === false) {
				//Both cache and source data is not available.
				$result = json_encode('Error: unable to establish connection and no cache available.');
			}
		} else {

			//Data loaded from source so save cache.

			save_cached_data($result);
		}
	} else {
		
		//Cache is not old so load from cache

		$result = get_data_from_cache();
	}
	//
	// echo $result;
	//
	function get_data_from_source() {
		$url = 'https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol,name';
		try {
			$result = @file_get_contents($url);
		} catch (Exception $e) {
			$result = false;
			error_log($e);
		}
		wp_send_json( $result )
//return $result;
	}
	//
	function is_cache_old() {
		$ten_minutes_in_seconds = 600;
		$now = time();
		if(file_exists('last-cache-time.txt')) {
			$last = intval(file_get_contents('last-cache-time.txt'));
		} else {
			$last = 0;
		}
		if($last + $ten_minutes_in_seconds > $now) {
			return false;
		}
		return true;
	}
	//
	function get_data_from_cache() {
		if(file_exists('cache.json')) {
			return file_get_contents('cache.json');
		} else {
			return false;
		}
	}
	//
	function save_cached_data($result) {
		file_put_contents( 'cache.json', $result );
		file_put_contents( 'last-cache-time.txt', time() );
	}
	
}
?>
