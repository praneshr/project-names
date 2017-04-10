# Project Names
[![Build Status](https://travis-ci.org/praneshr/project-names.svg?branch=master)](https://travis-ci.org/praneshr/project-names)

A random project name generator as a micro service. Can be used to generate names for **folders, files, passwords, project name and etc.**

## Available Endpoints

### Base URL
Currently the app is hosted in Heroku at **https://project-names.herokuapp.com**

### ```GET /names```

Returns a random name. This covers most of the use-cases.

#### Available Options:
**words: number (default: 2)**

  Number of words in the string excluding the number.

**numbered: boolean (default: true)**

  Adds a random number to the end of the name.

**separator: boolean (default: '-')**

  Adds a custom separator between words.

#### Example
```
  /names?words=4&numbered=false&separator=|
```


### ```GET /names/raw```

Returns a array with random words. Same as `/names`, without the separator.

#### Available Options:

Same as ```GET /names```

#### Example
```
  /names/raw?words=3
```

### ```GET /names/list```
Returns a list of names.

#### Available Options:
**words: number (default: 2)**

  Number of words in the string excluding the number.

**numbered: boolean (default: true)**

  Adds a random number to the end of the name.

**separator: boolean (default: '-')**

  Adds a custom separator between words.

**limit: number - Required**

  Number of names expected

#### Example
```
  /names?limit=20&words=4&numbered=false&separator=|
```

### ```GET /names/list/raw```
Returns a list of list of random words. Similar to `GET /names/raw`

#### Available Options:

Same as ```GET /names/list```

#### Example
```
  /names/list/raw?limit=5&words=6
```

## License

MIT,

Copyright 2017 Pranesh Ravi
