<?php

/**
 * Plugin Name: Portfolio Control
 * Version: 1.0.0
 * Author: Eugen Bondarev
 * Author URI: https://eugen-bondarev.com
 * Text Domain: portfolio-control
 */

function execWithErrors( $cmd ) {
	return shell_exec( "$cmd 2>&1" );
}

class PortfolioControl {
	private const PATH_TO_WP_CLI = '/var/www/html/vendor/bin/wp';
	private const PATH_TO_DUMP_REPO = '/var/www/linode-cluster-db-backup';
	private const PATH_TO_DUMP = self::PATH_TO_DUMP_REPO . '/backup.sql';

	public function __construct() {
		add_action( 'rest_api_init', fn() => $this->restAPIInit() );

		add_action( 'admin_menu', function () {
			add_menu_page(
				'DB control',
				'DB control',
				'manage_options',
				'portfolio-control.php',
				function () {
					$script_path = plugin_dir_url( __FILE__ ) . '/script.js';
					$rest_url = get_rest_url() . 'v2';
					$export_db_url = "$rest_url/export-db";
					$import_db_url = "$rest_url/import-db";
					$nonce = wp_create_nonce( 'wp_rest' );
					echo <<<HTML
            <div id="app" data-nonce="$nonce">
              <h1>DB control</h1>
              <button data-url="$export_db_url" class="button">Save</button>
              <button data-url="$import_db_url" class="button">Restore</button>
              <h2>Status:</h2>
              <pre id="status"></pre>
            </div>
            <script src="$script_path"></script>
          HTML;
				},
				'dashicons-database',
				6
			);
		} );
	}

	private function restAPIInit() {
		register_rest_route( 'v2', '/export-db', [ 
			'permission_callback' => fn() => current_user_can( 'edit_posts' ),
			'methods' => WP_REST_Server::READABLE,
			'callback' => fn( ...$args ) => $this->exportDBCallback( ...$args )
		] );
		register_rest_route( 'v2', '/import-db', [ 
			'permission_callback' => fn() => current_user_can( 'edit_posts' ),
			'methods' => WP_REST_Server::READABLE,
			'callback' => fn( ...$args ) => $this->importDBCallback( ...$args )
		] );
	}

	private static function wp( string $wp_cli_cmd ) {
		$cmd = static::PATH_TO_WP_CLI . ' --allow-root ' . $wp_cli_cmd;
		return execWithErrors( $cmd );
	}

	private function exportDBCallback( WP_REST_Request $request ) {
		return [ 
			static::wp( 'db export ' . static::PATH_TO_DUMP ),
			execWithErrors( 'git config --global user.email "eug.bondarev@gmail.com"' ),
			execWithErrors( 'cd ' . self::PATH_TO_DUMP_REPO . '; git add .' ),
			execWithErrors( 'cd ' . self::PATH_TO_DUMP_REPO . '; git commit -m "Update"' ),
			execWithErrors( 'cd ' . self::PATH_TO_DUMP_REPO . '; git push' ),
		];
	}

	private function importDBCallback( WP_REST_Request $request ) {
		return [ 
			execWithErrors( 'git config --global user.email "eug.bondarev@gmail.com"' ),
			execWithErrors( 'cd ' . self::PATH_TO_DUMP_REPO . '; git pull' ),
			static::wp( 'db import ' . static::PATH_TO_DUMP )
		];
	}
}

new PortfolioControl;