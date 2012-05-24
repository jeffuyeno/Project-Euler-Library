# Project Euler Library
Intended as a base library, plus my solutions for: projecteuler.net.

I'm purposely omitting any external libraries, since this is supposed to be an excercise in building my own tools.

More information to follow.

## Current considerations:
* Should number sets be represented by their own object?
  ** this would allow obfuscating set hashing by calling a ```get``` method
  ** the ```get``` method should probably allow fetching by index and by callback
* Other high order methods besides buildNumberSet?
* add Array filter to filter uniques out (probably want to optimize this call)