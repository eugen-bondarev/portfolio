@foreach (PortfolioTheme\getVariants($rating) as $variant)
    @svg("assets/svg/star-$variant.svg")
@endforeach
{{ round($rating, 1) }}
@if ($many === true)
    ({{ $count }} Reviews)
@endif
