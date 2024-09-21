import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";

// Example training data
const exampleSchedules = [
  {
    date: "09/25/2024",
    facilitator: "John Doe",
    people: 15,
    subject: "Onboarding",
    week: [
      { day: "Monday", subjects: ["Company policies", "Safety and Security"] },
      {
        day: "Tuesday",
        subjects: ["Learning the business", "Getting your system set-up"],
      },
      {
        day: "Wednesday",
        subjects: ["Explore the codebase", "Learn your colleagues"],
      },
      {
        day: "Thursday",
        subjects: ["Learn coding standards", "Learn coding lifecycles"],
      },
      { day: "Friday", subjects: ["Hands-on coding", "Final assessments"] },
    ],
  },
  {
    date: "10/01/2024",
    facilitator: "Jane Smith",
    people: 20,
    subject: "React Development",
    week: [
      {
        day: "Monday",
        subjects: ["Introduction to React", "Understanding JSX"],
      },
      {
        day: "Tuesday",
        subjects: ["Components and Props", "State Management"],
      },
      { day: "Wednesday", subjects: ["React Hooks", "Event Handling"] },
      {
        day: "Thursday",
        subjects: ["React Router", "State Management with Redux"],
      },
      { day: "Friday", subjects: ["Project Review", "Final Q&A"] },
    ],
  },
  {
    date: "10/08/2024",
    facilitator: "Chris Johnson",
    people: 12,
    subject: "Node.js Backend",
    week: [
      {
        day: "Monday",
        subjects: ["Introduction to Node.js", "Setting up a server"],
      },
      { day: "Tuesday", subjects: ["REST APIs", "Express.js"] },
      {
        day: "Wednesday",
        subjects: ["Database Integration", "MongoDB Basics"],
      },
      { day: "Thursday", subjects: ["Middleware", "Error Handling"] },
      { day: "Friday", subjects: ["Deploying Node.js apps", "Project Review"] },
    ],
  },
  // Add more examples as needed
];

const ManageSchedules = () => {
  const [selectedSchedule, setSelectedSchedule] = useState(null); // Selected schedule for modal
  const [showModal, setShowModal] = useState(false); // Modal state

  // Handle View Schedule click
  const handleViewSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSchedule(null);
  };

  return (
    <div className="manage-schedules">
      <h2>Manage Schedules</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Facilitator</th>
            <th>Number of People</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exampleSchedules
            .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date ascending
            .map((schedule, index) => (
              <tr key={index}>
                <td>{schedule.date}</td>
                <td>{schedule.facilitator}</td>
                <td>{schedule.people}</td>
                <td>{schedule.subject}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleViewSchedule(schedule)}
                  >
                    View Schedule
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* Schedule Details Modal */}
      {selectedSchedule && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>
              Schedule Details for {selectedSchedule.subject}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Date: {selectedSchedule.date}</h5>
            <h6>Facilitator: {selectedSchedule.facilitator}</h6>
            <h6>Participants: {selectedSchedule.people}</h6>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Subjects</th>
                </tr>
              </thead>
              <tbody>
                {selectedSchedule.week.map((daySchedule, index) => (
                  <tr key={index}>
                    <td>{daySchedule.day}</td>
                    <td>
                      {daySchedule.subjects.map((subject, i) => (
                        <div key={i}>{subject}</div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ManageSchedules;
