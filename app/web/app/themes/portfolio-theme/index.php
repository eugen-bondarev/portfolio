<?php

use PortfolioTheme\NewView;
use PortfolioTheme\View;

?>

<html class="" <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>

<body <?php body_class(['dark:bg-dark-1', current_user_can('edit_posts') ? 'is-admin' : '']) ?>>
	<?php
	get_header();
	if (function_exists('is_woocommerce') && is_woocommerce()) {
		(new NewView('views/woocommerce'))->render();
	} else {
		// ( new View( 'views/index' ) )->render();
		(new NewView('views/index'))->render();
	}
	get_footer();
	?>
</body>
<?php
wp_footer();
?>

</html>