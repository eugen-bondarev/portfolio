<?php

/**
 * Plugin Name: Portfolio Control
 * Version: 1.0.0
 * Author: Eugen Bondarev
 * Author URI: https://eugen-bondarev.com
 * Text Domain: portfolio-control
 */

add_action( 'rest_api_init', function () {
	register_rest_route( 'v2', '/export-db', [ 
		'methods' => WP_REST_Server::READABLE,
		'permission_callback' => '__return_true',
		'callback' => function () {
			return shell_exec( 'php wp-cli.phar --allow-root db export test.sql' );
		}
	] );
	register_rest_route( 'v2', '/import-db', [ 
		'methods' => WP_REST_Server::READABLE,
		'permission_callback' => '__return_true',
		'callback' => function () {
			return shell_exec( 'php wp-cli.phar --allow-root db import test.sql' );
		}
	] );
	register_rest_route( 'v2', '/test', [ 
		'methods' => WP_REST_Server::READABLE,
		'permission_callback' => '__return_true',
		'callback' => function () {
			return shell_exec( 'ls' );
		}
	] );
} );