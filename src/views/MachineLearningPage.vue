<template>
  <div class="container mx-auto px-4">
    <!-- Form or Result Toggle -->
    <div v-if="!isSubmitted">
      <h1 class="text-2xl font-display text-royal-blue font-bold text-center mb-6">Clustering and Data Download</h1>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        
        <!-- Clustering Algorithm -->
        <select
          v-model="formData.algorithme"
          class="w-full p-4 border border-gray-300 rounded-md shadow-blue-glow focus:ring-2 focus:ring-royal-blue"
        >
          <option value="K-Means">K-Means</option>
          <option value="DBSCAN">DBSCAN</option>
        </select>

        <!-- Measure -->
        <select
          v-model="formData.mesure"
          class="w-full p-4 border border-gray-300 rounded-md shadow-blue-glow focus:ring-2 focus:ring-royal-blue"
        >
          <option value="Silhouette">Silhouette</option>
          <option value="Inertie">Inertie</option>
          <option value="Indice de Dunn">Indice de Dunn</option>
        </select>

        <!-- Category Columns -->
        <input
          v-model="formData.categoriesColumns"
          placeholder="Enter category columns"
          class="w-full p-4 border border-gray-300 rounded-md shadow-blue-glow focus:ring-2 focus:ring-royal-blue"
        />

        <!-- Numerical Columns -->
        <input
          v-model="formData.numericalColumns"
          placeholder="Enter numerical columns"
          class="w-full p-4 border border-gray-300 rounded-md shadow-blue-glow focus:ring-2 focus:ring-royal-blue"
        />

        <!-- SQL Query -->
        <textarea
          v-model="formData.sqlQuery"
          placeholder="Enter your SQL query here"
          class="w-full p-4 border border-gray-300 rounded-md resize-none shadow-blue-glow focus:ring-2 focus:ring-royal-blue"
          rows="6"
        ></textarea>

        <!-- Random State -->
        <input
          v-model="formData.randomState"
          type="number"
          placeholder="Enter random state"
          class="w-full p-4 border border-gray-300 rounded-md shadow-blue-glow focus:ring-2 focus:ring-royal-blue"
        />

        <!-- Number of Clusters -->
        <input
          v-model="formData.nombreClusters"
          type="number"
          placeholder="Enter number of clusters"
          class="w-full p-4 border border-gray-300 rounded-md shadow-blue-glow focus:ring-2 focus:ring-royal-blue"
        />

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 bg-blue text-white rounded-md shadow-green-glow hover:bg-royal-blue hover:shadow-lg transition ease-in-out duration-300"
        >
          Generate and Download Excel
        </button>
      </form>

      <!-- Display Error Message -->
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    </div>

    <!-- Result Section (Download Button) -->
    <div v-if="isSubmitted">
      <h1 class="text-2xl font-display text-royal-blue font-bold text-center mb-6">Download Clustering Results</h1>
      
    <!-- Display download link -->
<a
  v-if="fileUrl"
  :href="fileUrl"
  download="clustering_results.xlsx"
  class="py-3 px-6 bg-green text-white rounded-md shadow-lg hover:bg-lime-green transition ease-in-out duration-300"
>
  Download Excel File
</a>

<p v-if="error" class="text-red-500 mt-4">{{ error }}</p>

<!-- Back Button -->
<button
  @click="goBack"
  class="mt-4 py-2 px-4 bg-dark-blue text-white rounded-md hover:bg-midnight-blue transition ease-in-out duration-300"
>
  Back to Form
</button>
    </div>
  </div>
</template>

<script>
import axios from '../axios'; 
import axios_local from 'axios'; 
import * as XLSX from 'xlsx'; 

export default {
  data() {
    return {
      query:null,
      formData: {
        algorithme: 'K-Means',
        mesure: 'Silhouette',
        categoriesColumns: 'autopayment',
        numericalColumns: 'operatingbudget,days_diff,paycount,paysum,articlecount,jobcount,coursecount,eventcount',
        sqlQuery: '',
        randomState: 42,
        nombreClusters: 3,
      },
      fileUrl: null,
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
        this.formData.sqlQuery=response.data; // Set the default SQL query
      } catch (err) {
        console.error('Error fetching SQL query:', err);
        this.error = 'Failed to load default SQL query.';
      }
    },
    async handleSubmit() {
      try {
        // Reset previous error or file URL
        this.error = null;
        this.fileUrl = null;

        // Send the form data via Axios
        const response = await axios.post('/api/clustering', this.formData);
        const { data, measure } = response.data;
        console.log(measure)
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Clustering Results');
        const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelFile], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Create file URL for download
        this.fileUrl = URL.createObjectURL(blob);
        this.isSubmitted = true;
      } catch (err) {
        this.error = err.response?.data?.error || 'An error occurred while processing the clustering.';
        console.error(err);
      }
    },
    goBack() {
      // Reset the form and go back to the input
      this.isSubmitted = false;
      this.error = null;
      this.fileUrl = null;
    },
  },
};
</script>
