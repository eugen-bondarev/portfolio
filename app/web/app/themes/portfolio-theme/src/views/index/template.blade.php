<main class="prose dark:text-light-1 lg:prose-xl">
    <div class="container m-auto px-10 sm:px-0">
        @foreach ($projects as $project)
            <div class="flex justify-between gap-8">
                <div class="flex flex-col gap-3">
                    <h2 class="!my-0">
                        <a class="font-bold" href="{{ $project->url }}">
                            {{ $project->title }}
                        </a>
                    </h2>
                    <div class="flex gap-2">
                        @foreach (['C++', 'OpenGL', 'AI'] as $category)
                            <span class="bg-dark-2 rounded-sm p-2 text-light-1 leading-[1]">{{ $category }}</span>
                        @endforeach
                    </div>
                    <p class="!my-0">
                        {{ $project->excerpt }}
                    </p>
                    <div>
                        <a href="{{ $project->github_link }}" target="_blank">
                            @svg('assets/svg/github.svg')
                        </a>
                    </div>
                </div>
                <video class="w-[400px]" autoplay loop muted>
                    <source src="{{ $project->preview }}">
                    </source>
                </video>
            </div>
        @endforeach
    </div>
</main>
