<?php

/**
 * Plugin Name: Portfolio Control
 * Version: 1.0.0
 * Author: Eugen Bondarev
 * Author URI: https://eugen-bondarev.com
 * Text Domain: portfolio-control
 */

class PortfolioControl
{
	public function __construct()
	{
		add_action('rest_api_init', fn () => $this->restAPIInit());
	}

	private function restAPIInit()
	{
		register_rest_route('v2', '/export-db', [
			'permission_callback' => '__return_true',
			'methods' => WP_REST_Server::READABLE,
			'callback' => fn (...$args) => $this->exportDBCallback(...$args)
		]);
		register_rest_route('v2', '/import-db', [
			'permission_callback' => '__return_true',
			'methods' => WP_REST_Server::READABLE,
			'callback' => fn (...$args) => $this->importDBCallback(...$args)
		]);
		register_rest_route('v2', '/test', [
			'permission_callback' => '__return_true',
			'methods' => WP_REST_Server::READABLE,
			'callback' => fn (...$args) => $this->test(...$args)
		]);
	}

	private function exportDBCallback(WP_REST_Request $request)
	{
		return 'exporting db..';
	}

	private function importDBCallback(WP_REST_Request $request)
	{
		return 'importing db..';
	}

	private function test(WP_REST_Request $request)
	{
		return shell_exec('ls /');
	}
}

new PortfolioControl;

// add_action('rest_api_init', function () {
// 	register_rest_route('v2', '/export-db', [
// 		'methods' => WP_REST_Server::READABLE,
// 		'permission_callback' => '__return_true',
// 		'callback' => function () {
// 			return shell_exec('php wp-cli.phar --allow-root db export test.sql');
// 		}
// 	]);
// 	register_rest_route('v2', '/import-db', [
// 		'methods' => WP_REST_Server::READABLE,
// 		'permission_callback' => '__return_true',
// 		'callback' => function () {
// 			return shell_exec('php wp-cli.phar --allow-root db import test.sql');
// 		}
// 	]);
// 	register_rest_route('v2', '/test', [
// 		'methods' => WP_REST_Server::READABLE,
// 		'permission_callback' => '__return_true',
// 		'callback' => function () {
// 			return shell_exec('ls /var/www/html');
// 		}
// 	]);
// });
