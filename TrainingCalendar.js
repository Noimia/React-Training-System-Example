import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";

// Helper functions for dates and random data
const getMonday = (date) => {
  const d = new Date(date);
  const day = d.getDay(),
    diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  return new Date(d.setDate(diff));
};

const formatDate = (date) => {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const randomClassSize = () => Math.floor(Math.random() * 10) + 15;
const facilitators = ["John Doe", "Jane Smith", "Alex Brown", "Chris Johnson"];
const getRandomFacilitator = () =>
  facilitators[Math.floor(Math.random() * facilitators.length)];

const subjects = [
  "React Router",
  "Redux",
  "Hooks",
  "Lifecycles",
  "Node.js",
  "Props",
  "Functional Comp VS Class Declaration",
  "React-Bootstrap",
  "JSX",
  "TypeScript",
];
const getRandomSubject = () =>
  subjects[Math.floor(Math.random() * subjects.length)];

// Random user data generator for class details modal
const randomEmployeeData = () => {
  const states = ["CA", "TX", "NY", "FL", "WA"];
  const randomState = states[Math.floor(Math.random() * states.length)];
  const randomId = Math.floor(10000000 + Math.random() * 90000000); // Random 8-digit ID
  const remoteOrOffice = Math.random() > 0.5 ? "Remote" : "In Office";
  const yearsOfExperience = Math.floor(Math.random() * 15) + 1;

  return {
    employeeId: randomId,
    state: randomState,
    remoteOrOffice,
    yearsOfExperience,
  };
};

const TrainingCalendar = () => {
  const [weeks, setWeeks] = useState([]); // Store all weeks in state
  const [initialized, setInitialized] = useState(false); // Track whether the weeks were initialized
  const [showModal, setShowModal] = useState(false); // Modal state
  const [selectedClass, setSelectedClass] = useState(null); // Track selected class

  // Initialize 3 rows on first load
  useEffect(() => {
    if (!initialized) {
      const initialWeeks = [];
      let startDate = getMonday(new Date());

      // Add 3 initial rows
      for (let i = 0; i < 3; i++) {
        initialWeeks.push({
          date: startDate,
          onboarding: Math.random() > 0.33,
          jobTraining: Math.random() > 0.33,
          classSize: randomClassSize(),
          facilitator: getRandomFacilitator(),
          subject: getRandomSubject(),
        });
        startDate = new Date(startDate);
        startDate.setDate(startDate.getDate() + 7); // Increment by a week
      }

      setWeeks(initialWeeks); // Set initial weeks
      setInitialized(true); // Ensure we only initialize once
    }
  }, [initialized]);

  // Function to add more weeks (one at a time)
  const addMoreWeeks = () => {
    const lastWeek = weeks[weeks.length - 1].date;
    const newWeek = new Date(lastWeek);
    newWeek.setDate(lastWeek.getDate() + 7); // Add one more week

    setWeeks((prev) => [
      ...prev,
      {
        date: newWeek,
        onboarding: Math.random() > 0.33,
        jobTraining: Math.random() > 0.33,
        classSize: randomClassSize(),
        facilitator: getRandomFacilitator(),
        subject: getRandomSubject(),
      },
    ]); // Only append the new week
  };

  // Handle class click and open modal
  const handleClassClick = (week, facilitator, subject, classSize) => {
    setSelectedClass({
      week: formatDate(week),
      facilitator,
      subject,
      classSize,
      users: Array.from({ length: classSize }, (_, i) => ({
        name: `User ${i + 1}`,
        ...randomEmployeeData(),
      })),
    });
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClass(null);
  };

  return (
    <div className="col-md-10 main-content">
      <div className="training-calendar">
        <h2 className="mb-4">Training Calendar</h2>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Week</th>
              <th>Onboarding</th>
              <th>Job Training</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, index) => {
              return (
                <tr key={index}>
                  <td>{formatDate(week.date)}</td>
                  <td>
                    {week.onboarding && (
                      <div
                        className="pink-container p-2 text-white clickable"
                        onClick={() =>
                          handleClassClick(
                            week.date,
                            week.facilitator,
                            "New Hire Class",
                            week.classSize
                          )
                        }
                      >
                        Class Size: {week.classSize} <br />
                        Facilitator: {week.facilitator} <br />
                        Subject: New Hire Class
                      </div>
                    )}
                  </td>
                  <td>
                    {week.jobTraining && (
                      <div
                        className="blue-container p-2 text-white clickable"
                        onClick={() =>
                          handleClassClick(
                            week.date,
                            week.facilitator,
                            week.subject,
                            week.classSize
                          )
                        }
                      >
                        Class Size: {week.classSize} <br />
                        Facilitator: {week.facilitator} <br />
                        Subject: {week.subject}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Button variant="primary" onClick={addMoreWeeks} className="mt-3">
          More
        </Button>

        {/* Class details modal */}
        {selectedClass && (
          <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Class Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Date: {selectedClass.week}</h5>
              <h6>Facilitator: {selectedClass.facilitator}</h6>
              <h6>Subject: {selectedClass.subject}</h6>
              <Table striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Employee ID</th>
                    <th>State</th>
                    <th>Remote/In Office</th>
                    <th>Years of Experience</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedClass.users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.employeeId}</td>
                      <td>{user.state}</td>
                      <td>{user.remoteOrOffice}</td>
                      <td>{user.yearsOfExperience}</td>
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
    </div>
  );
};

export default TrainingCalendar;
