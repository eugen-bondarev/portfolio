<div data-product-container data-variants="{{ json_encode($variants) }}" class="flex flex-col gap-12 lg:flex-row">
    <div class="gallery flex flex-col gap-4 lg:gap-6">
        <div class="main-image flex justify-center not-prose">
            <img src="{{ $defaultVariant->image }}" alt="{{ $title }}">
            @foreach ($meta as $media)
                <img class="hidden" src="{{ $media->src }}" alt="{{ $title }}">
            @endforeach
        </div>
        <div class="overflow-hidden thumbnails-panel">
            <div class="swiper-container overflow-hidden w-[400px]" data-margin="8" data-container-width="400"
                data-slide-width="72">
                <div class="swiper-wrapper transition flex not-prose">
                    @foreach ($meta as $media)
                        <div class="swiper-slide !w-[unset]">
                            <div class="min-w-[72px] max-w-[72px]">
                                <img data-full-size="{{ $media->src }}"
                                    alt="{{ $title }} Thumbnail {{ $loop->index }}"
                                    class="thumbnail {{ $loop->index === 0 ? 'first' : '' }}"
                                    src="{{ $media->thumbnail }}" />
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-6 lg:gap-8">
        <div class="flex flex-col gap-6 lg:gap-2 lg:flex-col-reverse">
            <div class="flex gap-2 justify-center items-center lg:justify-start">
                @include('partials/stars.blade.php', [
                    'rating' => $reviews->average,
                    'count' => $reviews->count,
                    'many' => true,
                ])
            </div>
            <div class="flex flex-col gap-2">
                @php $pageId = get_the_ID() @endphp
                <h1 class="!mb-0">
                    @if ($pageId === $ID)
                        {{ $title }}
                    @else
                        <a class="font-bold" href="{{ $url }}">
                            {{ $title }}
                        </a>
                    @endif
                </h1>
                <h1 class="!mb-0 is-style-subheading">{{ $description }}</h1>
            </div>
        </div>
        @if (count($variants) > 1)
            <select data-variants>
                @foreach ($variants as $variant)
                    <option value="{{ $variant->ID }}">{{ $variant->title }}</option>
                @endforeach
        @endif
        </select>
        <div class="flex flex-col gap-3 justify-between">
            <div class="flex flex-col gap-2 justify-between lg:flex-row lg:justify-start lg:items-center lg:gap-8">
                <h1 id="price" class="price !mb-0 !text-5xl">{!! $defaultVariant->price !!}</h1>
                <div class="flex gap-2">
                    @component('partials/button.blade.php', [
                        'attributes' => [
                            'class' => 'no-hover extend',
                            'id' => 'add-to-cart',
                            'data-product-id' => $ID,
                            'data-variant-id' => $defaultVariant->ID,
                        ],
                    ])
                        In den Warenkorb
                    @endcomponent
                </div>
            </div>
            <span class="text-subtitle-1">
                Lieferung innerhalb von {{ $attributes['delivery'] }} Tagen (deutschlandweit)
            </span>
        </div>

        @php
            $items = [
                [
                    'icon' => 'assets/svg/product.svg',
                    'title' => 'Produktdetails',
                    'content' => $fullDescription,
                ],
                [
                    'icon' => 'assets/svg/chat-bubble.svg',
                    'title' => 'Anwendung',
                    'content' => $attributes['usage'],
                ],
                [
                    'icon' => 'assets/svg/return.svg',
                    'title' => 'Rücksendepolitik',
                    'content' => $attributes['return'],
                ],
            ];
        @endphp

        <div class="flex flex-col">
            @foreach ($items as $item)
                {{-- @php var_dump($item['content']); @endphp --}}
                @component('components/Collapsible/template.blade.php', ['content' => $item['content']])
                    <div class="flex justify-between items-center pr-2">
                        <div class="flex gap-6 items-center">
                            <div class="w-8 flex justify-center">{!! file_get_contents("$global->src/$item[icon]") !!}</div>{{ $item['title'] }}
                        </div>
                        {!! file_get_contents("$global->src/assets/svg/arrow-down.svg") !!}
                    </div>
                @endcomponent
            @endforeach
        </div>
    </div>
</div>
