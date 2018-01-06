'use strict';

var dictionary = [{ key: 'INVALID_TOKEN', value: 1 }, { key: 'INVALID_USER', value: 2 }, { key: 'INVALID_STORE', value: 3 }, { key: 'USER_UNCHECKED', value: 4 }, { key: 'MISSING_ARGUMENTS', value: 5 }, { key: 'INVALID_ARGUMENTS', value: 6 }, { key: 'SUCCEFULY', value: 7 }];

exports.GetCode = function (code) {
    for (var i = 0; i < dictionary.length; i++) {
        if (dictionary[i].key.toUpperCase() == code.toUpperCase()) return dictionary[i].value;
    }return console.error("ERROR: Invalid code");
};

function CodeException() {
    console.error('> INVALID CODE');
}