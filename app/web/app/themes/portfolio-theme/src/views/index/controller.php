<?php

$controller = function () {
	$query = new WP_Query([
		'posts_per_page' => -1,
		'post_type' => 'project'
	]);
	$posts = collect($query->posts)
		->map(fn (WP_Post $post) => (object)[
			'title' => $post->post_title,
			'preview' => get_post_meta($post->ID, 'featured_video', true),
			'github_link' =>  get_post_meta($post->ID, 'github_link', true),
			'excerpt' => get_the_excerpt($post->ID),
			'url' => get_permalink($post->ID)
		]);
	return [
		'projects' => $posts,
	];
};
