module.exports = {
    "parser": "babel-eslint",
    "rules": {
        "indent": [
            2,
            4
        ],
        "quotes": [
            2,
            "single"
        ],
        "linebreak-style": [
            2,
            "unix"
        ],
        "semi": [
            2,
            "always"
        ],
        "no-unused-vars": 1
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "ecmaFeatures": {
        "jsx": true,
        "experimentalObjectRestSpread": true,
        "modules": true
    },
    "plugins": [
        "react"
    ]
};