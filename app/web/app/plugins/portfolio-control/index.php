<?php

/**
 * Plugin Name: Portfolio Control
 * Version: 1.0.0
 * Author: Eugen Bondarev
 * Author URI: https://eugen-bondarev.com
 * Text Domain: portfolio-control
 */

class PortfolioControl {
	private const PATH_TO_WP_CLI = '/var/www/html/vendor/bin/wp';
	private const PATH_TO_DUMP = '/var/www/linode-cluster-db-backup/backup.sql';

	public function __construct() {
		add_action( 'rest_api_init', fn() => $this->restAPIInit() );
	}

	private function restAPIInit() {
		register_rest_route( 'v2', '/export-db', [ 
			'permission_callback' => '__return_true',
			'methods' => WP_REST_Server::READABLE,
			'callback' => fn( ...$args ) => $this->exportDBCallback( ...$args )
		] );
		register_rest_route( 'v2', '/import-db', [ 
			'permission_callback' => '__return_true',
			'methods' => WP_REST_Server::READABLE,
			'callback' => fn( ...$args ) => $this->importDBCallback( ...$args )
		] );
	}

	private static function wp( string $wp_cli_cmd ) {
		$cmd = static::PATH_TO_WP_CLI . ' --allow-root ' . $wp_cli_cmd;
		return shell_exec( $cmd );
	}

	private function exportDBCallback( WP_REST_Request $request ) {
		$output = [ 
			static::wp( 'db export ' . static::PATH_TO_DUMP ),
			shell_exec( 'cd /var/www/linode-cluster-db-backup && git add .' ),
			shell_exec( 'cd /var/www/linode-cluster-db-backup && git commit -m "Update"' ),
			shell_exec( 'cd /var/www/linode-cluster-db-backup && git push' ),
		];
		return $output;
	}

	private function importDBCallback( WP_REST_Request $request ) {
		return static::wp( 'db import ' . static::PATH_TO_DUMP );
	}

	private function test( WP_REST_Request $request ) {
		$cmd = urldecode( $request['cmd'] );
		return shell_exec( $cmd );
	}
}

new PortfolioControl;