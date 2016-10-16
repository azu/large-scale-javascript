# A collection of `prh.yml` [![Build Status](https://travis-ci.org/azu/prh.yml.svg?branch=master)](https://travis-ci.org/azu/prh.yml)


## Requirement

You should install [prh](https://github.com/vvakame/prh "prh") or [textlint-rule-prh](https://github.com/azu/textlint-rule-prh/releases/tag/2.4.0 "textlint-rule-prh").

[textlint-rule-prh](https://github.com/azu/textlint-rule-prh/releases/tag/2.4.0 "textlint-rule-prh") with [textlint](https://github.com/textlint/textlint "textlint") >= 7.1.2

## Usage

### Add to your project

    git subtree add --prefix=prh https://github.com/azu/prh.yml.git master --squash

### Update exist rules

    git subtree pull --prefix=prh https://github.com/azu/prh.yml.git master --squash

### Push updated rules(for developer)

    git subtree push --prefix=prh https://github.com/azu/prh.yml.git master

## Setting of `prh.yml`

You can import these prh dictionary files from main `prh.yml`.

```yml
version: 1
imports:
  - prh/ja/jser-info.yml
  - prh/ja/kanji-open.yml
  - prh/ja/spoken.yml
  - prh/ja/typo.yml
  - prh/javascript.yml
  - prh/css.yml
  - prh/software.yml
rules:
  # project configuration
  - expected: Almin
    patterns: /almin.js/i
```

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
