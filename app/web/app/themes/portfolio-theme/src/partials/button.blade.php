<button class="primary-btn {{ $attributes['class'] }}"
    @foreach ($attributes as $key => $value)
		{{ $key }}={{ $value }} @endforeach>
    <span>
        {!! $slot !!}
    </span>
    <span class="loading-icon">
        @svg('assets/svg/loading-spinner.svg')
    </span>
    <span class="success-icon">
        @svg('assets/svg/checkmark.svg')
    </span>
</button>
