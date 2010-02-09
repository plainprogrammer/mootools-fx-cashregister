/*
---
description: An animation effect that simulates the way numbers "roll" on old
style cash registers or gasoline pumps.

license: MIT-style

authors:
- James Thompson

requires:
- core/1.2.4: Fx

provides: [Fx.CashRegister]

...
*/

/*
Class: Fx.CashRegister
    An animation effect that simulates the way numbers "roll" on old style cash
    registers or gasoline pumps.
  
Arguments:
    element - the element to animate
    options - optional, see Options below.
    
Options:
  all the Fx options and events.
*/
Fx.CashRegister = new Class({
  Extends: Fx,
  
  options: {
    precision: 2,
    prefix: '$',
    thousandsSeparator: ',',
    decimalSeparator: '.'
	},
  
  initialize: function(element, options){
    this.element = this.subject = document.id(element);
    this.parent(options);
  },
  
  start: function(to){
    if (!this.check(to)) return this;
    
    var current_value = this.element.get('text');
    current_value = current_value.substring(this.options.prefix.length);
    current_value = this.stripSeparators(current_value);
    current_value = current_value.toFloat().round(this.options.precision);
    
    this.from = current_value;
    this.to = to;
    this.time = 0;
		this.transition = this.getTransition();
		this.startTimer();
		this.onStart();

		return this;
  },
  
  set: function(now){
    var new_value = this.options.prefix + now.round(this.options.precision);
    
    this.element.set('text', this.addSeparators(new_value));
  },
  
  addSeparators: function(number)
  {
  	var parts = number.toString().split(this.options.decimalSeparator);
  	
  	var dollars = parts[0];
  	if (parts[1]) { var cents = parts[1]; }
  	
  	var rgx = /(\d+)(\d{3})/;
  	
  	while (rgx.test(dollars)) {
  		dollars = dollars.replace(rgx, '$1' + this.options.thousandsSeparator + '$2');
  	}
  	
  	var output = dollars;
  	
  	if (this.options.precision > 0) {
  	  if (cents) {
  	    output += this.options.decimalSeparator + cents;
  	  } else {
  	    output += '0' * this.options.precision;
  	  }
  	}
  	
  	return output;
  },
  
  stripSeparators: function(string) {
    var result = string.replace(this.options.decimalSeparator, '.');
    var pattern = new RegExp(this.options.thousandsSeparator, 'g');
    var matches = result.match(pattern)
    
    if (matches) {
      matches.each(function() {
        result = string.replace(pattern, '');
      });
    }
    
    return result;
  }
});

