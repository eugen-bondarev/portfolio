<?php

use EcommerceTheme\Lib\Product;

$controller = function ($attributes, $content) {
	$productId = $attributes['productId'];
	return (array) ( ( new Product( $productId, null, true ) )->reviews );
};