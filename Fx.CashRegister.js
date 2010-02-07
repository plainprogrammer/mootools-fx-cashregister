/*
Script: Fx.CashRegister.js
  Contains <Fx.CashRegister>
  
License:
  MIT-style license.
*/

/*
Class: Fx.CashRegister
    An animation effect that simulates the way numbers "roll" on old style cash
    registers or gasoline pumps.
  
Arguments:
    element - the element to animate
    options - optional, see Options below.
    
Options:
  all the Fx.Base options and events.
  
Example:
  >var total = $('total');
  >var totalFx = new Fx.CashRegister(total, {duration: 2000});
  >
  >totalFx.start(999.99);
*/
Fx.CashRegister = new Class({
  Extends: Fx,
  
  options: {
    precision: 2,
    prefix: '$'
	},
  
  initialize: function(element, options){
    this.element = this.subject = document.id(element);
    this.parent(options);
  },
  
  start: function(to){
    if (!this.check(to)) return this;
    
    var current_value = this.element.get('text');
    current_value = current_value.substring(this.options.prefix.length);
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
    
    this.element.set('text', new_value);
  }
});