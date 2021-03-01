install:
	npm install

install-ci:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test
