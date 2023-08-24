import httpService from "./http.service";

const qualitiesEndpoint = "quality/";

const qualitiesService = {
  get: async () => {
    const { data } = await httpService.get(qualitiesEndpoint);
    // console.log("quality", data.content);
    return data;
  }
};

export default qualitiesService;
