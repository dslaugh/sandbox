Things you can do with a stub:

1. Inspect interaction between objects.
2. Isolating interfaces that are under test.
3. Make tests faster.
4. Avoid calls to inconvenient methods.
5. Spying on method calls in place of assertions on direct or indirect output.


Test Doubles
1. Stunt doubles.
	A. Use when it's inconvenient to use production code.
	B. All they require is that the system under test cannot tell it apart from the real thing.
	C. Can force a certain path through the system under test.
	D. Can record data about their interaction with other objects.
	E. Types
		1. Fake object.
			a. Provides the same functionality as the object it replaces.
			b. Can be viewed as a simpler, alternative implementation.
			c. Differ from stubs in that stubs are usually injected into the system from individual
			   tests on a per-need basis.
			d. Fakes are more comprehensive replacements usually injected into the system as a whole
			   before running any tests.
		2. Dummy object.
			a. Usually just an empty function or object.
			b. If the function being tested throws errors for missing or wrongly typed arguments,
			   a dummy can be used to 'shut it up'.
		3. Stubs.
			a. Are test doubles with pre-programmed behavior.
			b. May return a specific value regardless of received arguments or throw an exception.
			c. Can be used to manipulate the system under test to take a specific path,
			   allowing us to verify a single aspect in isolation.

2. Test Verification
	A. Unit tests have four stages.
		1. Setup. Often divided between a shared setUp method and test specific configuration of objects.
		2. Exercise. Call the function(s) to test.
		3. Verification. Assert that the actual results coincides with our expectations.
		4. Tear down. Never happens inside the test but in a dedicated tearDown method
	B. State Verification.
		1. A test that inspects a property of an object passed to the system under test to verify it's success.
		2. Leads to intuitive tests that clearly describe the outcome of using some part of the system.
	C. Behavior Verification.
		1. A test that inspects the behavior of a function to verify it's success.
	D. Implications of Verification Strategy.
		1. The choice of verification strategy directly influences how a test reads.
		2. It also influences production code and it's relationship to the tests.
		3. Behavior verification taps into the system's implementation by expecting 
		   certain function calls to take place.
		4. State verification is an observation on the direct or indirect input/output relationship.

