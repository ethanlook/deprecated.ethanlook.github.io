require('./resume.css');

import React from 'react';
import CONTENT from '../../../config/resume-content.json';

const getSeparator = () => <div className="separator"></div>;

const getName = (name) => (<h1>{ name }</h1>);

const getContactListItem = (contact, i) => {
  if (contact.address === null)
    return (<li key={i}>{ contact.title }</li>);
  return (
    <li key={i}>
      <a href={contact.address}>{ contact.title }</a>
    </li>
  );
};

const getContactInfo = (info) => (
  <div className="contact-information">
    <ul>
      { info.first && info.first.map(getContactListItem) }
    </ul>
    <ul>
      { info.second && info.second.map(getContactListItem) }
    </ul>
  </div>
);

const getCourses = (courses) => (
  <div className="education-relevant">
    <p><span className="bold">Notable coursework:</span> { courses.join(', ') }</p>
  </div>
);

const getEducation = (education) => (
  <div className="education">
    <h2>Education at { education.school }</h2>
    <ul className="education-highlights">
      <li>{ education.yearMajor }</li>
      <li>{ education.gpa }</li>
    </ul>

    { education.coursework && getCourses(education.coursework) }
  </div>
);

const getExperienceDescription = (experience) => {
  if (!experience.descriptionLink) {
    return <p className="description">{ experience.description }</p>;
  }
  return (<p className="description">
    { experience.description } <a href={ experience.descriptionLink.link }>{ experience.descriptionLink.text }</a>
  </p>);
};

const getExperienceItem = (experience, i) => (
  <div className="experience-item" key={i}>
    <h3 className="title">{ experience.title }</h3>
    <h4 className="subtitle">{ experience.subtitle }</h4>
    { getExperienceDescription(experience) }
    <ul className="info-list">
      {
        experience.infoList.map((info, j) => {
          if (info.link != null) {
            return (<li key={j}>
              { info.description } <a href={info.link}>{info.linkText}</a>
            </li>);
          }
          return (<li key={j}>{ info.description }</li>);
        })
      }
    </ul>
  </div>
);

const getExperience = (experience) => ( 
  <div className="experience">
    <h2>Technical Experience</h2>
    { experience.map(getExperienceItem) }
  </div>
);

const getSkills = (skills) => (
  <div className="skills">
    <h2>Programming Languages and Libraries</h2>
    <ul>
      { skills.map((skill, i) => <li key={i}>{ skill }</li>) }
    </ul>
  </div>
);

const getResume = ({name, contactInfo, objective, education, experience, skills }) => (
  <div className="print-resume">
    { name && getName(name) }
    { contactInfo && getContactInfo(contactInfo) }
    { contactInfo && getSeparator() }
    { education && getEducation(education) }
    { education && getSeparator() }
    { experience && getExperience(experience) }
    { experience && getSeparator() }
    { skills && getSkills(skills) }
  </div>
);

export default getResume(CONTENT);
