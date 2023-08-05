<?php

$controller = function () {
	$content = do_shortcode( do_blocks( get_the_content() ) );
	// $content = get_the_content();
	// $content = woocommerce_content();

	return [ 
		'content' => $content,
	];
};