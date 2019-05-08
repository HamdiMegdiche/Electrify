import axios from 'axios';
const api = axios.create({
  baseURL: `${process.env.REACT_APP_backend_url}/api/`
});
api.interceptors.request.use(function(config) {
  const token = localStorage.getItem("token");

  if ( token != null ) {
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
    config.headers = headers;
  }

  return config;
}, function (err) {
    console.log('Error connection to backend : '+err)
  return Promise.reject(err);
});

export default api ;
