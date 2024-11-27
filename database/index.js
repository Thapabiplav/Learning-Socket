//database Connection

const mongoose=require('mongoose')
async function connectToDatabase() {
  await mongoose.connect('mongodb+srv://thapabirat95:qUyCu64VnbmGMihQ@cluster0.kiczk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  console.log('Database Connected Sucessfully');
}

module.exports=connectToDatabase