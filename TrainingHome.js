import React, { useState } from "react";
import { Button, Collapse, Form } from "react-bootstrap";
import { PlusSquare, Plus, Dash } from "react-bootstrap-icons";

// Dummy task data for the right sidebar
const initialTasks = {
  inProgress: [
    {
      id: "1",
      text: "Complete training design",
      addedBy: "User",
      date: "09/19/2024",
    },
  ],
  ready: [
    {
      id: "2",
      text: "Upload training materials",
      addedBy: "User",
      date: "09/18/2024",
    },
  ],
  incomplete: [
    {
      id: "3",
      text: "Assign new trainers",
      addedBy: "User",
      date: "09/17/2024",
    },
  ],
  completed: [],
};

const TrainingHome = ({ setShowAddModal, tiles, handleViewChange }) => {
  const [openSections, setOpenSections] = useState({
    inProgress: true,
    ready: true,
    incomplete: true,
    completed: false,
  });

  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [showInputField, setShowInputField] = useState({
    inProgress: false,
    ready: false,
    incomplete: false,
  });

  const handleSectionToggle = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Handle task addition
  const handleTaskAdd = (section) => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: `${Math.random()}`,
        text: newTask,
        addedBy: "User",
        date: new Date().toLocaleDateString(),
      };
      setTasks((prev) => ({
        ...prev,
        [section]: [newTaskObj, ...prev[section]],
      }));
      setNewTask("");
      setShowInputField((prev) => ({ ...prev, [section]: false }));
    }
  };

  // Handle task addition
  const handleCancelTask = (section) => {
    setNewTask("");
    setShowInputField((prev) => ({ ...prev, [section]: false }));
  };

  // Handle task move
  const handleMoveTask = (task, fromSection, toSection) => {
    setTasks((prev) => ({
      ...prev,
      [fromSection]: prev[fromSection].filter((t) => t.id !== task.id),
      [toSection]: [task, ...prev[toSection]],
    }));
  };

  return (
    <>
      {/* Main Center Tiles */}
      <div className="col-md-7 main-content">
        <h2 className="mt-4 text-start" style={{ marginLeft: "50px" }}>
          {" "}
          {/* Adjusted alignment */}
          Welcome, User
        </h2>
        <div className="row">
          {tiles.map((tile, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="tile-card shadow-sm p-3 text-center">
                <div className="tile-icon mb-2">{tile.icon}</div>
                <h5 className="tile-title">{tile.title}</h5>
                <p className="tile-description">{tile.description}</p>
                <Button
                  variant="primary"
                  onClick={() => handleViewChange(tile.title)}
                >
                  View
                </Button>
              </div>
            </div>
          ))}
          {/* Add More Tile */}

          <div className="col-md-4 mb-4">
            <div
              className="tile-card shadow-sm p-3 text-center add-more-tile"
              onClick={() => setShowAddModal(true)}
              style={{ backgroundColor: "transparent" }}
            >
              <div className="tile-icon mb-2">
                <PlusSquare size={32} />
              </div>
              <h5 className="tile-title">Add More</h5>
              <Button variant="primary">Add New</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Required Sidebar */}
      <div
        className="col-md-3 action-required p-4"
        style={{
          backgroundColor: "transparent",
          fontSize: "12px",
          border: "3px solid white",
        }}
      >
        {["inProgress", "ready", "incomplete", "completed"].map((section) => (
          <div key={section} className="task-section mb-3">
            {/* Section Title with Colored + or - icons */}
            <div className="d-flex justify-content-between align-items-center">
              <h5
                className={`text-${
                  section === "inProgress"
                    ? "primary"
                    : section === "ready"
                    ? "pink"
                    : section === "incomplete"
                    ? "warning"
                    : "success"
                }`}
              >
                {section.charAt(0).toUpperCase() +
                  section.slice(1).replace(/([A-Z])/g, " $1")}
              </h5>
              <span
                className={`text-${
                  section === "inProgress"
                    ? "primary"
                    : section === "ready"
                    ? "pink"
                    : section === "incomplete"
                    ? "warning"
                    : "success"
                }`}
                onClick={() => handleSectionToggle(section)}
                style={{ cursor: "pointer" }}
              >
                {openSections[section] ? (
                  <Dash size={20} />
                ) : (
                  <Plus size={20} />
                )}
              </span>
            </div>

            {/* Task List */}
            <Collapse in={openSections[section]}>
              <div>
                <ul className="list-group mt-2">
                  {tasks[section].map((task) => (
                    <li
                      className="list-group-item d-flex flex-row align-items-center justify-content-between"
                      key={task.id}
                      style={{
                        padding: "10px",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {/* Task Content */}
                      <div>
                        <div>{task.text}</div>
                        <small className="text-muted">
                          {task.date} by {task.addedBy}
                        </small>
                      </div>

                      {/* Task Action Buttons */}
                      <div className="d-flex flex-row">
                        {section === "inProgress" && (
                          <>
                            <Button
                              size="sm"
                              variant="success"
                              className="me-2"
                              style={{
                                fontSize: "10px",
                                padding: "2px 6px",
                              }}
                              onClick={() =>
                                handleMoveTask(task, section, "completed")
                              }
                            >
                              Complete
                            </Button>
                            <Button
                              size="sm"
                              variant="primary"
                              style={{
                                fontSize: "10px",
                                padding: "2px 6px",
                              }}
                              onClick={() =>
                                handleMoveTask(task, section, "ready")
                              }
                            >
                              Ready
                            </Button>
                          </>
                        )}
                        {section === "ready" && (
                          <>
                            <Button
                              size="sm"
                              variant="primary"
                              className="me-2"
                              style={{
                                fontSize: "10px",
                                padding: "2px 6px",
                              }}
                              onClick={() =>
                                handleMoveTask(task, section, "inProgress")
                              }
                            >
                              In Progress
                            </Button>
                            <Button
                              size="sm"
                              variant="warning"
                              style={{
                                fontSize: "10px",
                                padding: "2px 6px",
                              }}
                              onClick={() =>
                                handleMoveTask(task, section, "incomplete")
                              }
                            >
                              Incomplete
                            </Button>
                          </>
                        )}
                        {section === "incomplete" && (
                          <Button
                            size="sm"
                            variant="primary"
                            style={{
                              fontSize: "10px",
                              padding: "2px 6px",
                            }}
                            onClick={() =>
                              handleMoveTask(task, section, "ready")
                            }
                          >
                            Ready
                          </Button>
                        )}
                        {section === "completed" && (
                          <Button
                            size="sm"
                            variant="primary"
                            style={{
                              fontSize: "10px",
                              padding: "2px 6px",
                            }}
                            onClick={() =>
                              handleMoveTask(task, section, "inProgress")
                            }
                          >
                            In Progress
                          </Button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Add Task Button */}
                {section !== "completed" && (
                  <>
                    {!showInputField[section] ? (
                      <Button
                        size="sm"
                        variant="outline-primary"
                        className="mt-2"
                        style={{ padding: "2px 6px" }} // Adjusted height
                        onClick={() =>
                          setShowInputField((prev) => ({
                            ...prev,
                            [section]: true,
                          }))
                        }
                      >
                        +
                      </Button>
                    ) : (
                      <>
                        <Form.Group className="mt-2">
                          <Form.Control
                            type="text"
                            placeholder="Enter new task"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                          />
                        </Form.Group>
                        <div className="d-flex flex-row mt-2">
                          <Button
                            size="sm"
                            variant="primary"
                            style={{
                              fontSize: "12px",
                              padding: "4px 10px",
                              marginRight: "8px",
                            }}
                            onClick={() => handleTaskAdd(section)}
                          >
                            Add Task
                          </Button>

                          <Button
                            size="sm"
                            variant="warning"
                            style={{
                              fontSize: "12px",
                              padding: "4px 10px",
                            }}
                            onClick={() => handleCancelTask(section)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </Collapse>
          </div>
        ))}
      </div>
    </>
  );
};

export default TrainingHome;
