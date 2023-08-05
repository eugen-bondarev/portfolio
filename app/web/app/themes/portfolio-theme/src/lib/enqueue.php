<?php

namespace TheTheme\Lib;

function enqueueStyle( string $handle, string $webpackEntry ) {
	$stylePath = '/dist/' . $webpackEntry . '.css';

	if ( ! file_exists( get_template_directory() . $stylePath ) ) {
		return;
	}
	wp_enqueue_style(
		$handle . '.css',
		get_template_directory_uri() . $stylePath
	);
}

function enqueueEntry( string $handle, string $webpackEntry, $injectData = null, bool $inFooter = false ) {
	$asset      = require( __DIR__ . '/../../dist/' . $webpackEntry . '.asset.php' );
	$scriptPath = '/dist/' . $webpackEntry . '.js';
	wp_enqueue_script(
		$handle,
		get_template_directory_uri() . $scriptPath,
		$asset['dependencies'],
		$asset['version'],
		$inFooter
	);

	if ( $injectData ) {
		wp_localize_script( $handle, 'THE_THEME_INJECTED_DATA', $injectData );
	}

	enqueueStyle( $handle, $webpackEntry );
}