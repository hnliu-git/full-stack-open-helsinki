const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}
if (process.argv.length == 4) {
  console.log('Argument error: node mongo.js <password> <name> <number>')
  process.exit(1) 
}
if (process.argv.length > 5) {
  console.log('Argument error: node mongo.js <password> <name> <number>')
  process.exit(1)  
}

const password = process.argv[2]
const url = `mongodb+srv://hnliu:${password}@cluster0.0vyh68x.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 5) {
  const person = {
    name: process.argv[3],
    number: process.argv[4]
  }
  mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
    const newPerson = new Person(person)
    return newPerson.save()
  })
  .then(() => {
    console.log('person saved!')
    return mongoose.connection.close()
  })
  .catch((err) => {
    console.log(err)
    return mongoose.connection.close()
  })
} else {
  mongoose
  .connect(url)
  .then((result) => {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
  })
}