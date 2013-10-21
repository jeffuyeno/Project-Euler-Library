if(!window.euler) {
  var euler = {};
}

// Util
//---------------------------------------------------------------------------- 

/**
 * Separating out high level methods from the specific math methods here
 * 
 */
euler.util = {};
/**
 * Applies callback against each array key
 * @param  {Array}   arr 
 * @param  {Function} fn 
 * @return {this}
 */
euler.util.apply = function(arr, fn) {
  var i
    , len = arr.length
    ;
  for( i=len; i--; ) {
    fn(arr[i], i);
  }
};

/**
 * filters array if fn returns true
 * @param  {Array}   arr
 * @param  {Function} fn
 * @return {Array}
 */
euler.util.filter = function(arr, fn) {
  var i
    , len = arr.length
    , newArr = []
    ;
    for( i=len; i--; ) {
      if( fn(i, arr[i]) ) {
        newArr.push(arr[i]);
      }
    }
  return newArr; 
}

/**
 * Finds the intersection of the subset and the set. Subset is assumed to be
 * smaller than set
 * @param  {Array} subset
 * @param  {Array} set
 * @return {Array}
 */
euler.util.intersect = function(subset, set) {
  return subset.filter(function(item) {
    return set.indexOf(item) !== -1;
  });
}

euler.util.apply(['Function', 'String', 'Number', 'Date', 'RegExp'],function(name) {
  euler.util['is' + name] = function(obj) {
    return toString.call(obj) == '[object ' + name + ']';
  };
});

/**
 * Class NumberSet
 *
 * Represents all values in a possible set of numbers, this does not necessarily
 * mean that we have calculated them yet, but they can exist given n iterations
 *
 * Note that we're being lazy here with inheritance, we don't really need a deep
 * prototype chain, we'll be assigning one-offs to the global namespace.
 * 
 * @param  {Array} seed NumberSet to be intialized with
 * @param  {Function} buildFn function to iterate for steps. Should match the 
 *         method pattern buildFn(n, val, prev) where n is the index, val is the
 *         previous value in the set and prev is the value before that.
 *         Should return false if there are no more numbers in the set
 * @return {Object} returns array like object, see that properties for internal methods
 */
var NumberSet = function(seed, buildFn){
  var that = seed || [];
  that.buildFn = buildFn || function(n, set) { return n };

  /**
   * Responsible for fetching indeces of the NumberSet. If the index does not
   * exist, the existing set should populate up to the current index and return
   * it.
   * 
   * @param  {Number} index array index to get value at
   * @return {Number} value at index
   */
  that.get = function(index) {
    if( this[index] ) {
      return this[index];
    }
    // generate numbers up to our expected index
    var idx = this.length - 1
      , num
      ;
      
    for(;idx < index;idx+=1) {
      if( num = this.buildFn(idx, this[index-1], this[index-2]) ) {
        this[index] = num;
      } else {
        // we don't have anymore numbers in this set, exit;
        return this[index];
      }
    }
    return this[index];
  };

  /**
   * attempts to find a value in a set
   *
   * @param {Function} end function that should return true when a correct value
   * is found
   * @param {Number} start (optional) index to start at
   */
  that.findWhere = function(end, start) {
    var idx = start || 0;
    for( ;idx < this.length;idx+=1) {
      this.get(idx);
      if( end(idx, this) ) {
        return this[idx];
      }
    }
    return this.slice(start, idx+1);
  };

  /**
   * returns subsection of NumberSet
   * @param  {Number} start index of NumberSet to start at
   * @param  {Function} end function should return false to halt set
   *                        should accept (index, set) 
   * @return {Array}
   */
  that.getSet = function(start, end) {
    var idx = start;
    for( ;idx<this.length;idx+=1) {
      if( !end(idx, this[idx], this[idx-1]) ) {
        // we use idx as the terminal for slice since we don't want to include
        // the current index
        return this.slice(start, idx);
      }
      this.get(idx+1);
    }
    return this.slice(start, idx);
  };

  /**
   * Returns NumberSet with nth value upto num
   * @param  {Number} num 
   * @return {Array}    
   */
  that.getSetByMax = function(num) {
    return that.getSet( 0, function(n, val, prev){ return val < num } );
  };

  /**
   * Gets subset by indeces
   * @param  {Number} start
   * @param  {Number} end
   * @return {Array}
   */
  that.getSetByIndex = function(start, index) {
    return this.slice(start, index);
  };

  return that;
}


// Factors
// -----------------------------------------------------------------------------
/**
 * Gets a set of factors for a number
 * @param  {Number} num 
 * @return {Array}
 */
euler.getFactors = function(num) {
  return NumberSet([1], function(n){ 
    var count = this[n] + 1;
    for(;count <= num; count+=1 ) {
      if( num % count === 0 ) {
        return count;
      }
    }
    // we have no more factors
    return false;
  }).getSetByMax(num+1); // getSetByMax is non-inclusive of the ceiling so adding one
};

/**
 * Determines if a given number has the factors passed to it. Note that we're not
 * leveraging getFactors on purpose as it's expensive to build them for very
 * large numbers
 * 
 * @param {Int} num
 * @param  {Array}  factors array of ints to check against the number
 * @return {Boolean}
 */
euler.hasFactors = function(num, factors) {
  //if the number is small or the factors are small, might be faster
  //to % than to getFactors()
  var i
    , len = factors.length
    ;
     
  for(i = len; i--;) {
    if( num % factors[i] !== 0 ) {
      return false;
    }
  }

  return true;
},

// Primes
// ---------------------------------------------------------------

/**
 * Determines if a number is prime
 * @param  {Number}  num 
 * @return {Boolean}     
 */
euler.isPrime = function(num) {
  //early exits
  if( num == 1 || num == 2 ) {
    return true;
  }
  
  var len = Math.sqrt(num)
    , i
    ;

  // this number has a integer square which means it has more than 2 factors
  // exit early
  if( len === Math.floor(len) ) {
    return false;
  }

  len = Math.floor(len);
  for( i=2; i<=len; i++ ) {
    if( num % i === 0 ) {
      return false;
    }
  } 

  return true;
};

/**
 * Static number set for primes
 */
euler.primes = NumberSet([1], function(n, val, prev){
  var idx = val + 1;
  for(;idx;idx+=1) {
    if( euler.isPrime(idx) ) {
      return idx;
    }
  }
  return false;
});


/**
 * Thin wrapper for NumberSet#getSetByMax
 * @param  {Number} num
 * @return {Array}
 */
euler.getPrimes = function(num) {
  return euler.primes.getSetByMax(num);
};

/**
 * Returns all factors of a number that are prime
 * @param  {Number} num
 * @return {Array}     [description]
 */
euler.getPrimeFactors = function(num) {
  var factors = euler.getFactors(num);
  return factors.filter(function(n) {
    return euler.isPrime(n);
  });
}

// Specific NumberSets
// -----------------------------------------------------------------------------
// Fibonacci
euler.fibonacci = NumberSet([0,1], function(n, val, prev){
  return val + prev;
});