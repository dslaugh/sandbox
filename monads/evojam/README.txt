https://tech.evojam.com/2016/02/22/practical-intro-to-monads-in-javascript/

// NOTE: I had a hard time understanding the article's examples so I gave up


Monads are defined by 3 axioms.
There has to be some function that binds calculations to the value contained in a monad box. 
It's called bind or flatMap and has to meet 3 requirements:
bind takes one parameter, a function, (let's call it callback).
callback takes current value and returns a monad containing the result of the calculation.
bind returns a monad returned by callback.

