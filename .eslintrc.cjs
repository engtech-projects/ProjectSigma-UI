// module.exports = {
//     "env": {
//         "browser": true,
//         "es2021": true
//     },
//     "extends": [
//         "eslint:recommended",
//         "plugin:vue/vue3-essential"
//     ],
//     "overrides": [
//         {
//             "env": {
//                 "node": true
//             },
//             "files": [
//                 ".eslintrc.{js,cjs}"
//             ],
//             "parserOptions": {
//                 "sourceType": "script"
//             }
//         }
//     ],
//     "parserOptions": {
//         "ecmaVersion": "latest",
//         "sourceType": "module"
//     },
//     "plugins": [
//         "vue"
//     ],
//     "rules": {
//     }
// }

module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "extends": [
        "@nuxtjs/eslint-config-typescript"
    ],
    "rules": {
        "quotes": [1, "double"],
        "indent": [2, 4],
        "vue/html-indent": [2, 4],
        "comma-dangle": [2, {
                "arrays": "only-multiline",
                "objects": "only-multiline"
            }
        ]
    }
}
