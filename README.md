# Project Euler Library
projecteuler.net is a project that lists various math related problems. Many of them encourage reuse of previous answer code to solve future problems. This repo is intended to house the central library code used to solve the problems, as well as the problem soultions.

I'm purposely omitting any external libraries, since this is supposed to be an excercise in building my own tools.

## Assumptions
* This will only be run in "Modern" browsers, which means no need to shim Array methods and other underscore-like methods
* Attempts will be made to make code performant, given the size of some of the
number sets, but no guaruntees are made about __not__ hanging your browser as this project evolves.

More information to follow.

## Current considerations:
* Should number sets be represented by their own object?
  ** this would allow obfuscating set hashing by calling a ```get``` method
  ** the ```get``` method should probably allow fetching by index and by callback
* Other high order methods besides buildNumberSet?
* add Array filter to filter uniques out (probably want to optimize this call)
* 