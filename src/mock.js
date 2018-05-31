// import { SolutionSchema } from './app/models/solution'
// import { UserSchema } from './app/models/user'
// import { StoreSchema } from './app/models/store'
// import { DbConfig, Mongo } from './app/config/database'
// import { green, cyan, bold } from 'colors'

// // Configure server
// var argv = process.argv.slice(2)
// DbConfig(argv.indexOf("--docker") >= 0 ? "mongodb://mongo/CRM" : "mongodb://localhost:27017/CRM")

// var solutionBody = {
//     name: "Empresa S.A.",
//     cnpj: "1234567890n"
// }

// SolutionSchema.create(solutionBody, (err, solution) => {
//     if(err)
//         return console.log(err)

//     var storeBody = {
//         name: "adfsadkf",
//         address: "Não tem rua",
//         type: "physical",
//         solution: solution
//     }

//     StoreSchema.create(storeBody, (er, store) => {
//         if(er)
//             return console.log(er)

//         storeBody.name = "Outra loja"
//         storeBody.type = "ecommerce"
        
//         StoreSchema.create(storeBody, (er, store2) => {
//             if(er)
//                 return console.log("Store 2 not created")

//             var userBody = {
//                 solution: solution,
//                 name: "Anderson Laurentino",
//                 email: "alaurentino.br@gmail.com",
//                 password: "1234567890n",
//                 cpf: "12345678910",
//                 gender: "male",
//                 permissions: ['addUser', 'deleteUser', 'updateUser', 'addStore', 'deleteStore', 'updateStore', 'addProduct', 'deleteProduct', 'updateProduct', 'addInStock', 'sell'],
//                 stores: []
//             }
            
//             // Mock user
//             UserSchema.create(userBody, (err, user) => {
//                 if(err)
//                     return console.log(err)
                
//                     console.log(bold(green('➜  ') + cyan('MOCK: ')) + 'Solution and User mocked with success!')
//             })
//         })
//     })
// })


var axios = require('axios')

var payload = {email: "anderson@laurentino.com", password: "1234567890n"}

axios.post('http://localhost:8080/login', payload)
.then(response => {
    console.log(response.data)
})
.catch(error => {
    assert.equal(false, true)
});