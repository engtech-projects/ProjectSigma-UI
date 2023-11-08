<template>
  <form action="">
    <div class="font-bold">
      CAREER / PROFESSIONAL CREDENTIALS
    </div>
    <table class="w-full border-collapse border border-slate-400 table-fixed">
        <td colspan="4" class="border border-slate-300 p-2 bg-cyan-100">
          <div>
            <label for="small-input" class="inline text-[11px] w-32 font-medium text-gray-900 dark:text-white">ELIGIBILITY (You may also indicate all your TESDA certificates here)</label>
          </div>
        </td>

        <tbody>
          <tr v-for="(eligibility, index) in eligibilitys" :key="index">
            <td class="border border-slate-300 p-1">
              <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Program / Module</label>
              <div class="flex">
                <input type="text" v-model="eligibility.program" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
            </td>
            <td class="border border-slate-300 p-1">
              <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Certificate Level</label>
              <div class="flex">
                <input type="text" v-model="eligibility.level" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
            </td>
            <td class="border border-slate-300 p-1">
              <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Status</label>
              <div class="flex">
                <input type="text" v-model="eligibility.status" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
            </td>
            
            <td  class="border border-slate-300">
              <div class="p-1">
                <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Membership Expiration Date</label>
                <div class="flex justify-center">
                  <input type="date" id="inclusive_date" v-model="eligibility.ced" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <button class="delete-button" @click.prevent="deleteEligibility(index)" v-if="index > 0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-600"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
                  <button class="add-button " @click="addEligibility" v-if="index === eligibilitys.length - 1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-600 "><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <hr class="h-px my-4 bg-gray-300 border-0 dark:bg-gray-700">
      
      <table class="w-full border-collapse border border-slate-400 table-fixed">
        <td colspan="4" class="border border-slate-300 p-2 bg-cyan-100">
          <div>
            <label for="small-input" class="inline text-[11px] w-32 font-medium text-gray-900 dark:text-white">PROFESSIONAL AFFILATION/S</label>
          </div>
        </td>
        <tr v-for="(affiliation, index) in affiliations" :key="index">
            <td class="border border-slate-300 p-1">
              <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white ">Club/Organization's Name</label>
              <div class="flex">
                <input type="text" v-model="affiliation.name" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
            </td>
            <td class="border border-slate-300 p-1">
              <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Membership Type</label>
              <div class="flex">
                <input type="text" v-model="affiliation.type" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
            </td>
            <td class="border border-slate-300 p-1">
              <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Status</label>
              <div class="flex">
                <input type="text" v-model="affiliation.status" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
            </td>
            <td  class="border border-slate-300">
              <div class="p-1">
                <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Membership Expiration Date</label>
                <div class="flex justify-center">
                  <input type="date" id="inclusive_date" v-model="affiliation.med" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <button class="delete-button" @click.prevent="deleteAffiliation(index)" v-if="index > 0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-600"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
                  <button class="add-button " @click="addAffiliation" v-if="index === affiliations.length - 1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-600 "><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
                </div>
              </div>
            </td>
          </tr>
      </table>

      <hr class="h-px my-4 bg-gray-300 border-0 dark:bg-gray-700">
      
      <table class="w-full border-collapse border border-slate-400 table-fixed">
        <td colspan="4" class="border border-slate-300 p-2 bg-cyan-100">
          <div>
            <label for="small-input" class="inline text-[11px] w-32 font-medium text-gray-900 dark:text-white">SEMINARS / TRAININGS ATTENDED</label>
          </div>
        </td>
        <tr v-for="(training, index) in trainings" :key="index">
            <td class="border border-slate-300 p-1">
              <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Name/Title of Training/ Seminar</label>
              <div class="flex">
                <input type="text" v-model="training.title" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
            </td>
            <td class="border border-slate-300 p-1">
              <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Inclusive Dates</label>
              <div class="flex">
                <input type="text" v-model="training.dates" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
            </td>
            <td class="border border-slate-300 p-1">
              <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Venue</label>
              <div class="flex">
                <input type="number" min=0 v-model="training.venue" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
            </td>
            <td class="border border-slate-300 p-1">
              <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Training Provider</label>
              <div class="flex">
                <input type="number" min=0 v-model="training.provider" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                <button class="delete-button" @click.prevent="deleteTraining(index)" v-if="index > 0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-600"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
                  <button class="add-button " @click="addTraining" v-if="index === trainings.length - 1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-600 "><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
              </div>
            </td>

          </tr>
      </table>

  </form>
</template>

<script>
export default {
data() {
  return {
    eligibilitys: [{ program: '', level: '', status: '', ced: ''}],
    affiliations: [{ name: '', type: '', status: '', med: '', }],
    trainings: [{ title: '', dates: '', venue: '', provider: '', }],
  };
},
methods: {
  addEligibility() {
    this.eligibilitys.push({  program: '', level: '', status: '', ced: ''});
  },
  deleteEligibility(index) {
    this.eligibilitys.splice(index, 1);
  },

  addAffiliation() {
    this.affiliations.push({ name: '', type: '', status: '', med: '',  });
  },
  deleteAffiliation(index) {
    this.affiliations.splice(index, 1);
  },
  addTraining() {
    this.trainings.push({ title: '', dates: '', venue: '', provider: '', });
  },
  deleteTraining(index) {
    this.trainings.splice(index, 1);
  },
},
};
</script>