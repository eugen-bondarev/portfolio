<?php

$controller = function ($attributes, $content) {
	$query = new WP_Query([
		'posts_per_page' => -1,
		'post_type' => 'project'
	]);
	$projects = collect($query->posts)
		->sort(
			fn (WP_Post $a, WP_Post $b) =>
			get_post_meta($a->ID, 'custom_sort', true) - get_post_meta($b->ID, 'custom_sort', true)
		)
		->map(fn (WP_Post $post) => (object)[
			'title' => $post->post_title,
			'video' => get_post_meta($post->ID, 'featured_video', true),
			'img' => get_post_meta($post->ID, 'featured_img', true),
			'github_link' =>  get_post_meta($post->ID, 'github_link', true),
			'excerpt' => get_the_excerpt($post->ID),
			'url' => get_permalink($post->ID),
			'categories' => collect(wp_get_post_terms($post->ID, 'tag'))
				->map(fn (WP_Term $category) => $category->name)
		]);
	return [
		'projects' => $projects
	];
};
