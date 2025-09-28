import { apiReturnCallBack } from "./apiConfig";
import apiContainer from "./apiContainer";
import { Navigate } from "react-router-dom";
const user = apiContainer.user;

export async function getUser(request) {
  try {
    const response = await apiReturnCallBack("GET", user, request);
    const data = await response.json();
    if (!response.ok) {
      if (data.code === 401) {
        localStorage.clear();
        return <Navigate to="/login" replace />;
      }
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUser(request) {
  try {
    const response = await apiReturnCallBack("POST", user, request);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUser(request, userId) {
  try {
    const response = await apiReturnCallBack(
      "PUT",
      user + `/${userId}`,
      request
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await apiReturnCallBack("DELETE", user + `/${userId}`);
    if (!response.ok) {
      throw new Error(response.message || JSON.stringify(response));
    }
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
