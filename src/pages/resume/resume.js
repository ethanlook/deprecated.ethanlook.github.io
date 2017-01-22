require('./resume.css');

var React = require('react');
var resumeContent = require('../../../config/resume-content.json');

var Resume = React.createClass({
  render: function() {
    return (
      <div className="print-resume">
        <h1>{ resumeContent.name }</h1>
        { this.renderContactInformation() }
        <div className="separator"></div>
        { this.renderObjective() }
        <div className="separator"></div>
        { this.renderEducation() }
        <div className="separator"></div>
        { this.renderTechnicalExperience() }
        <div className="separator"></div>
        { this.renderLanguages() }
      </div>
    );
  },

  renderContactInformation: function() {
    let makeContactListItem = function(contact, i) {
      if (contact.address === null)
        return (<li key={i}>{ contact.title }</li>);
      return (
        <li key={i}>
          <a href={contact.address}>{ contact.title }</a>
        </li>
      );
    };

    return (
      <div className="contact-information">
        <ul>
          {
            resumeContent.contacts.first.map(function(contact, i) {
              return makeContactListItem(contact, i);
            })
          }
        </ul>
        <ul>
          {
            resumeContent.contacts.second.map(function(contact, i) {
              return makeContactListItem(contact, i);
            })
          }
        </ul>
      </div>
    );
  },

  renderObjective: function() {
    return (
      <div className="objective">
        <h2>Objective</h2>
        <p>{ resumeContent.objective.first }</p>
        <p>{ resumeContent.objective.second }</p>
      </div>
    );
  },

  renderEducation: function() {
    var education = resumeContent.education;

    var currentCourses = education
                          .coursework
                          .current
                            .join(", ");

    var completedCourses = education
                            .coursework
                            .completed
                              .join(", ");

    return (
      <div className="education">
        <h2>Education</h2>
        <ul className="education-highlights">
          <li>{ education.school }</li>
          <li>{ education.schoolLocation }</li>
        </ul>
        <ul className="education-highlights">
          <li>{ education.yearMajor }</li>
          <li>{ education.gpa }</li>
        </ul>

        <h3>Relevant Coursework</h3>

        <div className="education-current">
          <p><span className="bold">Current:</span> {currentCourses}</p>
        </div>

        <div className="education-completed">
          <p><span className="bold">Completed:</span> {completedCourses}</p>
        </div>
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
    var description;
    var descriptionLink = this.props.experience.descriptionLink;
    if (descriptionLink == null) {
      description = <p className="description">{ this.props.experience.description }</p>;
    } else {
      description = <p className="description">
        { this.props.experience.description } <a href={descriptionLink.link}>{descriptionLink.text}</a>
      </p>
    }
    return (
      <div className="technical-experience-item">
        <h3 className="title">{ this.props.experience.title }</h3>
        <h4 className="subtitle">{ this.props.experience.subtitle }</h4>
        { description }
        <ul className="info-list">
          {
            this.props.experience.infoList.map(function(info, i) {
              if (info.link != null) {
                return (<li key={i}>
                  { info.description } <a href={info.link}>{info.linkText}</a>
                </li>);
              }
              return (<li key={i}>{ info.description }</li>);
            })
          }
        </ul>
      </div>
    );
  }
});

export default Resume;