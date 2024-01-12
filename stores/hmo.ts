// src/stores/hmo.ts
import { defineStore } from 'pinia';

interface HMO {
  hmo_name: string;
  employee: string;
  employee_share: string;
}

export const useHMOStore = defineStore('hmo', {
  state: () => ({
    hmoList: [] as HMO[],
    editingItem: {
      employee: '',
      employee_share: '',
      id: 0,
    } as HMO,
    addItem: {
      hmo_name: '',
      employee: '',
      employee_share: '',
      id: 0,
    } as HMO,
  }),
  actions: {
    addHMO(newHMO: HMO) {
      this.hmoList.push(newHMO);
      console.log('HMO List after adding:', this.hmoList);
    },
    deleteHMO(val: HMO) {
      const index = this.hmoList.indexOf(val);
      this.hmoList.splice(index, 1);
    },
    editHMO(val: HMO) {
      this.editingItem = { ...val };
    },
    submitEdit() {
      const item = this.hmoList.find((item) => item.id === this.editingItem.id);
      if (item) {
        item.employee = this.editingItem.employee;
        item.employee_share = this.editingItem.employee_share;
      }
      this.clearEditingItem();
    },
    submitAdd() {
      const newHMO = { ...this.addItem, id: this.hmoList.length };
      this.addHMO(newHMO);
      this.clearAddItem();
    },
    clearEditingItem() {
      this.editingItem = { employee: '', employee_share: '', id: 0 };
    },
    clearAddItem() {
      this.addItem = { hmo_name: '', employee: '', employee_share: '', id: 0 };
    },
  },
});
