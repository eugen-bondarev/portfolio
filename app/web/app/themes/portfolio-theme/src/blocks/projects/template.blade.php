<div class="flex flex-col gap-[64px] md:gap-[128px] pt-5 md:pt-10 mb-20">
    @foreach ($projects as $project)
        <div class="flex justify-between max-md:flex-wrap-reverse gap-8">
            <div class="flex flex-col gap-3">
                <h2 class="!my-0">
                    <a class="font-bold" href="{{ $project->url }}">
                        {{ $project->title }}
                    </a>
                </h2>
                @if (count($project->categories) > 0)
                    <div class="flex gap-2">
                        @foreach ($project->categories as $category)
                            <span class="bg-dark-2 rounded-sm p-2 text-light-1 leading-[1]">{{ $category }}</span>
                        @endforeach
                    </div>
                @endif
                <p class="!my-0">
                    {{ $project->excerpt }}
                </p>
                <div>
                    <a href="{{ $project->github_link }}" target="_blank">
                        @svg('assets/svg/github.svg')
                    </a>
                </div>
            </div>
            @if ($project->video)
                <video class="w-[400px] max-md:w-full" autoplay loop muted>
                    <source src="{{ $project->video }}">
                    </source>
                </video>
            @elseif ($project->img)
                <img src="{{ $project->img }}" class="w-[400px] max-md:w-full" />
            @endif
        </div>
        @php
            $last = $loop->index === count($projects) - 1;
        @endphp

        @if (!$last)
            <div class="h-1 w-full bg-subtitle-1 opacity-20 rounded-md"></div>
        @endif
    @endforeach
</div>
