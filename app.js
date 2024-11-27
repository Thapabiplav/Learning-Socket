const express = require("express");
const app = express();
const { Server } = require("socket.io");

const connectToDatabase=require('./database/index');
const Book = require("./database/bookModel");
connectToDatabase() //database call

const server = app.listen(4000, () => {
  console.log("Server has started at port 4000 "); //http communciation for establishment required for socket.io
});

const io = new Server(server); // instancation of server

io.on("connection", (socket) => { //connection established huda socket auxa
  console.log("connection established");

  //crud
//Create
socket.on('addBook',async(data)=>{
try {
  if(data){
    const {bookName,bookPrice}=data;
    const newBook= await Book.create({
      bookName,
      bookPrice
    })
    socket.emit('response',{status:200,message:"Book Creates Sucessfully",data:newBook})
  }
} catch (error) {
  socket.emit('response',{status:500,message:"Something went wrong"})
}
})

//Read
socket.on('fetchBook',async()=>{
 try {
  const fetchedBook=await Book.find()
  socket.emit('response',{status:200,message:'Book fetched sucessfully',data:fetchedBook})
 } catch (error) {
  socket.emit('response',{message:"Something went wrong"})
 }
})

//update
socket.on('update',async(data)=>{
  try {
    if(data){
      const{bookId,bookName,bookPrice}=data
      const updateBook=await Book.findByIdAndUpdate(bookId,{
        bookName,
        bookPrice
      },
    {
      new:true
    })
    socket.emit('response',{staus:200,message:"Book updated sucessfully",data:updateBook})
    }
  } catch (error) {
    socket.emit('response',{status:500,message:"Something went wrong"})
  }
})

//delete
socket.on('delete',async(data)=>{
  try {
    if(data){
      const{bookId}=data
      await Book.findByIdAndDelete(bookId)
      socket.emit('response',{status:200,message:"Book delete sucessfully"})
    }
  } catch (error) {
    socket.on('response',{status:500,message:"Something went worng"})
  }
})

  // socket.on("dataSend", (data) => { //cilent bata pathaunu paryo vane request
  //   console.log(data);
  //   if(data){
  //     // socket.emit('response',{  //server bata pathanu paryo vane response
  //     //   greetings:"Thank you for submitting data" 
  //     // })
  //     // io.emit('hi','Thank for sending data') // golbally data pathaunu paryo vane
  //     io.to(socket.id).emit('response',"Thank for  sending data") //jasle request garko teslai 
  //   }
  // });
});

