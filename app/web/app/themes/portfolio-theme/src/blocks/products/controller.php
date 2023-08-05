<?php

use EcommerceTheme\Lib\Product;

$controller = function ($attributes, $content) {
	$productIds = $attributes['productIds'];
	$products = collect( $productIds )
		->map( fn($id) => new Product( $id ) )
		->all();

	return [ 
		'products' => $products
	];
};