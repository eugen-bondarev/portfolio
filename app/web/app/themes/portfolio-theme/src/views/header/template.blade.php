<header
    class="transition prose lg:mb-16 lg:prose-xl backdrop-blur-md bg-black-300/50 shadow-lg sticky top-[var(--sticky-top-height)] z-10">
    <div style="box-shadow: none; background: transparent;" class="py-3 pt-4 lg:py-5">
        <div class="container px-4 lg:px-0 m-auto flex flex-col lg:flex-row items-end lg:items-center justify-between">
            <div class="flex w-full lg:w-auto justify-between items-center">
                <div class="flex not-prose">
                </div>
                <div class="flex lg:hidden items-center gap-2 text-dark-1">
                    <a href="/mein-konto" class="flex items-center justify-center text-3xl w-12 h-12 outline-none">
                        @svg('assets/svg/account.svg')
                    </a>
                    <div id="hamburger-menu" class="w-12 h-12 flex items-center justify-center">
                        <div class="flex lg:hidden flex-col items-end gap-[6px]">
                            {{-- <span class="w-6 h-[3px] bg-dark-1 rounded-[2rem] block"></span> --}}
                            <span class="w-7 h-[3px] bg-dark-1 rounded-[2rem] block"></span>
                            <span class="w-6 h-[3px] bg-dark-1 rounded-[2rem] block"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-4">
                @include('partials/reactComponent.blade.php', [
                    'props' => $menu,
                    'component' => 'HeaderMenu',
                    'class' => 'w-full',
                ])
            </div>
        </div>
    </div>
</header>
@include('partials/reactComponent.blade.php', ['props' => [], 'component' => 'ScrollUpButton'])
