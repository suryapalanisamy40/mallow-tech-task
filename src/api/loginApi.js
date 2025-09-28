import { apiReturnCallBack } from "./apiConfig";
import apiContainer from "./apiContainer";
const authLogin = apiContainer.authLogin;

export async function getLogin(request) {
  try {
    const response = await apiReturnCallBack("POST", authLogin, request);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
