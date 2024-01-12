import { defineStore } from 'pinia';
const config = useRuntimeConfig()

export const useHMOStore = defineStore('hmo', {
  state: () => ({
    isEdit: false,
    hmo: {
      hmo_id: null,
      hmo_name: null,
      employee: null,
      employee_share: null,
    },
    list: [],
      getParams: {},
      errorMessage: "",
      successMessage: "",
  }),
  // actions: {
  //   addHMO(newHMO: HMO) {
  //     this.hmoList.push(newHMO);
  //     console.log('HMO List after adding:', this.hmoList);
  //   },
  //   deleteHMO(val: HMO) {
  //     const index = this.hmoList.indexOf(val);
  //     this.hmoList.splice(index, 1);
  //   },
  //   editHMO(val: HMO) {
  //     this.editingItem = { ...val };
  //   },
  //   submitEdit() {
  //     const item = this.hmoList.find((item) => item.id === this.editingItem.id);
  //     if (item) {
  //       item.employee = this.editingItem.employee;
  //       item.employee_share = this.editingItem.employee_share;
  //     }
  //     this.clearEditingItem();
  //   },
  //   submitAdd() {
  //     const newHMO = { ...this.addItem, id: this.hmoList.length };
  //     this.addHMO(newHMO);
  //     this.clearAddItem();
  //   },
  //   clearEditingItem() {
  //     this.editingItem = { employee: '', employee_share: '', id: 0 };
  //   },
  //   clearAddItem() {
  //     this.addItem = { hmo_name: '', employee: '', employee_share: '', id: 0 };
  //   },
  // },
  actions: {
    async getHmo () {
      const { data, error } = await useFetch(
          "/api/departments",
          {
              baseURL: config.public.HRMS_API_URL,
              method: "GET",
              // headers: {
              //     Authorization: token.value + ""
              // },
              params: this.getParams,
          }
      )
      if (data.value) {
          this.list = data.value
          return data
      } else if (error.value) {
          return error
      }
    },

    async createHmo () {
      this.successMessage = ""
      this.errorMessage = ""
      const { data, error } = await useFetch(
          "/api/departments",
          {
              baseURL: config.public.HRMS_API_URL,
              method: "POST",
              // headers: {
              //     Authorization: token.value + ""
              // },
              body: this.department,
              watch: false,
          }
      )
      if (data.value) {
          this.getHmo()
          this.reset()
          this.successMessage = data.value.message
          return data
      } else if (error.value) {
          this.errorMessage = error.value.data.message
          return error
      }
    },
    async editHmo () {
      this.successMessage = ""
      this.errorMessage = ""
      const { data, error } = await useFetch(
          "/api/department/" + this.department.id,
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
          this.getHmo()
          return data
      } else if (error.value) {
          this.errorMessage = error.value.data.message
          return error
      }
    },
    async deleteHmo (id : number) {
      const { data, error } = await useFetch(
          "/api/department/" + id,
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
          this.getHmo()
          return data
      } else if (error.value) {
          return error
      }
    },

    reset () {
      this.hmo = {
          hmo_id: null,
          name: null,
      }
      this.isEdit = false
      this.successMessage = ""
      this.errorMessage = ""
    },
    
  },
});
