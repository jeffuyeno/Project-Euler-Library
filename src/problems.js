if( !window.eulerproblems ) {
	window.eulerproblems = [
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
	]
}