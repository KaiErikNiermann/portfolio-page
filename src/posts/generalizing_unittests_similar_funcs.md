---
title: Simplifying python unittests using `inspect`
description: I ran into a mildly interesting problem of wanting to run the same unit tests on multiple functions of a class without having to call each function individually, this is a short writeup of how I solved this problem and in the process found a nice way to only have to write a minimal number of tests
date: '2024-04-014'
categories:
  - Python
  - Pytest
  - Poetry
published: true
github: null
post_type: 3
---

So for example say you had a class like this
```python 
class Testing: 
    def give_first(self, nums): 
        return nums[0]
    
    def give_first_alt(self, nums): 
        return nums[:-1][0]
```
## Bad 
For both of these classes, you expect the same outputs for a given input. Now the straightforward way of writing tests for this would be.
```python 
from src import main

import unittest

class TestSolution(unittest.TestCase): 
    def test_give_first(self): 
        self.assertEqual(main.Testing().give_first([1, 2, 3]), 1)
        self.assertEqual(main.Testing().give_first_alt([1, 2, 3]), 1)
        self.assertEqual(main.Testing().give_first([4, 5, 6]), 4)
        self.assertEqual(main.Testing().give_first_alt([4, 5, 6]), 4)
        self.assertEqual(main.Testing().give_first([7, 8, 9]), 7)
        self.assertEqual(main.Testing().give_first_alt([7, 8, 9]), 7)
        
if __name__ == "__main__": 
    unittest.main()
```
Which using pytest you can run with `pytest tests/tests.py`. But I kinda felt like this was quite annoying, for two main reasons 
- You are just plainly writing repeated code 
- It's annoying to maintain, especially as we scale up to more of the same function 

## Better

So remembering that you can dynamically access class methods in Python I started off with a simple approach using the `inspect.getmembers` function 
```python
def test_give_first(self): 
    methods = []
    for _, method in inspect.getmembers(
        main.Testing, predicate=inspect.isfunction
    ): methods.append(method)
    
    for method in methods: 
        self.assertEqual(method(main.Testing(), [1, 2, 3]), 1)
        self.assertEqual(method(main.Testing(), [4, 5, 6]), 4)
        self.assertEqual(method(main.Testing(), [7, 8, 9]), 7)
```

This cleaned up things a bit, but then I realized if you have multiple classes that share this pattern it would make sense to have a separate method to give you the list of methods you could easily call for different test cases. So to our `TestSolution` class, we can add the following
```python
def method_gettr(problem) -> Generator[callable, None, None]: 
    for _, method in inspect.getmembers(
        problem, predicate=inspect.isfunction
    ): yield method
```

This simplifies our testing function down even further to the following 
```python
def test_give_first(self): 
    for method in TestSolution.method_gettr(main.Testing): 
        self.assertEqual(method(main.Testing(), [1, 2, 3]), 1)
        self.assertEqual(method(main.Testing(), [4, 5, 6]), 4)
        self.assertEqual(method(main.Testing(), [7, 8, 9]), 7)
```

## Even Better
For most cases, I think it's reasonable to stop at this point, but curiosity tends to get the better of me so I wanted to see if I could avoid having to write all those pesky `self.assertEqual` repeatedly. One thing we could do is create some structure to hold the inputs and outputs them loop through those. Which gives us 
```python 
def test_give_first(self):
    inout = [
        ([1, 2, 3], 1),
        ([4, 5, 6], 4),
        ([7, 8, 9], 7)
    ]
    for data, expected in inout: 
        for method in TestSolution.method_gettr(main.Testing): 
            self.assertEqual(method(main.Testing(), data), expected)
```

## Fully generalized
Since we basically generalized the testing code as just a function of some inputs and outputs we can encapsulate this in another helper like so.
```python 
from src import main

import unittest
import inspect
from typing import Generator

class TestSolution(unittest.TestCase): 
    # gives back all user 
    def method_gettr(problem) -> Generator[callable, None, None]: 
        for _, method in inspect.getmembers(
            problem, predicate=inspect.isfunction
        ): yield method
        
    def data_func(self, inout, problem): 
        for data, expected in inout:
            for method in TestSolution.method_gettr(problem): 
                self.assertEqual(method(problem(), data), expected)
        
    def test_give_first_general(self):
        self.test_data_func([
            ([1, 2, 3], 1),
            ([4, 5, 6], 4),
            ([7, 8, 9], 7)
        ], main.Testing)
```

### Note 

If you had some functions you wanted to run the same tests on and others you wanted to run different tests all you have to do is modify the predicate of the `method_gettr`, `inspect.isfunction` gives you all *user-defined* functions, to get only a subset of these you can use various predicates. We can pass our filter to `method_gettr()` like so 

```python 
def method_gettr(f_filter, problem) -> Generator[callable, None, None]: 
    for _, method in inspect.getmembers(
        problem, 
        predicate=lambda func: inspect.isfunction(func) and f_filter(func)
    ): yield method

def data_func(self, inout, problem, f_filter): 
    for data, expected in inout:
        for method in TestSolution.method_gettr(f_filter): 
            self.assertEqual(method(problem(), data), expected)
```

I added the following function to `main.Testing` just to demonstrate 
```python 
def give_last(self, nums: list[int], num: int) -> int: 
    return nums[-1]
```

#### Filter by name name 

```python
lambda func: func.__name__.startswith("give_first")
```

#### Filter by signature

Of note here is that as you might have already noticed you can figure by practically any aspect of the signature.

```python
def test_give_first_general(self):
    # defining our signature
    t_signature = inspect.Signature(
        parameters=[
            inspect.Parameter(
                name="self", kind=inspect.Parameter.POSITIONAL_OR_KEYWORD
            ),
            inspect.Parameter(
                name="nums", kind=inspect.Parameter.POSITIONAL_OR_KEYWORD, 
                annotation=list[int]
            )
        ], return_annotation=int
    )
        
    # using the signature in the lambda 
    self.data_func([
        ([1, 2, 3], 1),
        ([4, 5, 6], 4),
        ([7, 8, 9], 7)
    ], main.Testing, lambda func: inspect.signature(func) == t_signature)
```

If you are curious `t_signature` is an object of `inspect.Signature` and in this case it looks as follows
```
...(self, nums: list[int]) -> int
```

# Full code 
For the full code of this checkout [the repo](https://github.com/KaiErikNiermann/misc-testing/tree/main/method_testing)