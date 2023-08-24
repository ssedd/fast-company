import httpService from "./http.service";

const userEndpoint = "user/";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },
  create: async (payload) => {
    console.log("user.service payload", payload);
    const { data } = await httpService.put(userEndpoint + payload._id, payload);
    console.log("user.service data", data);
    return data;
  }
};

export default userService;
