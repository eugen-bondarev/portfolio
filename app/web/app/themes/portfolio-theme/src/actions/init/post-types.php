<?php

register_post_type( 'project', [ 
	'labels'       => [ 
		'name'          => 'Projects',
		'singular_name' => 'Project'
	],
	'rewrite'      => [ 'slug' => 'projects' ],
	'show_in_rest' => true,
	'supports'     => [ 'title', 'editor', 'author', 'thumbnail', 'excerpt' ],
	'taxonomies'   => [ 'tag' ],
	'public'       => true,
	'has_archive'  => true,
] );

register_taxonomy( 'tag', [ 'project' ], [ 
	'show_admin_column' => true,
	'hierarchical'      => true,
	'show_in_rest'      => true,
] );

register_taxonomy_for_object_type( 'tag', 'project' );