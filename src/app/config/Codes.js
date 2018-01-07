var dictionary =
[
    {key: 'INVALID_TOKEN', value: {code: 1, message: "Invalid token"}},
    {key: 'INVALID_USER', value: {code: 2, message: "Invalid user"}},
    {key: 'INVALID_STORE', value: {code: 3, message: "Invalid store"}},
    {key: 'INVALID_PARAMS', value: {code: 4, message: "Invalid parameters"}},
    {key: 'INVALID_EMAIL', value: {code: 5, message: "Invalid email"}},
    {key: 'INVALID_PASSWORD', value: {code: 6, message: "Invalid password"}},
    {key: 'USER_BLOCK', value: {code: 7, message: "User blocked"}},
    {key: 'ACCESS_DENIED', value: {code: 7, message: "Access denied"}},
    {key: 'MISSING_ARGUMENTS', value: {code: 8, message: "Missing arguments"}},
    {key: 'SUCCEFULY', value: {code: 9, message: "Succefuly"}},
    {key: 'MISSING_STOCK', value: {code: 10, message: "Missing in stock"}}
]

exports.GetCode = (code) => {
    for(var i = 0; i < dictionary.length; i++)
        if(dictionary[i].key.toUpperCase() == code.toUpperCase())
            return dictionary[i].value
    
    return console.error("ERROR: Invalid code")
}

function CodeException() {
    console.error('> INVALID CODE')
}