import React from 'react';
import { ResumeData } from '../types';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills } = resumeData;

  return (
    <div className="bg-white p-8 text-sm">
      {/* Header */}
      <div className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {personalInfo.name || 'Your Name'}
        </h1>
        <p className="text-lg text-gray-600 mt-1">
          {personalInfo.title || 'Professional Title'}
        </p>
        
        <div className="flex flex-wrap mt-3 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="mr-4 mb-1">
              <span className="font-medium">Email:</span> {personalInfo.email}
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="mr-4 mb-1">
              <span className="font-medium">Phone:</span> {personalInfo.phone}
            </div>
          )}
          
          {personalInfo.location && (
            <div className="mb-1">
              <span className="font-medium">Location:</span> {personalInfo.location}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-1 mb-3">
            Work Experience
          </h2>
          
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-800">{exp.position}</h3>
                <span className="text-gray-600 text-xs">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              
              <p className="text-gray-700">{exp.company}</p>
              
              {exp.description && (
                <p className="text-gray-600 mt-1 text-sm">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-1 mb-3">
            Education
          </h2>
          
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-800">{edu.institution}</h3>
                <span className="text-gray-600 text-xs">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
              
              <p className="text-gray-700">
                {edu.degree}{edu.field ? `, ${edu.field}` : ''}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-1 mb-3">
            Skills
          </h2>
          
          <div className="flex flex-wrap">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2">
                {skill.name} {skill.level && `• ${skill.level}`}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;