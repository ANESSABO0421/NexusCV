import Resume from "../models/resumeModel.js";
import fs from "fs";
import path from "path";
// create resume
export const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    // default template
    const defaultResumeData = {
      profileInfo: {
        profileImg: null,
        previewUrl: "",
        fullName: "",
        designation: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        website: "",
      },
      workExperience: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        },
      ],
      skills: [
        {
          name: "",
          progress: 0,
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          github: "",
          liveDemo: "",
        },
      ],
      certifications: [
        {
          title: "",
          issuer: "",
          year: "",
        },
      ],
      languages: [
        {
          name: "",
          progress: "",
        },
      ],
      interests: [""],
    };

    const newResume = await Resume.create({
      userId: req.body._id,
      title,
      ...defaultResumeData,
      ...req.body,
    });

    res.send(201).json(newResume);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "failed to create resume" });
  }
};

// get user resume function
export const getUserResume = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });
    res.json(resumes);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "failed to create resume" });
  }
};

// get resume by id
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.json(resume);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "failed to get resume" });
  }
};

// update resume
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found or not authorised" });
    }

    // update the resume with the old resume with our changes on req.body
    Object.assign(resume, req.body);

    const saveResume = await resume.save();
    res.json(saveResume);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "failed to update resume" });
  }
};

// delete resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found or not authorised" });
    }

    // create uploads folder nad store the resume there
    const uploadFolder = path.join(process.cwd(), "uploads");

    // delete thumbnail
    if (resume.thumbnailLink) {
      const oldThumbNail = path.join(
        uploadFolder,
        path.basename(resume.thumbnailLink)
      );
      if (fs.existsSync(oldThumbNail)) {
        // remove old thumbnail
        fs.unlinkSync(oldThumbNail);
      }
    }

    // delete profile
    if (resume.profileInfo?.profilePreviewUrl) {
      const oldProfile = path.join(
        uploadFolder,
        path.basename(resume.profileInfo.profilePreviewUrl)
      );
      if (fs.existsSync(oldProfile)) {
        // remove old profile
        fs.unlinkSync(oldProfile);
      }
    }

    // delete resume doc
    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!deleted) {
      return res.status(404).send("resume not found or your not authorised");
    }

    res.json({ message: "resume deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "failed to update resume" });
  }
};
