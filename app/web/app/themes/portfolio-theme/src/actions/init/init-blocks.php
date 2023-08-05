<?php

namespace PortfolioTheme;

foreach ( glob( __DIR__ . '/../../blocks/**/controller.php' ) as $file ) {
	require $file;
	if ( ! isset( $controller ) ) {
		continue;
	}
	$blockAssetPath = dirname( $file ) . '/block.json';
	$blockAsset     = file_get_contents( $blockAssetPath );
	if ( ! $blockAsset ) {
		continue;
	}
	$blockAsset = json_decode( $blockAsset, true );
	$viewName   = explode( '/blocks/', dirname( $file ) )[1];

	register_block_type(
		$blockAsset['name'],
		[ 
			'attributes'      => array_key_exists( 'attributes', $blockAsset ) ? $blockAsset['attributes'] : [],
			'render_callback' => function ($attributes, $content) use ($viewName) {
				return ( new NewView( "blocks/$viewName" ) )->getRendered( $attributes, $content );
			}
		]
	);
}