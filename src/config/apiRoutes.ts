// API Routes configuration
export interface API_ROUTES {
  auth: {
    getLoggedInUserRolesAccess: string;
  };
  user: {
    tour: string;
    profile: string;
    policies: string;
    claims: string;
  };
}

const API_ROUTES: API_ROUTES = {
  auth: {
    getLoggedInUserRolesAccess: "/getLoggedInUserRolesAccess",
  },
  user: {
    tour: "/user/tour",
    profile: "/user/profile",
    policies: "/user/policies",
    claims: "/user/claims",
  },
};

export default API_ROUTES;
