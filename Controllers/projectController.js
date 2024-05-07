const projectdatas = require("../model/projectSchema");

//function to add project
exports.addProject = async(req,res)=>{
console.log('inside project controller');

const userId=req.payload
//console.log(userId);

const projectImage = req.file.filename
//console.log(projectImage);

const {title,language,github,website,overview} = req.body
//console.log(title,language,github,website,overview);

try {
   const existingProject =await projectdatas.findOne({github});
    if(existingProject){
        res.status(406).json("project already exists")
    }
    else{
        const newProject = new projectdatas
        ({
            title,
            language,
            github,
            website,
            overview,
            projectImage,
            userid:userId
        })
       await newProject.save()
       res.status(200).json(newProject)
    }

    
} catch (error) {
    
    res.status(401).json('request failed due to',error)
}
}


//controller to get 3 projects for home card

exports.getHomeProject =async(req,res)=>{
   try {
    const homeProject = await projectdatas.find().limit(3)

    res.status(200).json(homeProject)
    
   } catch (error) {
    res.status(401).json('failed due to',error)
    
   }
}

//controller to get all projects 

exports.getAllProject =async(req,res)=>{
    const searchKey=req.query.search //to access query parameter 
    console.log(searchKey);

    const query={      
language:{
    //1)based on which search should be executed
    //2)to remove case sensitivity use  $options:'i'   
    $regex:searchKey,
    $options:'i'
}
    }
    try {
     const allProjects = await projectdatas.find(query)
 
     res.status(200).json(allProjects)
     
    } catch (error) {
     res.status(401).json(`request failed due to ${error}`)
     
    }
 }


 //to get projects based on user

 exports.getUserProject=async(req,res)=>{
    try {
        const userId = req.payload  //userid is sent from jwt middleware as req.payload
        const userProject = await projectdatas.find({userid:userId})
        res.status(200).json(userProject)
        
    } catch (error) {        
        res.status(401).json(`request failed due to ${error}`)
    }
 }

 //function to delete user project

 exports.deleteUserProject=async(req,res)=>{
    try {
        const {id} = req.params //to access id parameter

        const removeProject = await projectdatas.findByIdAndDelete({_id:id})  //mongoDB method
        res.status(200).json(removeProject)
        
    } catch (error) {
        res.status(401).json(`request failed due to ${error}`)
        
    }
 }


 //edit user project

 exports.editUserProject=async(req,res)=>{
    const {projectId} = req.params
    const userId=req.payload
    const {title,language,github,website,overview,projectImage} = req.body
    console.log(title,language,github,website,overview,projectImage);

    const uploadedProjectImage = req.file?req.file.filename:projectImage
    //if there is new uploaded content then req.file.filename else use existing projectImage

    try {
        //1. how to identify Image
        //2.how to update the projects

        const updateProject = await projectdatas.findByIdAndUpdate(
            {_id:projectId},
            {
                title,
                language,
                github,
                website,
                overview,
                projectImage:uploadedProjectImage,
                userid:userId
            },
            {new:true} //adding new to existing content
        )
        
        await updateProject.save()//to save content to mongodB
        res.status(200).json(updateProject)
        
    } catch (error) {
        res.status(401).json(`error occured due to ${error}`)
        
    }
 }