<?php

use function PortfolioTheme\Lib\getMenuItems;

$controller = function () {
	return [ 
		'title' => 'Anima Forms',
		'menu'  => [ 
			'headerItems' => getMenuItems( 'Header Menu' ),
			'footerItems' => getMenuItems( 'Footer Menu' )
		],
	];
};