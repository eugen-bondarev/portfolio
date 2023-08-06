<?php

namespace PortfolioTheme;

use WP_Query;


function getVariants($value)
{
	$MAX_STARS     = 5;
	$numFullStars  = floor($value);
	$numEmptyStars = $MAX_STARS - ceil($value);
	$numHalfStars  = $MAX_STARS - ($numFullStars + $numEmptyStars);
	return collect([])
		->pad($numFullStars, 'full')
		->pad($numFullStars + $numHalfStars, 'half')
		->pad($MAX_STARS, 'empty')
		->all();
}

// require_once(__DIR__ . '/vendor/autoload.php');

add_filter(
	'portfolio-theme/inject-data',
	fn ($data) => array_merge(
		$data,
		[
			'loggedIn' => wp_get_current_user()->ID !== 0 ? 'true' : 'false'
		]
	)
);

add_action('wp_head', function () {
	echo '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
	echo '<meta name="theme-color" content="#3A40CF" />';
});

add_action('after_setup_theme', function () {
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
});

foreach (glob(__DIR__ . '/src/lib/*.php') as $file) {
	require_once($file);
}

function enqueueStyle(string $handle, string $webpackEntry)
{
	$stylePath = '/dist/' . $webpackEntry . '.css';
	if (!file_exists(get_template_directory() . $stylePath)) {
		return;
	}
	wp_enqueue_style(
		$handle . '.css',
		get_template_directory_uri() . $stylePath
	);
}
function enqueueEntry(string $handle, string $webpackEntry, $injectData = [], bool $inFooter = false)
{
	$asset      = require(__DIR__ . '/dist/' . $webpackEntry . '.asset.php');
	$scriptPath = '/dist/' . $webpackEntry . '.js';
	wp_enqueue_script(
		$handle,
		get_template_directory_uri() . $scriptPath,
		$asset['dependencies'],
		$asset['version'],
		$inFooter
	);

	if (!empty($injectData)) {
		$scriptToInject = "window['$handle'] = {};";
		foreach ($injectData as $key => $value) {
			$stringifiedValue = json_encode($value);
			$scriptToInject .= "window['$handle'].$key = $stringifiedValue;";
		}
		wp_add_inline_script($handle, $scriptToInject, 'before');
	}

	enqueueStyle($handle, $webpackEntry);
}

add_action('wp_enqueue_scripts', function () {
	if (!defined('WOOCOMMERCE_CART'))
		define('WOOCOMMERCE_CART', TRUE);
	$data = apply_filters('portfolio-theme/inject-data', []);
	enqueueEntry('portfolio-theme/frontend', 'frontend', $data);
	enqueueStyle('portfolio-theme/frontend/tailwind', 'tailwind');
});

add_action('enqueue_block_editor_assets', function () {
	$data = [
		'blocksInjectData' => apply_filters('portfolio-theme/blocks/inject-data', [])
	];
	enqueueEntry('portfolio-theme/blocks', 'blocks', $data);
	enqueueStyle('portfolio-theme/blocks/tailwind', 'tailwind');
});

foreach (glob(__DIR__ . '/src/actions/*.php') as $file) {
	require_once($file);
}

// WOO
add_theme_support('woocommerce');

add_filter('woocommerce_enqueue_styles', '__return_empty_array');



add_action('wp_enqueue_scripts', function () {
	// wp_dequeue_style( 'wp-block-library' );
	wp_dequeue_style('wp-block-library-theme');
	wp_dequeue_style('wc-blocks-style'); // Remove WooCommerce block CSS
}, 100);


// Enable Gutenberg in WooCommerce
// function activate_gutenberg_product( $can_edit, $post_type ) {

// 	if ( $post_type == 'product' ) {
// 		$can_edit = true;
// 	}
// 	return $can_edit;
// }
// add_filter( 'use_block_editor_for_post_type', 'activate_gutenberg_product', 10, 2 );


// add_filter( "wc_stripe_elements_options", "customize_stripe_options" );
// function customize_stripe_options( $options ) {
// 	$options["fonts"] = array(
// 		array(
// 			"family" => "Font Name",
// 			"src"    => "url(https://fonts.googleapis.com/css?family=Open+Sans)"
// 		)
// 	);
// 	return $options;
// }

// // Customize Stripe styles
// add_filter( "wc_stripe_elements_styling", "customize_stripe_styles" );
// function customize_stripe_styles( $styles ) {
// 	$styles = array(
// 		"base" => array(
// 			"fontFamily" => "Font Name",
// 			"fontSize"   => "16px",
// 			"color"      => "black"
// 		)
// 	);
// 	return $styles;
// }


// function issue487_example( $options ) {
// 	$options['fonts'] = array(
// 		array(
// 			'cssSrc' => 'https://fonts.googleapis.com/css?family=Open+Sans',
// 		),
// 		array(
// 			'family' => 'avenir-light',
// 			'src'    => "local('avenir-light'), url('https://example.com/Avenir-Light.eot') format('embedded-opentype'), url('https://example.com/Avenir-Light.woff') format('woff')"
// 		),
// 	);
// 	return $options;
// }
// add_filter( 'wc_stripe_elements_options', 'issue487_example' );

// add_filter( 'wc_stripe_elements_styling', function ($styles) {
// 	$styles['base']['fontFamily'] = 'Roboto';
// 	return $styles;
// } );

$productCustomFields = [
	'defaultVariant' => [],
	'gallery'        => [],
	'page'           => [],
	'usage'          => [],
	'return'         => [],
	'delivery'       => [],
];

// Display Fields
add_action(
	'woocommerce_product_options_advanced',
	function () {
		global $woocommerce, $post;
		echo '<div class="product_custom_field">';
		// woocommerce_wp_text_input(
		// 	array(
		// 		'id'          => '_custom_product_text_field',
		// 		'placeholder' => 'Custom Product Text Field',
		// 		'label'       => __( 'Custom Product Text Field', 'woocommerce' ),
		// 		'desc_tip'    => 'true'
		// 	)
		// );
		// woocommerce_wp_text_input(
		// 	array(
		// 		'id'                => '_custom_product_number_field',
		// 		'placeholder'       => 'Custom Product Number Field',
		// 		'label'             => __( 'Custom Product Number Field', 'woocommerce' ),
		// 		'type'              => 'number',
		// 		'custom_attributes' => array(
		// 			'step' => 'any',
		// 			'min'  => '0'
		// 		)
		// 	)
		// );
		// woocommerce_wp_textarea_input(
		// 	array(
		// 		'id'          => '_custom_product_textarea',
		// 		'placeholder' => 'Custom Product Textarea',
		// 		'label'       => __( 'Custom Product Textarea', 'woocommerce' )
		// 	)
		// );
		global $productCustomFields;
		foreach ($productCustomFields as $fieldName => $params) {
			woocommerce_wp_textarea_input(
				[
					'id'          => $fieldName,
					'placeholder' => $fieldName,
					'label'       => $fieldName
				]
			);
		}

		echo '</div>';
	}
);

add_action(
	'woocommerce_process_product_meta',
	function ($post_id) {
		global $productCustomFields;
		foreach ($productCustomFields as $fieldName => $params) {
			$value = $_POST[$fieldName];
			if (!empty($value))
				update_post_meta($post_id, $fieldName, esc_attr($value));
		}
		// $woocommerce_custom_product_number_field = $_POST['_custom_product_number_field'];
		// if ( ! empty( $woocommerce_custom_product_number_field ) )
		// 	update_post_meta( $post_id, '_custom_product_number_field', esc_attr( $woocommerce_custom_product_number_field ) );
		// $woocommerce_custom_procut_textarea = $_POST['_custom_product_textarea'];
		// if ( ! empty( $woocommerce_custom_procut_textarea ) )
		// 	update_post_meta( $post_id, '_custom_product_textarea', esc_html( $woocommerce_custom_procut_textarea ) );
	}
);
