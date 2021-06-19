import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./index.css";

const Category = () => {
  const [openMenu, setOpenMenu] = useState();
  const handleMenu = () => {
    setOpenMenu(!openMenu);
    return;
  };
  return (
    <div className="expand-page">
      <div className="expand-section">
        {/* <h6>Categories</h6> */}

        <div className="left-category">
          <Form.Group className="" controlId="formBasicEmail">
            <Form.Label>Category Name</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
          <div className="add-category">
            <Button type="submit">Add Root Category</Button>
          </div>
          <div className="select-category">
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control as="select">
                <option>Category</option>
                <option>Category 2</option>
                <option>Category 3</option>
                <option>Category 4</option>
                <option>Category 5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="" controlId="formBasicEmail">
              <Form.Label>Sub Category Name</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
            <div className="add-category">
              <Button type="submit">Add Sub Category</Button>
            </div>
          </div>
        </div>
        <div className="right-category">
          <div className="expand-close">
            <h6>Collapse All</h6>
            <h6>Expand all</h6>
          </div>

          <div className="added-category">
            <ul>
              <li onContextMenu={handleMenu}>
                <i class="fa fa-minus-square" aria-hidden="true"></i> Default
                Category 0
                {openMenu && (
                  <div className="menu">
                    <h6>Edit</h6>
                    <h6>Delete</h6>
                  </div>
                )}
                <ul className="sub-category">
                  <li>
                    <i class="fa fa-minus-square" aria-hidden="true"></i>{" "}
                    Default Category 1
                    <ul className="sub-category">
                      <li>
                        <i class="fa fa-minus-square" aria-hidden="true"></i>{" "}
                        Default Category 1
                      </li>
                      <li>
                        <i class="fa fa-minus-square" aria-hidden="true"></i>{" "}
                        Default Category 1
                      </li>
                      <li>
                        <i class="fa fa-minus-square" aria-hidden="true"></i>{" "}
                        Default Category 1
                      </li>
                    </ul>
                  </li>
                  <li>
                    <i class="fa fa-minus-square" aria-hidden="true"></i>{" "}
                    Default Category 1
                  </li>
                  <li>
                    <i class="fa fa-minus-square" aria-hidden="true"></i>{" "}
                    Default Category 1
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Category;
