<?php

use EcommerceTheme\Lib\Product;

$controller = function ($attributes, $content) {
	$productId = $attributes['productId'];
	// file_put_contents( __DIR__ . '/' . $productId, '' );
	return ( (array) new Product( $productId ) );
};