import axios from "axios";
import { getGatewayUrl } from "../utils/Constants/AppConstants";
import API_ROUTES from "../config/apiRoutes";

export interface UserProfileData {
  userName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  clientId?: string;
  parentClientId?: string;
  corporateAdminFor?: string;
  roles?: string[];
  location?: string;
  [key: string]: unknown;
}

export const getLoggedInUserData = async (
  userdataToken: string,
  childClientId?: string | null,
) => {
  let url = `${getGatewayUrl()}${API_ROUTES.auth.getLoggedInUserRolesAccess}`;
  if (childClientId) {
    url += `?clientId=${childClientId}`;
  }

  const headers = {
    Authorization: `Bearer ${userdataToken}`,
  };

  return await axios
    .get(url, { headers })
    .then((res) => {
      return { res };
    })
    .catch((err) => {
      return err;
    });
};
