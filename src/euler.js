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
  
    /**
     * Gets all the prime factors for a number
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    getPrimeFactors : function(num) {
      var factors = []
        , primes = this.getPrimes(num)
        ;
      
      euler.util.apply(primes, function(factor){

      });
    },

    /**
     * Returns primes up to the passed number. Since we're dynamically
     * building _primes, this should first check to see what exists and then
     * add primes to it as necessary
     *  
     * @param  {Int} num value to get primes up to
     * @return {Array}
     */
    getPrimes : function(num) {
      var primes = euler.util.hash('primes', num);

      if( primes.length < num ) {
        //generate new primes
      }

      return primes;
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

      set = euler.util.getNumSet(this._fibonacci, ceiling, 'fibonacci');

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
      set = euler.util.buildNumset(this._fibonacci, function(n, set) {
        if( n >= index ) {
          return false;
        }
        return true;
      }, 'fibonacci');

      return set;
    },

    /**
     * Intended for internal use with euler.util.buildSet
     * @param  {Number} n   [description]
     * @param  {Array} set [description]
     * @return {}     [description]
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
        if( fn(arr[i], i) ) {
          newArr.push(arr[i]);
        }
      }
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
   * @param  {Function|Number} terminate determines when to terminate generating
   *                           set or checks against current index if Number
   * @param  {Array} seed (optional) array to start with or continue on 
   * @return {Array}
   */
  euler.util.buildSet = function(buildFn, terminateFn, seed) {
    var set = seed || []
      , i = 0
      , terminate = isNaN(terminateFn) ? terminateFn
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
    var len = set.length
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
  euler.util.getNumSet = function(buildFn, terminate, namespace) {
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
