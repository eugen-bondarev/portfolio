<div class="{{ $class }}" data-portfolio-theme-component={{ $component }} data-portfolio-theme-props="{{ json_encode($props) }}">
    @if (isset($slot))
    {!! $slot !!}
    @endif
</div>