//import model

const users = require("../model/userSchema");

//register
exports.register = async (req, res) => {
  // console.log(req.file);
  const file = req.file.filename;

  //get other input request from user body

  const { fname, lname, email, mobile, gender, department, location } = req.body;

  if (
    !fname ||
    !lname ||
    !email ||
    !mobile ||
    !gender ||
    !department ||
    !location
  ) {
    res.status(403).json("All inputs are required");
  }
  //if all correct, check it is an existing user
  try {
    const preuser = await users.findOne({ email, mobile });
    if (preuser) {
      res.status(406).json("User already exist");
    } else {
      //register user

      const newuser = new users({
        fname,
        lname,
        email,
        mobile,
        gender,
        department,
        profile: file,
        location,
      });

      //save to db

      await newuser.save();
      res.status(200).json(newuser);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

//get users
exports.getusers = async (req, res) => {
  //get search query from req

  const search = req.query.search;
  const queryletter = {
    fname: { $regex: search, $options: "i" }, //check search key in fname using regex, by case insensitive
  };
  try {
    const allusers = await users.find(queryletter);
    res.status(200).json(allusers);
  } catch (error) {
    res.status(401).json(error);
  }
};

//view profile
exports.viewprofile = async (req, res) => {
  const {id}=req.params
 try {
  const singleUser= await users.findOne({_id:id})
  res.status(200).json(singleUser)
 } catch (error) {
  res.status(401).json("Student not found!!!")
 }
};


//delte user

exports.deleteuser=async(req,res)=>{
  const {id}=req.params

 try {
 const removedUser= await users.findByIdAndDelete({_id:id})
 res.status(200).json(removedUser)
 } catch (error) {
  res.status(401).json(error)

 }

};

//update user

exports.updateuser=async(req,res)=>{
  //get values from req
  const {id}=req.params
  const { fname, lname, email, mobile, gender, department, location,user_profile } = req.body;
  const file=req.file?req.file.filename:user_profile


 try {
 const updatedUser= await users.findByIdAndUpdate({_id:id},
  {fname,
    lname,
    email,
    mobile,
    gender,
    department,
    profile: file,
    location,},
    {
      new:true  // new:true to return updated data
    })
//to save this in mongodb
await updatedUser.save()

 res.status(200).json(updatedUser)
 } catch (error) {
  res.status(401).json(error)

 }

}