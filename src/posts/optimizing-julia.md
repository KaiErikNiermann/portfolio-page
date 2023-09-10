---
title: Optimizing Julia
description: A guide to optimizing julia code, includes alot of resources I found quite helpful and also points out some things to look out for.
date: '2023-4-14'
categories:
  - python
published: true
github: null
post_type: 3
---

## Background

In the process of building my [*Ray Tracer*](https://github.com/KaiErikNiermann/julia-rt) one of the quite understandable hurdles I ran into was performance when wanting to render more complex scenes. So to try and overcome this I used various tools to analyse the problem areas in my program and try and mitigate their impact. There are already quite a few guides on optimizing julia written by much smarter people than myself, so if you want to checkout those resources first here they are:

- [*Official Optimization Guide*](https://docs.julialang.org/en/v1/manual/performance-tips/)
- [*Official Profiling Guide*](https://docs.julialang.org/en/v1/manual/profile/#Profiling)
- [*Unoffical Guide 1*](https://viralinstruction.com/posts/optimise/)
- [*Unoffical Guide 2*](https://marketsplash.com/tutorials/julia/julia-performance/)

This guide covers more which methods specifically helped me and which tools I found the most helpful overall in analyzing my code.

## Profilers

### ProfileView

What I kinda discovered is that due to the obviously varying nature where performance issues can come from the best way to improve performance is to really understand what is taking how long and how much in your code.

So I'd first recommend a nice basic profiler, [`ProfileView.jl`](https://www.julia-vscode.org/docs/dev/userguide/profiler/) to run the profile you need to include it then use the `ProfileView.@profview` macro for a function whos runtime you would like to profile.

```julia
using ProfileView 
...
ProfileView.@profview myfunction();

```

Then you need to **run this in the repl** (it breaks otherwise) which depending on the platform you are on should either give you a nice window in VSCode or in my case (using WSL2) I get a GUI window that pops up.

<figure style="display: flex; align-items: center; flex-direction: column;">
  <img src="/assets/profile_view_example.png" alt="ProfileView gui" style="width: 100%;">
  <figcaption>ProfileView GUI using WSL2</figcaption>
</figure>

### PProf

Alternativley if you want a more advanced profiler that can analyze both runtime and allocations with differents types of views I *highly* recommend [`PProf.jl`](https://github.com/JuliaPerf/PProf.jl), this takes the julia profiling data and exports it to the pprof format which has some really nice visualizations. To profile CPU time do :

```julia
using Profile
using PProf
...
Profile.clear()
@profile myfunction()

pprof()
```

And if you want to profile allocations : 

```julia
using Profile
using PProf
...
Profile.Allocs.clear()
Profile.Allocs.@profile myfunction()

PProf.Allocs.pprof()
```

That will yield you a nice visualization like this.

<figure style="display: flex; align-items: center; flex-direction: column;">
  <img src='/assets/pprof_example.png' alt="ProfileView gui" style="width: 100%;">
  <figcaption>PProf web view</figcaption>
</figure>

### `--track-allocation=user` and StaticArrays

If you are just starting out with Julia an observation you might make pretty early if you run your file with the `--track-allocation=user` flag, so `julia --track-allocation=user myfile.jl` is that arrays seem to end up being most of the allocations that occur, which in some instances makes sense. But as the Julia docs also recommend, if you are using many fixed size small arrays then [`StaticArrays.jl`](https://github.com/JuliaArrays/StaticArrays.jl) can be a massive improvement in performance.

## Benchmarking tools

### `@time` macro

The most helpful macro for me was `@time` which you can prepend before any expression to get the time it took to execute. For some more information on how to use this macro and some nice features of it see the [*official docs*](https://docs.julialang.org/en/v1/base/base/#Base.@time).

### `@timeit` macro

Similar to the `@time` macro it can benchmark the runtime of an expression, but it can be used to generate a much more complete picture with it also tracking allocations and similar to `@time` allowing for custom descriptors. For proper usage checkout [*its documentation*](https://m3g.github.io/JuliaNotes.jl/stable/memory/).


### [`BenchmarkTools.jl`](https://github.com/JuliaCI/BenchmarkTools.jl) 

Finally if you want a fullfledged easy tool to benchmark your code checkout [`BenchmarkTools.jl`](https://github.com/JuliaCI/BenchmarkTools.jl) it can give you some nice visualizations of performance and gives an overall more accurate picture of the runtime of your code.

## Resource link summary

-> [Official Optimization Guide](https://docs.julialang.org/en/v1/manual/performance-tips/)

-> [Official Profiling Guide](https://docs.julialang.org/en/v1/manual/profile/#Profiling)

-> [Unofficial Guide 1](https://viralinstruction.com/posts/optimise/)

-> [Unofficial Guide 2](https://marketsplash.com/tutorials/julia/julia-performance/)

-> [ProfileView.jl](https://www.julia-vscode.org/docs/dev/userguide/profiler/)

-> [PProf.jl](https://github.com/JuliaPerf/PProf.jl)

-> [StaticArrays.jl](https://github.com/JuliaArrays/StaticArrays.jl)

-> [@time Macro Documentation](https://docs.julialang.org/en/v1/base/base/#Base.@time)

-> [@timeit Macro Documentation](https://m3g.github.io/JuliaNotes.jl/stable/memory/)

-> [BenchmarkTools.jl](https://github.com/JuliaCI/BenchmarkTools.jl)