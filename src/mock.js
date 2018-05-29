import { SolutionSchema } from './app/models/solution'
import { UserSchema } from './app/models/user'
import { DbConfig, Mongo } from './app/config/database'
import { green, cyan, bold } from 'colors';
import { StoreSchema } from './app/models/store';

// Configure server
var argv = process.argv.slice(2)
DbConfig(argv.indexOf("--docker") >= 0 ? "mongodb://mongo/CRM" : "mongodb://localhost:27017/CRM")

// Mock solution
SolutionSchema.create({name: "Projeto Maker Ltda", cnpj: "1234567890n"}, (err, solution) => {
    if(err)
        return console.log(err)

    var storeBody = {
        name: "sdfasdf",
        address: "sadfadsf",
        type: "physical",
        solution: solution
    }

    StoreSchema.create(storeBody, (er, store) => {
        if(er)
            return console.log("Store not created")
        
        var userBody = {
            solution: solution,
            name: "Anderson Laurentino",
            email: "alaurentino.br@gmail.com",
            password: "1234567890n",
            cpf: "12345678910",
            gender: "male",
            level: "admin",
            stores: [store]
        }
        
        // Mock user
        UserSchema.create(userBody, (err, user) => {
            if(err)
                return console.log(err)
            
                console.log(bold(green('➜  ') + cyan('MOCK: ')) + 'Solution and User mocked with success!')
        })
    })
})

