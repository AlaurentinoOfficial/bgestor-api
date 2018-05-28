import { SolutionSchema } from './app/models/solution'
import { UserSchema } from './app/models/user'
import { DbConfig, Mongo } from './app/config/database'
import { green, cyan, bold } from 'colors';

// Configure server
var argv = process.argv.slice(2)
DbConfig(argv.indexOf("--docker") >= 0 ? "mongodb://mongo/CRM" : "mongodb://localhost:27017/CRM")

// Mock solution
SolutionSchema.create({name: "Projeto Maker Ltda", cnpj: "1234567890n"}, (err, solution) => {
    if(err)
        return console.log(err)

    var user = {
        solution: solution,
        name: "Anderson Laurentino",
        email: "alaurentino.br@gmail.com",
        password: "1234567890n",
        cpf: "12345678910",
        gender: "male",
        level: "admin"
    }

    // Mock user
    UserSchema.create(user, (err, doc) => {
        if(err)
            return console.log("User not created")

        console.log(bold(green('➜  ') + cyan('MOCK: ')) + 'Solution and User mocked with success!')
    })
})

process.exit(0)