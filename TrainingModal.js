import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  Calendar,
  CardChecklist,
  People,
  List,
  PersonVideo3,
  PersonWorkspace,
} from "react-bootstrap-icons";
import TrainingCalendar from "./TrainingCalendar";
import TrainingHome from "./TrainingHome";
import ManageResources from "./ManageResources";
import ManageSchedules from "./ManageSchedules";

const TrainingModal = ({ show, onHide }) => {
  const [view, setView] = useState("Home");

  // Handle button clicks to change the view
  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Handle section toggle

  const [tiles, setTiles] = useState([
    {
      title: "Training Calendar",
      description: "View and access all classes in a grid view.",
      icon: <Calendar size={32} />,
    },
    {
      title: "View Schedules",
      description: "View and edit schedules.",
      icon: <CardChecklist size={32} />,
    },
    {
      title: "Manage Resources",
      description: "Manage training resources.",
      icon: <People size={32} />,
    },
  ]);

  const [sidebarButtons, setSidebarButtons] = useState([
    "Home",
    "Training Calendar",
    "View Schedules",
    "Manage Resources",
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddTile = (newTile) => {
    setTiles((prevTiles) => [...prevTiles, newTile]);
    setSidebarButtons((prevButtons) => [...prevButtons, newTile.title]);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      className="custom-fullscreen-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Training System</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            {/* Left Sidebar */}
            <div
              className="col-md-2 sidebar"
              style={{ backgroundColor: "transparent" }}
            >
              <div className="d-flex flex-column">
                {sidebarButtons.map((btn, index) => (
                  <Button
                    key={index}
                    className="sidebar-btn"
                    style={{
                      height: "80px",
                      width: "210px",
                      border: "1px solid #FF007F",
                      margin: "0",
                      borderRadius: "2px",
                      fontSize: "0.9em",
                    }}
                    onClick={() => handleViewChange(btn)}
                  >
                    {btn}
                  </Button>
                ))}
              </div>
            </div>
            <>
              {view === "Training Calendar" ? (
                <TrainingCalendar />
              ) : view === "View Schedules" ? (
                <div className="col-md-10 main-content">
                  <ManageSchedules />
                </div>
              ) : view === "Manage Resources" ? (
                <div className="col-md-10 main-content">
                  <ManageResources />
                </div>
              ) : view === "Home" ? (
                <TrainingHome
                  setShowAddModal={(value) => setShowAddModal(value)}
                  tiles={tiles}
                  handleViewChange={(title) => handleViewChange(title)}
                />
              ) : (
                <div className="col-md-10 main-content">
                  <h2>Custom Tile Content</h2>
                  {/* Insert Custom Content */}
                </div>
              )}
            </>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>

      <AddTileModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        addTile={handleAddTile}
      />
    </Modal>
  );
};

const AddTileModal = ({ show, handleClose, addTile }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Calendar");

  const iconOptions = {
    Calendar: <Calendar size={32} />,
    CardChecklist: <CardChecklist size={32} />,
    People: <People size={32} />,
    List: <List size={32} />,
    PersonVideo3: <PersonVideo3 size={32} />,
    PersonWorkSpace: <PersonWorkspace size={32} />,
  };

  const handleSave = () => {
    if (title && description) {
      const newTile = {
        title: title.substring(0, 50), // Limit title to 50 characters
        description: description.substring(0, 100), // Limit description to 100 characters
        icon: iconOptions[selectedIcon], // Use selected icon
      };
      addTile(newTile); // Add the new tile to the main component
      handleClose(); // Close the modal after saving
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Tile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="tileTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tile title (max 50 characters)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
              required
            />
          </Form.Group>
          <Form.Group controlId="tileDescription" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description (max 100 characters)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={100}
              required
            />
          </Form.Group>
          <Form.Group controlId="iconSelection" className="mt-3">
            <Form.Label>Select Icon</Form.Label>
            <Form.Control
              as="select"
              value={selectedIcon}
              onChange={(e) => setSelectedIcon(e.target.value)}
            >
              <option value="Calendar">Calendar</option>
              <option value="CardChecklist">Card Checklist</option>
              <option value="People">People</option>
              <option value="List">List</option>
              <option value="PersonVideo3">Person In Video</option>
              <option value="PersonWorkSpace">Person In Workspace</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Tile
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TrainingModal;
