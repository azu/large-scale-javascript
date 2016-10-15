# A collection of `prh.yml` [![Build Status](https://travis-ci.org/azu/prh.yml.svg?branch=master)](https://travis-ci.org/azu/prh.yml)


## Requirement

You should install [prh](https://github.com/vvakame/prh "prh") too.

- [vvakame/prh: proofreading helper](https://github.com/vvakame/prh)
- [azu/textlint-rule-prh: textlint rule for prh.](https://github.com/azu/textlint-rule-prh)
- [language-review](https://atom.io/packages/language-review)

## Usage

### Add to your project

    git subtree add --prefix=prh https://github.com/azu/prh.git master --squash

### Update exist rules

    git subtree pull --prefix=prh https://github.com/azu/prh.git master --squash

### Push updated rules(for developer)

    git subtree push --prefix=prh https://github.com/azu/prh.git master

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/prh/issues).

1. Edit some.yml file
2. Add `expected` and `patterns`, also add `specs`.
3. Send Pull Request! 

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
