# Project Euler Library
projecteuler.net is a project that lists various math related problems. Many of them encourage reuse of previous answer code to solve future problems. This repo is intended to house the central library code used to solve the problems, as well as the problem soultions.

I'm purposely omitting any external libraries, since this is supposed to be an excercise in building my own tools.

## Assumptions
* This will only be run in "Modern" browsers, which means no need to shim Array methods and other underscore-like methods
* Attempts will be made to make code performant, given the size of some of the
number sets, but no guaruntees are made about __not__ hanging your browser as this project evolves.

More information to follow.

## TODOs
* Optimize NumberSet search methods, they could greatly benefit from binary search as a default search algorithm
* add binary search strategy
* Patch gaping performance hole for numbers larger than 100,000,000; likely related to really inefficient search algorithms