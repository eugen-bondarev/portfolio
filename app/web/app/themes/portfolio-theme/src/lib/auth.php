<?php

namespace PortfolioTheme\Lib;

function get_user_cookie_name() {
	$matches = array_values(
		array_filter(
			array_keys( $_COOKIE ), fn($value) => str_contains( $value, 'wordpress_logged_in_' )
		)
	);
	if ( count( $matches ) === 0 ) {
		return null;
	}
	return $matches[0];
}

function get_user_cookie_value() {
	$cookie_name = get_user_cookie_name();
	if ( ! $cookie_name ) {
		return null;
	}
	return $_COOKIE[ $cookie_name ];
}

function get_username_from_cookie() {
	$cookie_value = get_user_cookie_value();
	if ( ! $cookie_value ) {
		return null;
	}
	return explode( '|', $cookie_value )[0];
}

function get_user_from_cookie() {
	$username = get_username_from_cookie();
	if ( ! $username ) {
		return null;
	}
	return get_user_by( 'login', $username );
}

function current_user_is_admin() {
	$user = get_user_from_cookie();
	if ( ! $user ) {
		return false;
	}
	return in_array( 'administrator', $user->roles );
}