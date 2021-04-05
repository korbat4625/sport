const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '你忘記輸入名字了'],
    maxlength: [15, '輸入太長名字了']
  },
  age: {
    type: Number,
    required: true,
    default: 18
  },
  major: {
    type: String,
    enum: [
      'chem',
      'Electrical Engineering',
      'Computer Science',
      'Law',
      'Sport',
      'undecided'
    ],
    default: 'undecided'
  },
  scholarship: {
    merit: {
      type: Number,
      default: 0,
      max: 50000
    },
    other: {
      type: Number,
      default: 0
    }
  }
})

const PostMsgSchema = new mongoose.Schema({
  articleId: {
    type: Number,
    required: true
  },
  postUser: {
    type: String,
    required: true
  },
  messageIdChain: {
    // must be '${articleId}-messageId' or
    // '${articleId}-messageId1-messageId2'
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  postTime: {
    type: String,
    required: true
  }
})

// Inctance method and static method

// studentSchema.methods.totalScholarship = function () {
//     return this.scholarship.merit + this.scholarship.other;
// };

// studentSchema.statics.setOtherToZero = function () {
//     return this.updateMany({}, { 'scholarship.other': 0 })
// }

// define middleware

// studentSchema.pre('save', async function () {
//     fs.writeFile('record.txt', 'One data is trying to save', e => {
//         if (e) throw e;
//     });
// });

// studentSchema.post('save', async function () {
//     fs.writeFile('record.txt', 'One data has been saved.', e => {
//         if (e) throw e;
//     });
// });

// create a Model ， or called collention

// const Student = mongoose.model('Student', studentSchema)


// create a document called posts

// const newStudent = new Student({
//     name: 'Rian K',
//     age: 29,
//     major: 'Sport',
//     scholarship: {
//         merit: 4000,
//         other: 2000
//     }
// })

// document.save()
// newStudent.save().then(() => {
//   console.log('儲存成功')
// }).catch((e) => {
//   console.log('儲存失敗')
//   console.log(e)
//   fs.writeFile('record.txt', 'Data is not saved.', e => {
//     if (e) throw e;
//   });
// });

// Student.findOneAndUpdate(
//   { name: 'fjoai;sdjfmlksndfosifoasjdfjsad;o' },
//   { 'scholarship.merit': 60000 },
//   { new: true, runValidators: true }
// ).then(msg => {
//   console.log('message:', msg)
// }).catch(e => {
//   console.log(e)
// })

// Student.find().then(data => {
//   console.log(data)
// })

// Student.findOne({ name: 'Mike faidslhfnlasdjf' }).then((data) => {
//   console.log(data.totalScholarship())
// }).catch((e) => {
//   console.log('eooro!!!!!');
//   console.log(e)
// })

// Student.setOtherToZero().then(msg => {
//   console.log(msg)
// }).catch(e => {
//   console.log(e)
// })

// promise test
// let p = new Promise((res, rej) => {
//   setTimeout(() => {
//     rej(new Error('not allowed'))
//   }, 500)
// })
// p.then(response => {
//   console.log('response:', response)
// }).catch(e => {
//   console.log('catch:', e)
// })

module.exports = PostMsgSchema
