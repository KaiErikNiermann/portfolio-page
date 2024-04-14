---
title: Simplifying unittests for classes with same in/out functions
description: I ran into a mildly interesting problem of wanting to run the same unit tests on multiple functions of a class without having to call each function individually, this is just a short writeup of how I solved this issue
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
For both of these classes you expect the same outputs for a given input. Now the straightforward way of writing tests for this would be.
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
- Its annoying to maintain, especially as we scale up to more of the same function 

## Better

So remembering that you can dynamically access class methods in python I started off with a simple approach using the `inspect.getmembers` function 
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

Which cleaned up things a bit, but then I realized if you have multiple classes which share this pattern it would make sense to have a separate method to give you the list of methods you could easily call for different test cases. So to our `TestSolution` class we can add the following
```python
def method_gettr() -> Generator[callable, None, None]: 
    for _, method in inspect.getmembers(
        main.Testing, predicate=inspect.isfunction
    ): yield method
```

This simplifies our testing function down even further to the following 
```python
def test_give_first(self): 
    for method in TestSolution.method_gettr(): 
        self.assertEqual(method(main.Testing(), [1, 2, 3]), 1)
        self.assertEqual(method(main.Testing(), [4, 5, 6]), 4)
        self.assertEqual(method(main.Testing(), [7, 8, 9]), 7)
```

## Best
For most cases I think its reasonable to stop at this point, but curiousity tends to get the better of me so I wanted to see if I could avoid having to write all those pesky `self.assertEqual` repeatedly. One thing we could do is create some structure to hold the inputs and outputs them loop through those. Which gives us 
```python 
def test_give_first(self):
    inout = [
        ([1, 2, 3], 1),
        ([4, 5, 6], 4),
        ([7, 8, 9], 7)
    ]
    for data, expected in inout: 
        for method in TestSolution.method_gettr(): 
            self.assertEqual(method(main.Testing(), data), expected)
```

## Too far
If this is better I'd argue could be subjective, but I still had the bad thought of *can we go further*. Specifically those nested loops were bugging me. One way to avoid them is to create an array for all the outputs and likewise an array for all the expected outputs for all test cases. Which led me to this final state of our testing function.
```python
def test_give_first_too_far(self):
    inout = [
        ([1, 2, 3], 1),
        ([4, 5, 6], 4),
        ([7, 8, 9], 7)
    ]
    methods = [method for method in TestSolution.method_gettr()]
    for data, expected in inout: 
        results = map(lambda method: method(main.Testing(), data), methods)
        self.assertEqual(list(results), [expected] * len(methods))
```

# Full code 
For the full code of this checkout [the repo](https://github.com/KaiErikNiermann/misc-testing/tree/main/method_testing)