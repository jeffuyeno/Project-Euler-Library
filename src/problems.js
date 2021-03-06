if( !window.eulerproblems ) {
	window.eulerproblems = [
		// #1
    { description: "Add all the natural numbers below one thousand that are multiples of 3 or 5."
		, solution: function() {
        var solution = 0
          , max = 1000
          ;
        
        for( var i=max; i--; ) {
          if( euler.hasFactors(i, [3]) || euler.hasFactors(i, [5]) ) {
            solution += i;
          }
        }
        return solution;
		  }		
		}
    // #2
  , { description: "By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms."
    , solution: function() {
        euler.fibonacci.init();

        var solution = 0
          , set = euler.fibonacci.byMax(4000000)
          ;
        euler.util.apply(set, function(val, index){
          if( val % 2 == 0 ) {
            solution += val;
          }
        });
        return solution;
      }
    }
  , { description: "Find the largest prime factor of a composite number."
    , solution: function() {
        var solution = 0
          , target = 600851475143
          , primeFactors = euler.getPrimeFactors(target)
          ;

        solution = primeFactors[primeFactors.length - 1];

        return solution;
      }
    }    
	]
}