<div class="{{ $class }}" data-ecommerce-theme-component={{ $component }}
    data-ecommerce-theme-props="{{ json_encode($props) }}">
    @if (isset($slot))
        {!! $slot !!}
    @endif
</div>
