import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";

const skills = [
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

const initialFacilitators = [
  { id: 1, name: "John Doe", skills: Array(10).fill(false), onboarding: false },
  {
    id: 2,
    name: "Jane Smith",
    skills: Array(10).fill(false),
    onboarding: false,
  },
  { id: 3, name: "Alex Brown", skills: Array(10).fill(true), onboarding: true },
];

const ManageResources = () => {
  const [facilitators, setFacilitators] = useState(initialFacilitators);
  const [editingNameId, setEditingNameId] = useState(null); // Track which name is being edited
  const [newFacilitator, setNewFacilitator] = useState({
    name: "",
    skills: Array(10).fill(false),
    onboarding: false,
  });
  const [confirmDelete, setConfirmDelete] = useState(null); // Track which row is being deleted
  const [showAddNewFacilitatorRow, setShowAddNewFacilitatorRow] =
    useState(false);

  const addMoreFacilitators = () => {
    setShowAddNewFacilitatorRow(true);
  };

  // Handle skill switch toggle
  const handleSkillToggle = (id, index) => {
    setFacilitators((prev) =>
      prev.map((fac) =>
        fac.id === id
          ? { ...fac, skills: fac.skills.map((s, i) => (i === index ? !s : s)) }
          : fac
      )
    );
  };

  // Handle onboarding toggle
  const handleOnboardingToggle = (id) => {
    setFacilitators((prev) =>
      prev.map((fac) =>
        fac.id === id ? { ...fac, onboarding: !fac.onboarding } : fac
      )
    );
  };

  // Handle name click (edit)
  const handleNameClick = (id) => {
    setEditingNameId(id);
  };

  // Handle name change
  const handleNameChange = (id, newName) => {
    setFacilitators((prev) =>
      prev.map((fac) => (fac.id === id ? { ...fac, name: newName } : fac))
    );
    setEditingNameId(null); // Save and exit edit mode
  };

  // Handle new facilitator addition
  const handleAddNew = () => {
    const nextId = facilitators.length
      ? facilitators[facilitators.length - 1].id + 1
      : 1;
    setFacilitators((prev) => [...prev, { id: nextId, ...newFacilitator }]);
    setNewFacilitator({
      name: "",
      skills: Array(10).fill(false),
      onboarding: false,
    });
    setShowAddNewFacilitatorRow(false);
  };

  // Handle delete facilitator
  const handleDelete = (id) => {
    setFacilitators((prev) => prev.filter((fac) => fac.id !== id));
    setConfirmDelete(null); // Reset confirm delete state
  };

  return (
    <div className="manage-resources">
      <h2>Manage Resources</h2>
      <Table bordered hover responsive size="sm" style={{ fontSize: "0.9em" }}>
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Name</th>
            {skills.map((skill, index) => (
              <th key={index}>{skill}</th>
            ))}
            <th>Onboarding</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {facilitators.map((facilitator) => (
            <tr key={facilitator.id}>
              <td>
                {editingNameId === facilitator.id ? (
                  <Form.Control
                    type="text"
                    defaultValue={facilitator.name}
                    onBlur={(e) =>
                      handleNameChange(facilitator.id, e.target.value)
                    }
                  />
                ) : (
                  <span onClick={() => handleNameClick(facilitator.id)}>
                    {facilitator.name}
                    <small className="text-muted"> (click to edit)</small>
                  </span>
                )}
              </td>
              {facilitator.skills.map((hasSkill, index) => (
                <td key={index}>
                  <Form.Check
                    type="switch"
                    checked={hasSkill}
                    onChange={() => handleSkillToggle(facilitator.id, index)}
                  />
                </td>
              ))}
              <td>
                <Form.Check
                  type="switch"
                  checked={facilitator.onboarding}
                  onChange={() => handleOnboardingToggle(facilitator.id)}
                />
              </td>
              <td>
                {confirmDelete === facilitator.id ? (
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleDelete(facilitator.id)}
                    >
                      Confirm
                    </Button>{" "}
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => setConfirmDelete(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setConfirmDelete(facilitator.id)}
                  >
                    X
                  </Button>
                )}
              </td>
            </tr>
          ))}
          {/* New facilitator row */}
          {showAddNewFacilitatorRow && (
            <tr>
              <td colSpan={5}>
                <Form.Control
                  type="text"
                  placeholder="Add new facilitator..."
                  value={newFacilitator.name}
                  onChange={(e) =>
                    setNewFacilitator((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  onBlur={handleAddNew}
                />
              </td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => setShowAddNewFacilitatorRow(false)}
                >
                  Cancel
                </Button>
              </td>
              <td colSpan={20}></td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button variant="primary" onClick={addMoreFacilitators} className="mt-3">
        Add
      </Button>
    </div>
  );
};

export default ManageResources;
