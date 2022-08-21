const Joi = require("joi"); //this module returns a class
const express = require('express');
const app = express();
app.use(express.json()); //middleware that allows to parse json some times
//https://en.wikipedia.org/wiki/Middleware
//https://expressjs.com/es/api.html for the .json middleware

///we have app.get(), post, put and delete (all http methods)

//GET
app.get('/', (req, res) => {//first argument: route, second argument: callback function
// api reference https://expressjs.com/es/4x/api.html#req
//when we get a GET http request we do the following
res.send('Hello World');
}); 

const courses = [
    {id: 1, name : "course1"},
    {id: 2, name : "course2"},
    {id: 3, name : "course3"}

];

//app.get("/api/courses", (req, res)=>{
  //  res.send([1,2,3]);
//});
app.get("/api/courses", (req, res)=>{
    res.send(courses);
    //res.sendFile("C:/Users/javia/OneDrive/Documentos/first-app/demofile.html"
    //);
    
});

//Parameters
//app.get("/api/courses/:id", (req, res) =>{
  //  res.send(req.params.id);
//}); //:id means that id is a parameter
//it literally sends the value of id, not related to the array above

app.get("/api/courses/:id", (req, res) =>{
    //let is similar to var
   let course = courses.find(c => c.id == req.params.id); //the course selected by .find() is the one returning True (the argument of .find() is always a function)
   if (!course) return res.status(404).send("The course with the given ID was not found.");//if we don't find a course wee set the status code to  404 which is http for not found. Addionatly we caan send a message  
   //to check the status, on chrome click on inspect, network and refresh by ctrl+r
   res.send(course);

   //courses.find(c => c.id === parseInt(req.params.id)); //3 equals doesn't force changing type, so we need to turn the string  into int
});
//we can have more parameters
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

//if we append ? to the url we can make query request, for instance ?sortBy=year will order the result by year

//app.get('/api/posts/:year/:month', (req, res) => {
  //  res.send(req.query); //returns the query that we append
//}); 

//installing nodemon and calling the file with nodemon instead of node will restart the process whenever there are changes 

//PORT
//In production we cannot rely on our localhost (the port will be dynamically assigned by the hosting environment)
// We need to define the port as a environment variable

const port = process.env.PORT || 3000; //If a port is set as an environment variable (under the name PORT) it uses it, otherwise use 3000

app.listen(port, ()=>{ //the function is optional
    console.log(`Listening on port ${port}...`);
});

//to set PORT sa env variable - say with value 5000-, go to terminal and type:

//set PORT = 5000
//on linux, export instead of set


//POST
//this can be tested using Postman or RESTer
app.post("/api/courses", (req, res) => {

//Input Validation
  //if (!req.body.name || req.body.name.length <3){//if the body does not include a name or the name is too short
    //res.status(400).send("Name is required and should be at leas 3 characters"); //400 is the code forr bad request
    //return; //because we don't want to execute the rest of the code
  //}; 
  //the package joi makes it easier to validate input
  //https://joi.dev/api/?v=17.6.0 api reference for joi
  //const schema = Joi.object({
    //name: Joi.string().min(3).required()
  //});
  //const result = schema.validate(req.body);
 // console.log(result); //logs the body of the request or an error when the input  is not valid
 const { error } = validateCourse(req.body);//result.error
 //this is called object destruccturing https://dmitripavlutin.com/javascript-object-destructuring/
 if (error) {//(result.error){
   //res.status(400).send(result.error.details[0].message); //we send the error message
   res.status(400).send(error.details[0].message);
 return; 
 };
 
  //if (result.error){//if the result has an error field
    //res.status(400).send(result.error.details[0].message); //we send the error message
    //the response on postman allows you to see what the error looks like and be more specific about whiich part you're sending
    //return; 
  //};

  const course = {
    id: courses.length + 1, //should try with databases so that I can get the id from there
    name: req.body.name //we are assuming that the body of the request has a name property
  };
  courses.push(course); //push adfs elements to an array https://www.w3schools.com/jsref/jsref_push.asp
  res.send(course);
});

//UPDATE
app.put("/api/courses/:id", (req, res) =>{
  //Look up the course
  //If not existing returrn 404
  const course = courses.find(c => c.id == req.params.id); //the course selected by .find() is the one returning True (the argument of .find() is always a function)
  if (!course) return res.status(404).send("The course with the given ID was not found.");

  //Validate
  //If invalid, 400
  //const schema = Joi.object({
    //name: Joi.string().min(3).required()
  //});
  //const result = schema.validate(req.body);
  //refactored
  //const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);//result.error
  //this is called object destruccturing https://dmitripavlutin.com/javascript-object-destructuring/
  if (error) {//(result.error){
    res.status(400).send(error.details[0].message); //we send the error message
  return; 
  };
  //Update the course
  //Return the updated course
  course.name = req.body.name;
  res.send(course);

});


//we have used the same code twice to validate, so let's refactor
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  return schema.validate(course);
};


//DELETE
app.delete("/api/courses/:id", (req, res) =>{
  //Look up the course
  //No existing, 404
  //This could also be refactored
  const course = courses.find(c => c.id == req.params.id); //the course selected by .find() is the one returning True (the argument of .find() is always a function)
  if (!course) return res.status(404).send("The course with the given ID was not found."); //with return it exits the code (same if I write return below in a block of coode)
  //Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1); //https://www.w3schools.com/jsref/jsref_splice.asp
  //Return the deleted course
  res.send(course);
   
});