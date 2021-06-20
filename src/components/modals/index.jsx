import { Button, Modal } from "react-bootstrap";
const EditAddModal = ({
  handleClose,
  show,
  details,
  setDetails,
  EditAddCategory,
}) => {
  const { type, name } = details;
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{type === "add" ? "Add" : "Edit"} Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            onChange={({ target: { value } }) =>
              setDetails({ ...details, name: value })
            }
            value={name}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={EditAddCategory}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditAddModal;
