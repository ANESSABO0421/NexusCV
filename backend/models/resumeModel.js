import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    thumbnailLink: {
      type: String,
    },
    template: {
      theme: String,
      colorPalette: [String],
    },
    profileInfo: {
      profilePreviewUrl: String,
      fullName: String,
      designation: String,
      summary: String,
    },

    contactInfo: {
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
      website: String,
    },

    workExperience: {
      company: String,
      role: String,
      startDate: String,
      endDate: String,
      description: String,
    },

    education: {
      degree: String,
      instituition: String,
      startDate: String,
      endDate: String,
    },
    skill: [
      {
        name: String,
        progress: String,
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        github: String,
        liveDemo: String,
      },
    ],

    certification: [{ title: String, issuer: String, year: String }],

    languages: [
      {
        name: String,
        progress: Number,
      },
    ],

    intrests: [String],
  },
  {
    timeStamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

export default mongoose.model("Resume", resumeSchema);
