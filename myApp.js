const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  favoriteFoods: [
    {
      type: String
    }
  ]
});
let Person = mongoose.model('Person', personSchema);

function createAndSavePerson(done) {
  const person = new Person({
    name: 'Mohit',
    age: 19,
    favoriteFoods: ['pani-puri']
  })
  person.save((err,data) => {
    if(err){
      done(err)
    }
    done(null , data);
  })
}


const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err,data) => {
    if(err){
      done(err)
    }
    done(null,data)
  })
};

const findPeopleByName = (personName, done) => {
    Person.find({name: personName}, (err,data) => {
      if(err){
        done(err)
      }
      done(null,data)
  })
};

const findOneByFood = (food, done) => {
    Person.findOne({favoriteFoods: food}, (err,data) => {
    if(err){
      done(err)
    }
    done(null,data)
})
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err,data) => {
    if(err){
      done(err)
    }
    done(null,data)
})
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if(err){
      done(err);
    }
    person.favoriteFoods.push(foodToAdd);
    person.save((errSave, data) => {
      if(errSave){
        done(errSave);
      }
      done(null,data)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err,data) => {
    if(err){
      done(err);
    }
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove},(err,data)=>{
    if(err){
      done(err)
    }
    done(null,data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods : foodToSearch} )
  .sort('name')
  .limit(2)
  .select('-age')
  .exec((err,data) => {
    if(err){
      done(err)
    }
    done(null,data)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
