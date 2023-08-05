<div class="reviews swiper-container" data-mobile-only data-container-width="1000" data-slide-width="280">
    <div class="swiper-wrapper transition flex">
        @foreach ($items as $item)
            <div class="swiper-slide">
                <div
                    class="max-w-[280px] min-w-[280px] px-4 pb-4 pt-6 bg-white rounded-xl flex flex-col gap-4 border-[1px] border-solid border-light-3">
                    <div class="flex flex-col gap-2">
                        <div class="flex gap-6 items-center">
                            <h3 class="!text-base !my-0">{{ $item->author }}</h3>
                            <div class="flex items-center gap-1">
                                verifiziert
                                <span class="text-green-1">{!! file_get_contents("$global->src/assets/svg/checkmark.svg") !!}</span>
                            </div>
                        </div>
                        <div class="flex gap-2 items-center">
                            @include('partials/stars.blade.php', [
                                'rating' => $item->rating,
                                'many' => false,
                            ])
                        </div>
                    </div>
                    <p class="m-0">{{ $item->content }}</p>
                    @foreach ($item->media as $src)
                        <img loading="lazy" src="{{ $src }}" class="!m-0 rounded-[10px]" />
                    @endforeach
                    {{-- <img loading="lazy" class="my-0 rounded-[10px]"
                                    src="https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
                                    alt=""> --}}
                </div>
            </div>
        @endforeach
    </div>
</div>
