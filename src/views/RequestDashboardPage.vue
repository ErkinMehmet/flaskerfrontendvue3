<template>
  <div class="container mx-auto px-4">
    <!-- Form or Result Toggle -->
    <div v-if="!isSubmitted">
      <h1 class="text-2xl font-display text-royal-blue font-bold text-center mb-6">Submit SQL and Generate Chart</h1>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- SQL Input Textarea -->
        <textarea
          v-model="sqlQuery"
          placeholder="Enter your SQL query here"
          class="w-full p-4 border border-gray-300 rounded-md resize-none shadow-blue-glow focus:ring-2 focus:ring-royal-blue"
          rows="6"
        ></textarea>
        
        <!-- Chart Type Selector -->
        <select
          v-model="chartType"
          class="w-full p-4 border border-gray-300 rounded-md shadow-blue-glow focus:ring-2 focus:ring-royal-blue"
        >
          <option value="Heatmap">Heatmap</option>
          <option value="Density Contour">Density Contour</option>
          <option value="Mix">Mix</option>
          <option value="Hexagon">Hexagon</option>
        </select>
        
        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 bg-blue text-white rounded-md shadow-green-glow hover:bg-royal-blue hover:shadow-lg transition ease-in-out duration-300"
        >
          Generate Chart
        </button>
      </form>

      <!-- Display Error Message -->
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    </div>

    <!-- Result Section (Image and Back Button) -->
    <div v-if="isSubmitted">
      <h1 class="text-2xl font-display text-royal-blue font-bold text-center mb-6">Generated Chart</h1>
      <div v-if="image" class="mt-6">
        <img :src="image" alt="Generated Chart" class="mx-auto shadow-lg rounded-md" />
      </div>
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
      
      <!-- Back Button -->
      <button
        @click="goBack"
        class="mt-4 py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-600"
      >
        Back to Form
      </button>
    </div>
  </div>
</template>

<script>
import axios from '../axios'; 
import axios_local from 'axios'; 


export default {
  data() {
    return {
      sqlQuery: '',  // Default SQL query from file
      chartType: 'Heatmap', // Default chart type
      image: null,
      error: null,
      isSubmitted: false,  // Flag to toggle between form and result
    };
  },
  async created() {
    await this.loadDefaultSQL('Heatmap');
  },
  methods: {
      async loadDefaultSQL(chartType) {
      try {
        this.error = null; // Clear previous errors
        const sqlFile =
          chartType === 'Density Contour' ? '/src/assets/sql/DefaultQuery2.sql' : (chartType ==='Heatmap' ? '/src/assets/sql/DefaultQuery.sql':'/src/assets/sql/DefaultQuery3.sql');
        console.log(chartType)
        // Fetch SQL query from the file based on chartType
        const response = await axios_local.get(sqlFile);
        this.sqlQuery = response.data; // Set the default SQL query
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching SQL query:', err);
        this.error = 'Failed to load default SQL query.';
      }
    },
    async handleSubmit() {
      try {
        // Reset previous error or image
        this.error = null;
        this.image = null;
        const formData = new FormData();
        formData.append('sql', this.sqlQuery);
        formData.append('chartType', this.chartType);
        const response = await axios.post('/api/generate-chart', formData, {
          responseType: 'blob',
        });

        // Convert blob to object URL for display
        const blob = new Blob([response.data], { type: 'image/png' });
        this.image = URL.createObjectURL(blob);

        // Switch to result view
        this.isSubmitted = true;
      } catch (err) {
        this.error = err.response?.data?.error || 'An error occurred while generating the chart.';
        console.error(err);
      }
    },
    goBack() {
      // Reset the form and go back to the input
      this.isSubmitted = false;
      this.error = null;
      this.image = null;
    },
  },
  watch: {
    async chartType(newType) {
      // Load a different default query when the chart type changes
      await this.loadDefaultSQL(newType);
    },
  },
};
</script>