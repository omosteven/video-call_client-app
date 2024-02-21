const baseUrl = "https://anonymous-chat-server.vercel.app/api/v1";
export const socketBaseUrl = "https://anonymous-chat-server.vercel.app";

export const apiUrls = {
  authenticate: `${baseUrl}/authenticate`,
  profileUpdate: `${baseUrl}/user/update`,
  startNewChat: `${baseUrl}/user/random`,
};

export const apiQueryMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};
