var React = require('react');
var resumeContent = require('../config/resume-content');
 
var Resume = React.createClass({
  render: function() {
    return (
      <div className="print-resume">
        <h1>{ resumeContent.name }</h1>
        { this.renderContactInformation() }
        { this.renderObjective() }
        { this.renderEducation() }
        { this.renderTechnicalExperience() }
        { this.renderLanguages() }
      </div>
    );
  },

  renderContactInformation: function() {
    return (
      <ul className="contact-information">
        {
          resumeContent.contacts.map(function(contact, i) {
            if (contact.address === null)
              return (<li key={i}>{ contact.title }</li>);
            return (
              <li key={i}>
                <a href={contact.address}>{ contact.title }</a>
              </li>
            );
          })
        }
      </ul>
    );
  },

  renderObjective: function() {
    return (
      <div className="objective">
        <h2>Objective</h2>
        <p>{ resumeContent.objective }</p>
      </div>
    );
  },

  renderEducation: function() {
    var education = resumeContent.education;
    return (
      <div className="education">
        <h2>Education</h2>
        <ul className="education-highlights">
          <li>{ education.yearMajor }</li>
          <li>{ education.school }</li>
          <li>{ education.gpa }</li>
        </ul>

        <h3>Relevant Coursework</h3>

        <h4>Current Coursework</h4>
        <ul className="education-current">
          {
            education
              .currentCoursework.map(function(course, i) {
                return (<li key={i}>{ course }</li>);
            })
          }
        </ul>

        <h4>Completed Coursework</h4>
        <ul className="education-completed">
          {
            education
              .completedCoursework.map(function(course, i) {
                return (<li key={i}>{ course }</li>);
            })
          }
        </ul>        
      </div>
    );
  },

  renderTechnicalExperience: function() {
    return (
      <div className="technical-experience">
        <h2>Technical Experience</h2>
        {
          resumeContent
            .technicalExperience.map(function(experience, i) {
              return <TechnicalExperienceItem
                        experience={ experience }
                        key={i} />
          })
        }
      </div>
    );
  },

  renderLanguages: function() {
    return (
      <div className="programming-languages">
        <h2>Programming Languages and Libraries</h2>
        <ul>
          {
            resumeContent
              .programmingLanguages.map(function(language, i) {
                return (<li key={i}>{ language }</li>)
            })
          }
        </ul>
      </div>
    );
  }
});

var TechnicalExperienceItem = React.createClass({
  propTypes: {
    experience: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="technical-experience-item">
        <h3 className="title">{ this.props.experience.title }</h3>
        <h4 className="subtitle">{ this.props.experience.subtitle }</h4>
        <p className="description">{ this.props.experience.description }</p>
        <ul className="info-list">
          {
            this.props.experience.infoList.map(function(info, i) {
              return (<li key={i}>{ info }</li>);
            })
          }
        </ul>
      </div>
    );
  }
});

module.exports = Resume;