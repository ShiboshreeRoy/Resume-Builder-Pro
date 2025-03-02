import React, { useState } from 'react';
import { Download, FileText, User, Briefcase, GraduationCap, Award, Plus, Trash2, Save } from 'lucide-react';
import ResumePreview from './components/ResumePreview';
import { ResumeData, Education, Experience, Skill } from './types';

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
  });

  const [activeSection, setActiveSection] = useState<string>('personalInfo');

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value,
      },
    });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        { company: '', position: '', startDate: '', endDate: '', description: '', current: false },
      ],
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | boolean) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setResumeData({ ...resumeData, experience: updatedExperience });
  };

  const removeExperience = (index: number) => {
    const updatedExperience = resumeData.experience.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, experience: updatedExperience });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { institution: '', degree: '', field: '', startDate: '', endDate: '', current: false },
      ],
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string | boolean) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setResumeData({ ...resumeData, education: updatedEducation });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = resumeData.education.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, education: updatedEducation });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, { name: '', level: 'Intermediate' }],
    });
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setResumeData({ ...resumeData, skills: updatedSkills });
  };

  const removeSkill = (index: number) => {
    const updatedSkills = resumeData.skills.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, skills: updatedSkills });
  };

  const saveResume = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    alert('Resume saved successfully!');
  };

  const loadResume = () => {
    const savedResume = localStorage.getItem('resumeData');
    if (savedResume) {
      setResumeData(JSON.parse(savedResume));
      alert('Resume loaded successfully!');
    }
  };

  const downloadResume = () => {
    // In a real application, this would generate a PDF
    alert('In a production environment, this would download a PDF of your resume.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText size={24} />
            <h1 className="text-xl font-bold">ResumeBuilder Pro</h1>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={saveResume}
              className="flex items-center space-x-1 bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded"
            >
              <Save size={16} />
              <span>Save</span>
            </button>
            <button 
              onClick={loadResume}
              className="flex items-center space-x-1 bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded"
            >
              <FileText size={16} />
              <span>Load</span>
            </button>
            <button 
              onClick={downloadResume}
              className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
            >
              <Download size={16} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Editor Section */}
          <div className="lg:col-span-7 bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Resume Editor</h2>
              
              <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                <button
                  onClick={() => setActiveSection('personalInfo')}
                  className={`px-4 py-2 rounded-md whitespace-nowrap ${
                    activeSection === 'personalInfo' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Personal Info
                </button>
                <button
                  onClick={() => setActiveSection('experience')}
                  className={`px-4 py-2 rounded-md whitespace-nowrap ${
                    activeSection === 'experience' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Experience
                </button>
                <button
                  onClick={() => setActiveSection('education')}
                  className={`px-4 py-2 rounded-md whitespace-nowrap ${
                    activeSection === 'education' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Education
                </button>
                <button
                  onClick={() => setActiveSection('skills')}
                  className={`px-4 py-2 rounded-md whitespace-nowrap ${
                    activeSection === 'skills' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Skills
                </button>
              </div>

              {/* Personal Info Section */}
              {activeSection === 'personalInfo' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <User size={18} className="mr-2" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={resumeData.personalInfo.name}
                        onChange={handlePersonalInfoChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Professional Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={resumeData.personalInfo.title}
                        onChange={handlePersonalInfoChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Software Engineer"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={resumeData.personalInfo.email}
                        onChange={handlePersonalInfoChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={resumeData.personalInfo.phone}
                        onChange={handlePersonalInfoChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={resumeData.personalInfo.location}
                        onChange={handlePersonalInfoChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="New York, NY"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Professional Summary
                    </label>
                    <textarea
                      name="summary"
                      value={resumeData.personalInfo.summary}
                      onChange={handlePersonalInfoChange}
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Experienced software engineer with a passion for developing innovative solutions..."
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {activeSection === 'experience' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium flex items-center">
                      <Briefcase size={18} className="mr-2" />
                      Work Experience
                    </h3>
                    <button
                      onClick={addExperience}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                    >
                      <Plus size={16} />
                      <span>Add Experience</span>
                    </button>
                  </div>

                  {resumeData.experience.length === 0 ? (
                    <div className="text-center py-4 bg-gray-50 rounded-md">
                      <p className="text-gray-500">No work experience added yet. Click "Add Experience" to get started.</p>
                    </div>
                  ) : (
                    resumeData.experience.map((exp, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-md">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium">Experience #{index + 1}</h4>
                          <button
                            onClick={() => removeExperience(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company
                            </label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Company Name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Position
                            </label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) => updateExperience(index, 'position', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Job Title"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Start Date
                            </label>
                            <input
                              type="text"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="MM/YYYY"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              End Date
                            </label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="MM/YYYY"
                                disabled={exp.current}
                              />
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`current-job-${index}`}
                                  checked={exp.current}
                                  onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                                  className="mr-1"
                                />
                                <label htmlFor={`current-job-${index}`} className="text-sm">
                                  Current
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Describe your responsibilities and achievements..."
                          ></textarea>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Education Section */}
              {activeSection === 'education' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium flex items-center">
                      <GraduationCap size={18} className="mr-2" />
                      Education
                    </h3>
                    <button
                      onClick={addEducation}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                    >
                      <Plus size={16} />
                      <span>Add Education</span>
                    </button>
                  </div>

                  {resumeData.education.length === 0 ? (
                    <div className="text-center py-4 bg-gray-50 rounded-md">
                      <p className="text-gray-500">No education added yet. Click "Add Education" to get started.</p>
                    </div>
                  ) : (
                    resumeData.education.map((edu, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-md">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium">Education #{index + 1}</h4>
                          <button
                            onClick={() => removeEducation(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Institution
                            </label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="University Name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Degree
                            </label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Bachelor's, Master's, etc."
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Field of Study
                            </label>
                            <input
                              type="text"
                              value={edu.field}
                              onChange={(e) => updateEducation(index, 'field', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Computer Science, Business, etc."
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date
                              </label>
                              <input
                                type="text"
                                value={edu.startDate}
                                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="MM/YYYY"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Date
                              </label>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={edu.endDate}
                                  onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="MM/YYYY"
                                  disabled={edu.current}
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center mt-2">
                            <input
                              type="checkbox"
                              id={`current-edu-${index}`}
                              checked={edu.current}
                              onChange={(e) => updateEducation(index, 'current', e.target.checked)}
                              className="mr-1"
                            />
                            <label htmlFor={`current-edu-${index}`} className="text-sm">
                              Currently Studying
                            </label>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Skills Section */}
              {activeSection === 'skills' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium flex items-center">
                      <Award size={18} className="mr-2" />
                      Skills
                    </h3>
                    <button
                      onClick={addSkill}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                    >
                      <Plus size={16} />
                      <span>Add Skill</span>
                    </button>
                  </div>

                  {resumeData.skills.length === 0 ? (
                    <div className="text-center py-4 bg-gray-50 rounded-md">
                      <p className="text-gray-500">No skills added yet. Click "Add Skill" to get started.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {resumeData.skills.map((skill, index) => (
                        <div key={index} className="p-3 border border-gray-200 rounded-md flex justify-between items-center">
                          <div className="flex-grow mr-2">
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => updateSkill(index, 'name', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Skill name (e.g., JavaScript)"
                            />
                          </div>
                          
                          <select
                            value={skill.level}
                            onChange={(e) => updateSkill(index, 'level', e.target.value)}
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </select>
                          
                          <button
                            onClick={() => removeSkill(index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ResumePreview resumeData={resumeData} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <FileText size={20} />
                <span className="text-lg font-bold">ResumeBuilder Pro</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">Create professional resumes in minutes</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">© 2025 ResumeBuilder Pro. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;