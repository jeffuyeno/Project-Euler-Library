if(!window.euler) {
  
  // Maths
  // ---------------------------------------------------------------------------
  var euler = {
    /**
     * Gets all of the factors of a number
     * @param  {Int} num
     * @return {Array} ordered array of multiples, should have no duplicates
     */
    getFactors : function(num) {
      var base = [];
    },

    /**
     * Determines if a given number has the factors passed to it
     * @param {Int} num
     * @param  {Array}  factors array of ints to check against the number
     * @return {Boolean}
     */
    hasFactors : function(num, factors) {
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
  }

  euler.prime = {
  // Primes
  // ---------------------------------------------------------------------------
    init : function() {
      euler.util.hash.set('primes', [1]);
    },

    /**
     * Gets all the prime factors for a number
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    getPrimeFactors : function(num) {
      var factors = []
        , primes = this.getPrimes(num)
        ;
      
      euler.util.filter(primes, function(idx, factor){
        if( num % factor === 0 ) {
          return true;
        }
        return false;
      });

      return primes;
    },

    /**
     * Wrapper around 'primes' NumberSet namespace  
     * @param  {Int} num value to get primes up to
     * @return {Array}
     */
    getPrimes : function(num) {
      var primes = euler.util.getNumberSet(this._primes, num, 'primes');

      return primes;
    },

    /**
     * Generates next prime in list, for use with buildSet
     * @param  {Number} n 
     * @param  {Array} set
     * @return {Number}     [description]
     */
    _primes : function(n, set) {
      var i = set[n] + 1; 

      //early escape
      if( euler.prime.isPrime(i) ) {
        return i;
      }

      while( !euler.prime.isPrime(i) ) {
        if( euler.prime.isPrime(i) ) {
          return i;
        }
        i++;
      }

      return 0;
    },
    

    /**
     * Determines if a number is prime
     * @param  {Number}  num 
     * @return {Boolean}     
     */
    isPrime: function(num) {
      //early exits
      if( num == 1 || num == 2 ) {
        return true;
      }
      
      var len = Math.sqrt(num)
        , i
        ;

      //early exits
      if( len === Math.floor(len) ) {
        return false;
      }

      len = Math.floor(len);

      for( i=2; i<len; i++ ) {
        if( num % i === 0 ) {
          return false;
        }
      } 

      return true;
    
    }
  };
  
  // Fibonacci Methods
  // ---------------------------------------------------------------------------  
  
  euler.fibonacci = {
    _inited : false,
    init : function() {
      if( !this._inited ) {
        euler.util.hash.set('fibonacci', [0,1]);
        this._inited = true;
      }
    },

    /**
     * Builds fibonacci sequence up to max number
     * @param {Number} ceiling maximum number to get fibonacci sequence by
     */
    byMax : function(ceiling) {
      var set = [];

      set = euler.util.getNumberSet(this._fibonacci, ceiling, 'fibonacci');

      return set;
    },

    /**
     * Builds fibonacci up to index
     * @param  {Number} index 
     * @return {Array}
     */
    byIndex : function(index) {
      var set = [];
      //hash this
      set = euler.util.buildNumberSet(this._fibonacci, function(n, set) {
        return ( n <= index );
      }, 'fibonacci');

      return set;
    },

    /**
     * Intended for internal use with euler.util.buildSet
     * @param  {Number} n   [description]
     * @param  {Array} set [description]
     * @return {Number}
     */
    _fibonacci : function(n, set) {
      var len = set.length;
      //we don't meet the minimum requirements for fibonacci sequence
      if( len < 2 ) {
        throw "Fibonacci sequences expect to be seeded with at least [0, 1]"
      }
      return set[len -1] + set[len-2];
    }
  };
  

  
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

  euler.util._hashes = [];
  /**
   * Hashes array to euler.util._hashes, we're assuming that we want to
   * eventually add more items to each hash
   * @param  {String} namespace hash to retrieve, if no hash is defined,
   * returns all hashes 
   * @param {Number} num (optional) passes back hash trimmed to index
   * @return {Array}
   */
  euler.util.hash = function(namespace, num) {
    if(!namespace) {
      return euler.util._hashes
    }

    if(!!namespace && !euler.util._hashes[namespace]) {
      euler.util._hashes[namespace] = [];
    }

    var hash = euler.util._hashes[namespace];

    if(+num > hash.length) {
      hash = hash.slice(0, +num);
    }

    return hash;
  };

  /**
   * Dumb set, does not attempt to intelligently apply additional data
   * @param {String} namespace
   * @param {Array} values    
   */
  euler.util.hash.set = function(namespace, values) {
    euler.util._hashes[namespace] = values;
  };

  /**
   * High level method to build sets
   * @param  {Function} buildFn takes n and generates a value
   * @param  {Function|Number} terminate determines when to terminate generation
   *         of the set:
   *         fn() when returns false, generation stops
   *         Number when current value is greater than terminate
   * @param  {Array} seed (optional) array to start with or continue on 
   * @return {Array}
   */
  euler.util.buildSet = function(buildFn, terminateFn, seed) {
    var set = seed || []
      , i = 0
      , terminate = isNaN(terminateFn) 
                  ? terminateFn
                  : function(i, set) { 
                      return (set[i] < terminateFn)
                    }
      ;

    // if the seed is larger than the terminate, return the trimmed seed
    if( !terminate(i, set) ) {
      return euler.util.trimSet(terminate, set);
    }

    // seed is actually a seed, build the set
    while(terminate(i, set)) {
      set.push(buildFn(i, set));
      i++;
    }

    return set;
  };

  /**
   * Trims set down to terminateFn
   * @param  {Function} terminateFn
   * @param  {Array} set         
   * @return {Array}             
   */
  euler.util.trimSet = function(terminateFn, set) {
    var len = set.length - 1
      , i
      ;

    for( i=len; i--; ) {
      var subset = set.slice(0, i);
      if( !terminateFn(i, subset) ) {
        return subset;
      }
    }

    return [];
  };

  /**
   * Handles getting and updating hashes of number sets
   * @param  {Function} buildFn     
   * @param  {Function|Number} terminate can be a function or number, if a
   *                           number, will return an index of that namespace
   * @param  {String} namespace   
   * @return {Array}             
   */
  euler.util.getNumberSet = function(buildFn, terminate, namespace) {
    var set = euler.util.hash(namespace)
      , returnSet = [];

    returnSet = euler.util.buildSet(buildFn, terminate, set);
    
    // Make sure we want to hash the return results
    if( returnSet.length > set.length) {
      euler.util.hash.set(namespace, returnSet);
    }

    return returnSet;
  };
}


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
 * @param  {Function} buildFn function to iterate for steps, should expect to
 *         receive n, set where n is the current step and set is the current set.
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
    if(index < this.length) {
      return this[index];
    }
    // generate numbers up to our expected index
    var idx = this.length - 1;
      
    for(;idx < index;idx+=1) {
      var num;
      if( num = this.buildFn.call(this, idx, this) ) {
        this.push(num);
      } else {
        throw "index does not exist in this set";
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
      if( !end(idx, this) ) {
        return this.slice(start, idx+1);
      }
      this.get(idx+1);
    }
    return this.slice(start, idx+1);
  };

  /**
   * Returns NumberSet with nth value upto num
   * @param  {Number} num 
   * @return {Array}    
   */
  that.getSetByMax = function(num) {
    return that.getSet( 0, function(n, set){ return set[n] < num } );
  };

  /**
   * Gets subset by indeces
   * @param  {Number} start
   * @param  {Number} end
   * @return {Array}
   */
  that.getSetByIndex = function(start, index) {
    return that.getSet( start, function(n, set){ return n < index; } );
  };

  return that;
}

euler.util.apply(['Function', 'String', 'Number', 'Date', 'RegExp'],function(name) {
  euler.util['is' + name] = function(obj) {
    return toString.call(obj) == '[object ' + name + ']';
  };
});


// Factors
// -----------------------------------------------------------------------------
/**
 * Gets a set of factors for a number
 * @param  {Number} num 
 * @return {Array}
 */
euler.getFactors = function(num) {
  return NumberSet([1], function(n, set){ 
    var count = set[n] + 1;
    for(;count <= num; count+=1 ) {
      if( num % count === 0 ) {
        return count;
      }
    }
    // we have no more factors
    return false;
  }).getSetByMax(num);
};

/**
 * Determines if a given number has the factors passed to it.
 *
 * Search assumes that factors are a subset of the number's factors.
 * 
 * @param {Int} num
 * @param  {Array}  factors array of ints to check against the number
 * @return {Boolean}
 */
euler.hasFactors = function(num, factors){
  numFactors = euler.getFactors(num);
  // exit early if we have more factors than the number
  if( factors > numFactors ) {
    return false;
  }

  return factors.every(function(val){ numFactors.indexOf(val) >= 0 });
};

// Primes
// ---------------------------------------------------------------

/**
 * Static number set for primes
 */
euler.primes = NumberSet([1], function(n, set){
  var idx = set[n] + 1;
  for(;idx;idx+=1){
    if( euler.getFactors(idx).length === 2 ) {
      return idx;
    }
  }
});

/**
 * Thin wrapper for NumberSet#getSetByMax
 * @param  {Number} num
 * @return {Array}
 */
euler.getPrimes = function(num) {
  var primes = euler.primes.getSetByMax(num);
  return primes.slice(0, - 1);
};

/**
 * Returns all factors of a number that are prime
 * @param  {Number} num
 * @return {Array}     [description]
 */
euler.getPrimeFactors = function(num) {
  var factors = euler.getFactors(num)
    , primes = euler.primes.getSetByMax(num)
    ;
  // @todo memoize euler.util.intersect into NumberSet?
  return euler.util.intersect(factors, primes);
}

// Specific NumberSets
// -----------------------------------------------------------------------------
// Fibonacci
euler.fibonacci = NumberSet([0,1], function(n, set){
  return set[n-1] + set[n-2];
});