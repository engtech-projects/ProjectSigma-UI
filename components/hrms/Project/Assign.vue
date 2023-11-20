<template>
  <div class="border-2 p-2 rounded-lg shadow w-full  mb-4 ">
    <div>
      <h2>Assign Employee to Project</h2>
        <form @submit.prevent="assignEmployeeToProject">
          <!-- Project and employee selection fields go here -->
          <label>Select Employee:</label>
          <select v-model="selectedEmployee">
            <!-- Populate this dropdown with employees from your API -->
            <option v-for="employee in employees" :key="employee.id" :value="employee.id">{{ employee.name }}</option>
          </select>

          <label>Select Project:</label>
          <select v-model="selectedProject">
            <!-- Populate this dropdown with projects from your API -->
            <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
          </select>

          <button type="submit">Assign Employee</button>
        </form>
  </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      selectedEmployee: null,
      selectedProject: null,
      // You need to fetch the employee and project data from your API
      employees: [], // Populate this array with employees from your API
      projects: [], // Populate this array with projects from your API
    };
  },
  methods: {
    assignEmployeeToProject() {
      // Make an API request to assign an employee to a project
      // Example: Assume you have an API endpoint '/api/assignEmployeeToProject'
      const data = {
        employeeId: this.selectedEmployee,
        projectId: this.selectedProject,
      };

      this.$axios.post('/api/assignEmployeeToProject', data)
        .then(response => {
          console.log('Employee assigned to project successfully:', response.data);
          // Reset the form or perform other actions as needed
        })
        .catch(error => {
          console.error('Error assigning employee to project:', error);
          // Handle errors and display a message to the user
        });
    },
  },
};
</script>
