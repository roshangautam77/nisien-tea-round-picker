import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://0.0.0.0:8794/v1", // Base URL for the API endpoints
});

export default httpClient;