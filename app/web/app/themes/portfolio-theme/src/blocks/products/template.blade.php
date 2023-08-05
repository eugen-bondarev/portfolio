<div class="products swiper-container lg:overflow-hidden" data-mobile-only data-container-width="1000"
    data-slide-width="280">
    <div class="swiper-wrapper transition flex">
        @foreach ($products as $product)
            {{-- @php
                $defaultVariant = (object) collect($product->variants)
                    ->filter(fn($variant) => $variant->default)
                    ->all()[0];
            @endphp --}}
            <div class="swiper-slide">
                <div
                    class="max-w-[280px] min-w-[280px] px-4 pb-4 pt-6 bg-white rounded-xl flex flex-col gap-4 border-[1px] border-solid border-light-3">
                    <div class="flex flex-col gap-2">
                        <div class="not-prose">
                            <img loading="lazy" class="rounded-[10px]" src="{{ $product->image }}" alt="Product Image">
                        </div>
                        <div class="flex gap-6 items-center">
                            <h3 class="!text-2xl !my-0">
                                <a href="{{ $product->url }}" class="font-bold">
                                    {{ $product->title }}
                                </a>
                            </h3>
                        </div>
                        <div class="flex gap-2 items-center">
                            @include('partials/stars.blade.php', [
                                'rating' => $product->reviews->average,
                                'many' => false,
                            ])
                            ({{ $product->reviews->count }} Reviews)
                        </div>
                    </div>
                    <h3 class="price !text-3xl !my-0">
                        {!! $product->price !!}
                    </h3>
                    <div>
                        @component('partials/button.blade.php', [
                            'attributes' => [
                                'class' => 'no-hover extend small',
                                'id' => 'add-to-cart',
                                'data-product-id' => $product->ID,
                                'data-variant-id' => $product->defaultVariant->ID,
                            ],
                        ])
                            In den Warenkorb
                        @endcomponent
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>
