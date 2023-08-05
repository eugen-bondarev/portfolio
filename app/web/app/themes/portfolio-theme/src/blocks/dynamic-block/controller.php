<?php

add_filter('portfolio-theme/inject-data', function ($current) {
	$args     = array(
		'post_type'      => 'product',
		'posts_per_page' => -1,
	);
	$products = (new WP_Query($args))->posts;
	return array_merge($current, [
		'products' => array_map(
			function (WP_Post $post) {
				$product = wc_get_product($post->ID);
				return [
					'ID'        => $post->ID,
					'price'     => floatval($product->get_price()),
					'priceHTML' => $product->get_price_html(),
					'title'     => $product->get_title(),
					'content'   => $post->post_content
				];
			},
			$products
		)
	]);
});

$controller = function ($attributes, $content) {
	return [
		'attributes' => $attributes,
		'content'    => $content
	];
};
