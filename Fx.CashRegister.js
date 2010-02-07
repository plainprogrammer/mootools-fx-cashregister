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
  
  initialize: function(element, options){
    this.element = $(element);
    this.parent(options);
  },
  
  start: function(to){
    if (!this.options.wait) this.cancel();
    else if (this.timer) return this;
    
    this.from = this.element.get('text').substring(1).toFloat();
    this.to = to;
		this.change = this.to - this.from;
		this.time = $time();
		this.timer = this.step.periodical(Math.round(1000 / this.options.fps), this);
		this.fireEvent('onStart', this.element);

		return this;
  },
  
  increase: function(){
    var value = this.now.toString().split('.');

    var dollars = value[0];
    var cents  = value.length == 1 ? '00' : (
      value[1].length == 1 ? value[1] + "0" : value[1].substring(0,2)
    );
    
    this.element.setText('$' + dollars + '.' + cents);
  }
});