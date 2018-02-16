import axios from 'axios';

// Add a request interceptor.
axios.interceptors.request.use(function (config) {
    console.log("Request interceptor");
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor.
axios.interceptors.response.use(function (response) {
    console.log("Response interceptor");
    // Do something with response data.
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
  