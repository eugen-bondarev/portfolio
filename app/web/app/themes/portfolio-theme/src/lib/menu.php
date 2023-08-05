<?php

namespace PortfolioTheme\Lib;

add_action( 'init', function () {
	register_nav_menus(
		[ 
			'header-menu' => __( 'Header Menu' ),
			'footer-menu' => __( 'Footer Menu' )
		]
	);
} );

function getMenuItems( string $menuName ) {
	$items = wp_get_nav_menu_items( $menuName ) ?: [];
	return array_map(
		fn($item) => [ 
			'ID'    => $item->ID,
			'title' => $item->post_title ?: $item->title,
			'url'   => $item->url
		],
		$items
	);
}