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

    // We'll build and store this on the fly, since it could be a bit
    // expensive
    _primes : [],
    /**
     * Returns primes up to the passed number. Since we're dynamically
     * building _primes, this should first check to see what exists and then
     * add primes to it as necessary
     *  
     * @param  {Int} num value to get primes up to
     * @return {Array}
     */
    getPrimes : function(num) {

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
  } 
}
