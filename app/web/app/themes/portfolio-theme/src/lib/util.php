<?php

namespace EcommerceTheme\Lib\Util;

use Illuminate\Support\Collection;

function getAvg( array $arr ) {
	return array_reduce(
		$arr,
		fn($acc, $curr) => $acc + $curr, 0
	) / count( $arr );
}

function collect( $items ) {
	return new Collection( $items );
}