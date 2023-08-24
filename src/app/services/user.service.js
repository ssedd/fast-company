import httpService from "./http.service";

const userEndpoint = "user/";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    console.log(data.content);
    return data;
  }
};

export default userService;
