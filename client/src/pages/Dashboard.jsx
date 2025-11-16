import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { dashboardStyles as styles } from "../assets/dummystyle";
import { useNavigate } from "react-router-dom";
import { LucideFilePlus } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPaths";
import { ResumeSummaryCard } from "../components/Cards";
import toast from "react-hot-toast";
import moment from "moment";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModel] = useState(false);
  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(true);

  // Calculate completion percentage for a resume
  const calculateCompletion = (resume) => {
    let completedFields = 0;
    let totalFields = 0;

    // Profile Info
    totalFields += 3;
    if (resume.profileInfo?.fullName) completedFields++;
    if (resume.profileInfo?.designation) completedFields++;
    if (resume.profileInfo?.summary) completedFields++;

    // Contact Info
    totalFields += 2;
    if (resume.contactInfo?.email) completedFields++;
    if (resume.contactInfo?.phone) completedFields++;

    // Work Experience
    resume.workExperience?.forEach((exp) => {
      totalFields += 5;
      if (exp.company) completedFields++;
      if (exp.role) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.endDate) completedFields++;
      if (exp.description) completedFields++;
    });

    // Education
    resume.education?.forEach((edu) => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });

    // Skills
    resume.skills?.forEach((skill) => {
      totalFields += 2;
      if (skill.name) completedFields++;
      if (skill.progress > 0) completedFields++;
    });

    // Projects
    resume.projects?.forEach((project) => {
      totalFields += 4;
      if (project.title) completedFields++;
      if (project.description) completedFields++;
      if (project.github) completedFields++;
      if (project.liveDemo) completedFields++;
    });

    // Certifications
    resume.certifications?.forEach((cert) => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });

    // Languages
    resume.languages?.forEach((lang) => {
      totalFields += 2;
      if (lang.name) completedFields++;
      if (lang.progress > 0) completedFields++;
    });

    // Interests
    totalFields += resume.interests?.length || 0;
    completedFields +=
      resume.interests?.filter((i) => i?.trim() !== "")?.length || 0;

    return Math.round((completedFields / totalFields) * 100);
  };
  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.RESUME.GET_ALL);
      //   PERCENTAGE COMPLETION ON EACH RESUMES
      const resumeWithCompletion = response.data.map((resume) => ({
        ...resume,
        completion: calculateCompletion(resume),
      }));
      setAllResumes(resumeWithCompletion);
    } catch (error) {
      console.error("Error fetching Resume:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllResumes();
  }, []);

  const handleDeleteResume = async () => {
    if (!resumeToDelete) return;
    try {
      await axiosInstance.delete(API_PATH.RESUME.DELETE(resumeToDelete));
      toast.success("Resume deleted successfully");
      fetchAllResumes();
    } catch (error) {
      console.error("Error deleting the resume", error);
      toast.error("failed to delete resume");
    } finally {
      setResumeToDelete(false);
      showDeleteConfirm(false);
    }
  };

  const handleDeleteClick = (id) => {
    setResumeToDelete(id);
    setShowDeleteConfirm(true);
  };

  return (
    <div>
      <DashboardLayout>
        <div className={styles.container}>
          <div className={styles.headerWrapper}>
            <div>
              <h1 className={styles.headerTitle}>My Resume</h1>
              <p className={styles.headerSubtitle}>
                {allResumes.length > 0
                  ? `You Have ${allResumes.length} resume${
                      allResumes.length !== 1 ? "s" : ""
                    }`
                  : `Start building your profesional resume`}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                className={styles.createButton}
                onClick={() => setOpenCreateModel(true)}
              >
                <div className={styles.createButtonOverlay}></div>
                <span className={styles.createButtonContent}>
                  Create Now
                  <LucideFilePlus
                    className="group-hover:translate-x-1 trsnsition-transform"
                    size={18}
                  />
                </span>
              </button>
            </div>
          </div>
          {loading && (
            <div className={styles.spinnerWrapper}>
              <div className={styles.spinner}></div>
            </div>
          )}
          {/* Empty state */}
          {!loading && allResumes.length === 0 && (
            <div className={styles.emptyStateWrapper}>
              <div className={styles.emptyIconWrapper}>
                <LucideFilePlus size={32} className="text-violet-600" />
              </div>
              <h3 className={styles.emptyTitle}>No Resumes Yet</h3>
              <p className={styles.emptyText}>
                You havent created any Resumes yet.Start building your
                proffesional resume to land to your dream job
              </p>
              <button
                className={styles.createButton}
                onClick={() => setOpenCreateModel(true)}
              >
                <div
                  className={styles.createButtonOverlay}
                  onClick={() => setOpenCreateModel(true)}
                ></div>
                <span className={styles.createButtonContent}>
                  Create your first Resume
                  <LucideFilePlus
                    className="group-hover:translate-x-1 trsnsition-transform"
                    size={20}
                  />
                </span>
              </button>
            </div>
          )}

          {!loading && allResumes.length > 0 && (
            <div className={styles.grid}>
              <div
                className={styles.newResumeCard}
                onClick={() => setOpenCreateModel(true)}
              >
                <div className={styles.newResumeIcon}>
                  <LucideFilePlus size={32} className="text-white" />
                </div>
                <h3 className={styles.newResumeTitle}>Create New Resume</h3>
                <p className={styles.newResumeText}>
                  Start Building Your Career
                </p>
              </div>
              {allResumes.map((resume) => (
                <ResumeSummaryCard
                  key={resume._id}
                  imgUrl={resume.thumbnailLink}
                  title={resume.title}
                  createdAt={resume.createdAt}
                  updatedAt={resume}
                  onSelect={() => navigate(`/resume/${resume._id}`)}
                  onDelete={() => handleDeleteClick(`/resume/${resume._id}`)}
                  completion={resume.completion || 0}
                  isPremium={resume.isPremium}
                  isNew={moment().diff(moment(resume.createdAt, "days") < 7)}
                />
              ))}
            </div>
          )}
        </div>

        {/* create modal */}
      </DashboardLayout>
    </div>
  );
};

export default Dashboard;
