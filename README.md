Fx.CashRegister
===============

An animation effect that simulates the way numbers "roll" on old style cash
registers or gasoline pumps.

How To Use
----------

  var total = $('total');
  var totalFx = new Fx.CashRegister(total, {duration: 2000});
  
  totalFx.start(999.99);