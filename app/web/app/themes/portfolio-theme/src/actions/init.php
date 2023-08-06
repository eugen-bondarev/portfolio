<?php

namespace PortfolioTheme;

add_action('init', function () {
	foreach (glob(__DIR__ . '/init/*.php') as $file) {
		require_once($file);
	}
});

add_action('init', function () {
	add_rewrite_rule('^de/projekte/([^/]*)/?', 'index.php?post_type=project&name=$matches[1]', 'top');
});

add_action(
	'add_meta_boxes',
	function () {
		add_meta_box(
			'featured_video',
			'Featured video',
			function ($post) {
				wp_nonce_field(basename(__FILE__), 'featured_video_nonce');
				echo '<label for="featured_video">Featured Video URL</label>';
				echo '<input type="text" id="featured_video" name="featured_video" value="' . get_post_meta($post->ID, 'featured_video', true) . '" />';
			},
			'project',
			'side'
		);
		add_meta_box(
			'featured_img',
			'Featured image',
			function ($post) {
				wp_nonce_field(basename(__FILE__), 'featured_img_nonce');
				echo '<label for="featured_video">Featured Image URL</label>';
				echo '<input type="text" id="featured_img" name="featured_img" value="' . get_post_meta($post->ID, 'featured_img', true) . '" />';
			},
			'project',
			'side'
		);
		add_meta_box(
			'github_link',
			'Github Link',
			function ($post) {
				wp_nonce_field(basename(__FILE__), 'github_link_nonce');
				echo '<label for="github_link">Github Link</label>';
				echo '<input type="text" id="github_link" name="github_link" value="' . get_post_meta($post->ID, 'github_link', true) . '" />';
			},
			'project',
			'side'
		);
	}
);

add_action('save_post', function ($post_id) {
	if (!isset($_POST['featured_video_nonce'])) {
		return;
	}

	if (!wp_verify_nonce($_POST['featured_video_nonce'], basename(__FILE__))) {
		return;
	}

	if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
		return;
	}

	if (!current_user_can('edit_post', $post_id)) {
		return;
	}

	if (isset($_POST['featured_video'])) {
		update_post_meta($post_id, 'featured_video', sanitize_text_field($_POST['featured_video']));
	}
});

add_action('save_post', function ($post_id) {
	if (!isset($_POST['github_link_nonce'])) {
		return;
	}

	if (!wp_verify_nonce($_POST['github_link_nonce'], basename(__FILE__))) {
		return;
	}

	if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
		return;
	}

	if (!current_user_can('edit_post', $post_id)) {
		return;
	}

	if (isset($_POST['github_link'])) {
		update_post_meta($post_id, 'github_link', sanitize_text_field($_POST['github_link']));
	}
});
