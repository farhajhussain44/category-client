import React, { useState, useRef } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Button, Form } from "react-bootstrap";
import EditAddModal from "../modals";
import {
  GetAllCategory,
  AddRootLvelCategory,
  getCurrentCategory,
  editCategory,
  deleteCategorySubCategory,
  createSubCategory,
} from "../../api";
import "./index.css";

const Category = () => {
  const [expand, setExpand] = useState(false);
  const initialState = {
    name: "",
  };

  const [data, setData] = useState(initialState);

  const [allCategory, setAllCategory] = useState([]);

  const GetAllCategoryData = async () => {
    try {
      const response = await GetAllCategory();
      const { status, data } = response;
      if (status) {
        const { allCategory } = data;
        setAllCategory(allCategory);
      }
    } catch (error) {
      return error;
    }
  };

  const AddRootCategory = async () => {
    try {
      const { name } = data;
      if (!name.trim()) {
        toast.error("Please add root category name.");
        return;
      }
      const response = await AddRootLvelCategory({ name });

      const { status } = response;
      if (status === 200) {
        GetAllCategoryData();
        setData(initialState);
        toast.success("Category added successfully ");
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    GetAllCategoryData();
  }, []);

  return (
    <div className="expand-page">
      <div className="expand-section">
        <div className="left-category">
          <Form.Group className="" controlId="formBasicEmail">
            <Form.Label>Root Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              onChange={({ target: { value } }) =>
                setData({ ...data, name: value })
              }
            />
          </Form.Group>
          <div className="add-category">
            <Button onClick={AddRootCategory}>Add Root Category</Button>
          </div>
        </div>
        <div className="right-category">
          <div className="expand-close" onClick={() => setExpand(!expand)}>
            <h6>{!expand ? "Expand all" : "collapse all"}</h6>
          </div>

          <div className="added-category">
            <ul>
              {allCategory &&
                allCategory.map((el, i) => {
                  return (
                    <Categorydata
                      item={el}
                      index={i}
                      GetAllCategoryData={GetAllCategoryData}
                      expand={expand}
                    />
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Category;

const Categorydata = ({ item, GetAllCategoryData }) => {
  const [data, setData] = useState();

  const [show, setShow] = useState(false);

  const initialState = {
    name: "",
    type: "",
    id: "",
    isRightOpen: false,
  };

  const [details, setDetails] = useState(initialState);
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setDetails({ ...details, isRightOpen: false });
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, details]);
  };
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef);

  const loadItem = async (id) => {
    const response = await getCurrentCategory(id);

    const { status, data } = response;
    if (status === 200) {
      const {
        currentCategory: { subs },
      } = data;
      setData(subs);
    }
  };

  const openMenus = (id) => {
    setDetails({ ...details, id, isRightOpen: true });
  };

  const onClick = data ? () => setData(null) : () => loadItem(item._id);

  const handleClose = (type, value) => {
    if (type === "open") {
      if (value === "edit") {
        setDetails({ ...details, type: value, name: item.name });
      } else {
        setDetails({ ...details, type: value });
      }
    } else {
      setDetails(initialState);
    }
    setShow(!show);
  };

  const EditAddCategory = async () => {
    try {
      const { id, name, type } = details;
      if (!name.trim()) {
        toast.error("Please add sub category name.");
        return;
      }
      if (type === "edit") {
        const response = await editCategory(id, { name });
        const { status } = response;
        if (status === 200) {
          GetAllCategoryData();
          handleClose();
          toast.success("Edited");
        }
      } else if (type === "add") {
        const response = await createSubCategory({ _id: id, name });
        const { status } = response;
        if (status === 200) {
          handleClose();
          toast.success("Added");
        }
      }
    } catch (e) {
      return;
    }
  };
  const DeleteSub = async (id) => {
    try {
      const response = await deleteCategorySubCategory(id);
      const { status } = response;
      if (status === 200) {
        toast.success("deleted");
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="category">
      <EditAddModal
        show={show}
        handleClose={handleClose}
        details={details}
        setDetails={setDetails}
        EditAddCategory={EditAddCategory}
      />

      {details.isRightOpen && (
        <div className="menu" ref={wrapperRef}>
          <h6 onClick={() => handleClose("open", "edit")}> Edit</h6>
          <h6 onClick={() => handleClose("open", "add")}>Add sub category</h6>
          <h6 onClick={() => DeleteSub(details.id)}> Delete</h6>
        </div>
      )}

      <div
        className={`category-name ${"data" ? "open" : ""}`}
        onClick={() => onClick(item._id)}
        onContextMenu={(e) => {
          openMenus(item._id);
          e.preventDefault();
        }}
      >
        {item.name}
      </div>
      {data && (
        <ul>
          {data.map((child, i) => (
            <li key={i}>
              <Node item={child} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Segment = ({ item: { name } }) => <div className="segment">{name}</div>;

const Node = ({ item }) => {
  const Cmp = item.type ? Categorydata : Segment;
  return <Cmp item={item} />;
};
