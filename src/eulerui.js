window.eulerui = {

// Dom Objects
//------------------------------------------------------------------------------
	_problemSelect : null,
	_problemDescription : null,
  _problemSolution : null,


// Lifecycle
//------------------------------------------------------------------------------
  
  init : function() {
      this._problemSelect = document.getElementById('problems');
      this._problemDescription = document.getElementById('problem');
      this._problemSolution = document.getElementById('solution');

      this.buildProblemSelector(window.eulerproblems);
  },


// Methods
//------------------------------------------------------------------------------

  /**
   * Selects a problem from the eulerproblems array and dumps it info into the
   * DOM and runs the solution.
   * @return this
   */
  selectProblem : function() {
    var problemId = +this._problemSelect.value
      , problem = window.eulerproblems[problemId]
      ;
    if( problem ) {
      this._problemDescription.innerHTML = problem.description;
      this._problemSolution.innerHTML = problem.solution();
    } else {
      alert('There seems to be a problem, I can\'t find problem: ' 
            + problemId);
    }
	},

  /**
   * Builds the option nodes for the dropdown selector and appends them
   * @param  {Array} problems expects to follow the format in problems.js
   * @return this
   */
  buildProblemSelector : function(problems) {
    var frag = document.createDocumentFragment()
      , len = problems.length
      , i = len
      ;
    for( ; i--; ) {
      var option = document.createElement('option');

      option.value = i;
      option.text = 'Problem ' + (i + 1);
      frag.appendChild(option)
    }

    this._problemSelect.appendChild(frag);
  }
}

window.onload = function() {
  window.eulerui.init();
}