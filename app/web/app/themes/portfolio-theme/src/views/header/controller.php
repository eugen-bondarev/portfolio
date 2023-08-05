<?php

use function PortfolioTheme\Lib\getMenuItems;

function filterMenu( array $items ) {
	$user     = wp_get_current_user();
	$loggedIn = $user->ID !== 0;
	if ( $loggedIn ) {
		return array_values( array_filter( $items, fn($item) => $item['title'] !== 'Log in' ) );
	} else {
		return array_values( array_filter( $items, fn($item) => $item['title'] !== 'Account' ) );
	}
}

$controller = function () {
	return [ 'home' => is_front_page(), 'menu' => [ 'items' => filterMenu( getMenuItems( 'Header Menu' ) ) ] ];
};