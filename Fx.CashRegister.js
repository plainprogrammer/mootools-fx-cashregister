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
    this.element = this.subject = document.id(element);
    this.parent(options);
  },
  
  start: function(to){
    if (!this.check(to)) return this;
    
    this.from = this.element.get('text').substring(1).toFloat().round(2);
    this.to = to;
    this.time = 0;
		this.transition = this.getTransition();
		this.startTimer();
		this.onStart();

		return this;
  },
  
  //step: function(){
  //  var time = $time();
  //  if (time < this.time + this.options.duration){
  //    var delta = this.transition((time - this.time) / this.options.duration);
  //    this.set(this.compute(this.from, this.to, delta));
  //  } else {
  //    this.set(this.compute(this.from, this.to, 1));
  //    this.complete();
  //  }
  //}
  
  step: function(){
    var time = $time();
    
    if (time < this.time + this.options.duration){
      var delta = this.transition((time - this.time) / this.options.duration);
      this.element.set('text', '$' + this.compute(this.from, this.to, delta).round(2));
    } else {
      this.element.set('text', '$' + this.compute(this.from, this.to, 1));
      this.complete();
    }
  }
});