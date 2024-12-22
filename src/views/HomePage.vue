<template>
    <div id="app">
      <button @click="sendPostRequest">Send POST Request</button>
      <div v-if="responseData">
        <p>Response Data:</p>
        <pre>{{ responseData }}</pre>
      </div>
      <div v-if="error">
        <p>Error:</p>
        <pre>{{ error }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'App',
    data() {
      return {
        responseData: null,
        error: null
      };
    },
    methods: {
      sendPostRequest() {
        const data = {
          input_data: {
            paymenttypetitle: "Chèque",
            amount: 150.75,
            title: "MRC"
          }
        };
  
        axios.post('http://127.0.0.1:5000/dtpredict', data)
          .then(response => {
            this.responseData = response.data;
            console.log("Response data:", this.responseData);
          })
          .catch(err => {
            this.error = err.message || 'An error occurred';
            console.error("Error:", err);
          });
      }
    }
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  