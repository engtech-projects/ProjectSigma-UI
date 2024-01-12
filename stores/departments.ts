import { defineStore } from 'pinia';
// const { token } = useAuth()
const config = useRuntimeConfig()

export const useDepartmentStore = defineStore('departments', {
  state: () => ({
    isEdit: false,
    department:
    {
      department_id: null,
      department_name: null,
    },
    list: [],
    getParams: {},
    errorMessage: "",
    successMessage: "",
  }),
  actions: {
    async getDepartment () {
      const { data, error } = await useFetch(
          "/api/departments",
          {
              baseURL: '192.168.1.222:8000',
              method: "GET",
              // headers: {
              //     Authorization: token.value + ""
              // },
              params: this.getParams,
          }
      )
      if (data.value) {
          this.list = data.value.data
          return data
      } else if (error.value) {
          return error
      }
    },

    async createDepartment () {
      this.successMessage = ""
      this.errorMessage = ""
      console.log("this is the input:",this.department)
      const { data, error } = await useFetch(
          "/api/departments",
          {
              baseURL: '192.168.1.222:8000',
              method: "POST",
              // headers: {
              //     Authorization: token.value + ""
              // },
              body: this.department,
              watch: false,
          }
      )
      if (data.value) {
          this.getDepartment()
          this.reset()
          this.successMessage = data.value.message
          return data
      } else if (error.value) {
          this.errorMessage = error.value.data.message
          return error
      }
    },
    async editDepartmentName () {
      this.successMessage = ""
      this.errorMessage = ""
      const { data, error } = await useFetch(
          "/api/department/" + this.department.department_id,
          {
              baseURL: config.public.HRMS_API_URL,
              method: "PATCH",
              // headers: {
              //     Authorization: token.value + ""
              // },
              body: this.department,
              watch: false,
          }
      )
      if (data.value) {
          this.successMessage = data.value.message
          this.getDepartment()
          return data
      } else if (error.value) {
          this.errorMessage = error.value.data.message
          return error
      }
    },
    async deleteDepartment (department_id : number) {
      const { data, error } = await useFetch(
          "/api/department/" + department_id,
          {
              baseURL: config.public.HRMS_API_URL,
              method: "DELETE",
              // headers: {
              //     Authorization: token.value + ""
              // },
              watch: false,
          }
      )
      if (data.value) {
          this.getDepartment()
          return data
      } else if (error.value) {
          return error
      }
    },

    reset () {
      this.department = {
          department_id: null,
          department_name: null,
      }
      this.isEdit = false
      this.successMessage = ""
      this.errorMessage = ""
    },
    
  },
});
