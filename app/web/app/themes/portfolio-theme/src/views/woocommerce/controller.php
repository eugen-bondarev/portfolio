<?php
use EcommerceTheme\Lib\Product;

wp_head();

use PortfolioTheme\NewView;

get_header();

?>

<main class="prose dark:text-light-1 lg:prose-xl">
	<div class="container m-auto px-10 sm:px-0">
		<?php
		global $wp;
		$productId = get_the_ID();
		$product   = wc_get_product( $productId );
		$pageId    = $product->get_meta( 'page', true );
		if ( $pageId ) {
			echo do_shortcode( do_blocks( WP_Post::get_instance( $pageId )->post_content ) );
		} else {
			( new NewView( 'blocks/product' ) )->renderWithCustomData( (array) new Product( $productId ) );
			( new NewView( 'blocks/reviews' ) )->renderWithCustomData( (array) new Product( $productId ) );
		}
		// woocommerce_content();
		
		if ( array_key_exists( 'role', $_REQUEST ) && $_REQUEST['role'] === 'lorem-ipsum-dolor' )
			echo <<<HTML
			<div id="reviews" class="woocommerce-Reviews">
				<div id="review_form_wrapper">
					<div id="review_form">
						<div id="respond" class="comment-respond">
							<form action="/wp-comments-post.php" method="post" id="commentform"
								class="comment-form">
								<p class="comment-notes"><span id="email-notes">Your email address will not be published.</span> <span
										class="required-field-message">Required fields are marked <span class="required">*</span></span></p>
								<div class="comment-form-rating"><label for="rating">Your rating&nbsp;<span
											class="required">*</span></label>
									<p class="stars"> <span> <a class="star-1" href="#">1</a> <a class="star-2" href="#">2</a> <a
												class="star-3" href="#">3</a> <a class="star-4" href="#">4</a> <a class="star-5" href="#">5</a>
										</span> </p><select name="rating" id="rating" required="" style="display: none;">
										<option value="">Rate…</option>
										<option value="5">Perfect</option>
										<option value="4">Good</option>
										<option value="3">Average</option>
										<option value="2">Not that bad</option>
										<option value="1">Very poor</option>
									</select>
								</div>
								<p class="comment-form-comment"><label for="comment">Your review&nbsp;<span
											class="required">*</span></label><textarea id="comment" name="comment" cols="45" rows="8"
										required=""></textarea></p>
								<p class="comment-form-author"><label for="author">Name&nbsp;<span class="required">*</span></label><input
										id="author" name="author" type="text" value="" size="30" required=""></p>
								<p class="comment-form-email"><label for="email">Email&nbsp;<span class="required">*</span></label><input
										id="email" name="email" type="email" value="" size="30" required=""></p>
								<p class="comment-form-cookies-consent"><input id="wp-comment-cookies-consent"
										name="wp-comment-cookies-consent" type="checkbox" value="yes"> <label
										for="wp-comment-cookies-consent">Save my name, email, and website in this browser for the next time I
										comment.</label></p>
								<p class="form-submit"><input name="submit" type="submit" id="submit" class="submit" value="Submit">
									<input type="hidden" name="comment_post_ID" value="$productId" id="comment_post_ID">
									<input type="hidden" name="comment_parent" id="comment_parent" value="0">
								</p>
							</form>
						</div><!-- #respond -->
					</div>
				</div>

				<div class="clear"></div>
			</div>
		HTML; ?>


	</div>
</main>

<?php

wp_footer();
get_footer();

?>

<?php

$controller = function () {
	return [];
};