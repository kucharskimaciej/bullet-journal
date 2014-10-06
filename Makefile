test:
	@node node_modules/lab/bin/lab test/spec
test-cov:
	@node node_modules/lab/bin/lab test/spec -t 100
test-cov-html:
	@node node_modules/lab/bin/lab test/spec -r html -o coverage.html

.PHONY: test test-cov test-cov-html