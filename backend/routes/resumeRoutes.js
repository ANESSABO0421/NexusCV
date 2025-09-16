import express from "express"
import { createResume, deleteResume, getResumeById, getUserResume, updateResume } from "../controllers/resumeController.js"
import {protect} from "../middleware/authMiddleware.js"
import { uploadResumeImage } from "../controllers/uploadImages.js"



const resumeRouter=express.Router()

resumeRouter.post("/",protect,createResume)
resumeRouter.get("/",protect,getUserResume)
resumeRouter.get("/:id",protect,getResumeById)

resumeRouter.put("/:id",protect,updateResume)
resumeRouter.put("/:id/upload-images",protect,uploadResumeImage)

resumeRouter.delete("/:id",protect,deleteResume)


export default resumeRouter