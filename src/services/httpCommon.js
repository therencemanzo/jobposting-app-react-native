import axios from "axios";
//https://5637-2a00-23ee-2860-41d9-a9a1-40e5-f1d7-1b4f.ngrok-free.app/api/v1/
//http:://127.0,0.1:8000/api/v1/
export default axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  headers: {
    "Content-type": "application/json"
  }
});