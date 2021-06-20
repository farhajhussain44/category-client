import { treeInstance } from "../axiso";

export const GetAllCategory = async () => {
  const response = await treeInstance.get("/getAllCategory");
  return response;
};

export const AddRootLvelCategory = async (payload) => {
  const response = await treeInstance.post("/createRootCategory", payload);
  return response;
};
export const getCurrentCategory = async (id) => {
  const response = await treeInstance.get(`/getCurentCategory/${id}`);
  return response;
};

export const editCategory = async (id, payload) => {
  const response = await treeInstance.patch(`/editCategory/${id}`, payload);
  return response;
};

export const deleteCategorySubCategory = async (id) => {
  const response = await treeInstance.delete(
    `/deleteCategorySubCategory/${id}`
  );
  return response;
};

export const createSubCategory = async (payload) => {
  const response = await treeInstance.post(`/createSubCategory`, payload);
  return response;
};
