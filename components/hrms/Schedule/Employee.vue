
import { SearchBar } from '#build/components';
<script lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const datePicker = ref();

const handleSubmit = () => {
  // Logic to handle form submission
  console.log('Form submitted');
};

const handleReset = () => {
  // Logic to handle form reset
  console.log('Form reset');
};


export default {
    components: {
    FullCalendar,
    VueDatePicker
    },
    data() {
    return {
        calendarOptions: {
            plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
            },
            initialView: 'dayGridMonth',
            weekends: true,
            nowIndicator: true,
            editable: true,
            selectable: true,
            initialEvents: [
                { title: 'nice event', start: new Date()}
            ],
            dateClick: (info) => {
                alert('clicked ' + info.dateStr);
            },
            select: (info) => {
                alert('selected ' + info.startStr + ' to ' + info.endStr);
            },
            
        },
        newEvent: {
        title: '',
        eventType: '',
        description: '',
      },
    }
    },
    
}
</script>


<template>
    <div class="md:flex gap-4">
      <div class="w-full md:w-1/2 justify-start border border-teal-100 shadow-md rounded-lg mt-5 ">
        
          <div class="p-4">

            <SearchBar class="mb-5"/>

            <select id="schedule" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                <option value="" disabled selected>-- SELECT --</option>
                <option value="hr">Human Resources Department</option>
                <option value="accounting">Accounting Department</option>
                <option value="finance">Finance Department</option>
                <option value="it">Information Support Department</option>
                <option value="do">Directors Office</option>
            </select>

          </div>

          <div class="p-4">

            <details class="group p-2 rounded-lg bg-slate-50 " open>
              <summary
                class="flex cursor-pointer list-none items-center justify-between text-lg font-medium text-gray-900 bg-teal-100 rounded-sm">
                <label for="" class="text-lg font-medium p-2">Set Employee Schedule</label>
        
                <div class="text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="black"
                    class="block h-5 w-5 transition-all duration-300 group-open:rotate-180 m-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      :class="{ 'rotate-180': isOpen2 }"
                    />
                  </svg>
                </div>
              </summary>

              <div class="pb-2 text-black text-md font-medium border border-slate-100 rounded-b-lg p-3">
                <form  @submit.prevent="handleSubmit" @reset="handleReset">

                  <div >
                    <div class="border-b w-full h-[14px] text-center p-3 mt-4 mb-2">
                      <span class="text-sm bg-gray-50 text-black px-10 italic">
                          Schedule Type
                        </span>
                      </div>
                  </div>
                  <div class=" mb-4 dark:border-gray-700">
                      <ul class="flex flex-wrap justify-center -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                          <li class="mr-2" role="presentation">
                              <button class="inline-block p-4 border-b-2 rounded-t-lg" id="regular-tab" data-tabs-target="#regular" type="button" role="tab" aria-controls="regular" aria-selected="false">Regular</button>
                          </li>
                          <li class="mr-2" role="presentation">
                              <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="irregular-tab" data-tabs-target="#irregular" type="button" role="tab" aria-controls="irregular" aria-selected="false">Irregular</button>
                          </li>
                      </ul>

                      <div class="flex md:flex justify-center mx-auto">
                        <div class="p-2  gap-4 items-center">
                          <label for="eventTitleIn" class="block text-xs text-center italic">Time In</label>
                          <input type="time" id="eventTitleIn" name="eventTitleIn" class="w-36 md:w-32 rounded-lg" />
                        </div>
                        <div class="p-2  gap-4 items-center">
                          <label for="eventTitleOut" class="block text-xs text-center italic">Time Out</label>
                          <input type="time" id="eventTitleOut" name="eventTitleOut" class="w-36 md:w-32 rounded-lg"/>
                        </div>
                      </div>
                  </div>
                  <div id="default-tab-content">
                      <div class=" p-1 rounded-lg bg-gray-50 dark:bg-gray-800" id="regular" role="tabpanel" aria-labelledby="regular-tab">
                        <div class="border-b w-full h-[14px] text-center p-3 mb-2">
                          <span class="text-sm bg-slate-50 text-black px-10 italic">
                            Schedule Days
                          </span>
                        </div>
                        
                          <div class="grid grid-cols-3 gap-y-2 md:flex-1 mx-auto justify-center items-center mt-5 md:gap-4 p-2 rounded-md">
                            <div class="flex">
                              <input id="monday" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                              <label for="monday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Monday</label>
                            </div>
                            <div class="flex">
                              <input id="tuesday" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                              <label for="tuesday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tuesday</label>
                            </div>
                            <div class="flex">
                              <input id="wednesday" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                              <label for="wednesday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Wednesday</label>
                            </div>
                            <div class="flex">
                              <input id="thursday" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                              <label for="thursday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Thursday</label>
                            </div>
                            <div class="flex">
                              <input id="friday" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                              <label for="friday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Friday</label>
                            </div>
                            <div class="flex">
                              <input id="saturday" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                              <label for="saturday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Saturday</label>
                            </div>
                            <div class="flex">
                              <input id="sunday" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                              <label for="sunday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sunday</label>
                            </div>
                          </div>

                          <div class="hidden border-b w-full h-[14px] text-center p-3 mb-2"></div>

                          <div class="flex md:flex justify-center mx-auto">
                            <div class="p-2  gap-4 items-center">
                              <label for="dateStart" class="block text-xs text-center italic">Schedule Start</label>
                              <input type="date" id="dateStart" name="dateStart" class="w-36 md:w-32 rounded-lg" />
                            </div>
                            <div class="p-2  gap-4 items-center">
                              <label for="dateEnd" class="block text-xs italic ml-3">Schedule End</label>
                              <input type="date" id="eventdateEndTitleOut" name="dateEnd" class="w-36 md:w-32 rounded-lg"/>
                            </div>
                          </div>
                      </div>
                    
                      <div class=" p-1 rounded-lg bg-gray-50 dark:bg-gray-800" id="irregular" role="tabpanel" aria-labelledby="irregular-tab">
                        <div class="border-b w-full h-[14px] text-center p-3 mb-5">
                          <span class="text-sm bg-slate-50 text-black px-10 italic">
                            Schedule Dates
                          </span>
                        </div>
                        
                          <VueDatePicker v-model="datePicker" multi-dates multi-dates-limit="3" class="rounded-lg"></VueDatePicker>
                            
                      </div>
                      <div class="flex justify-end mt-4">
                        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Set Schedule</button>
                        <button type="reset" class="px-4 py-2 ml-2 bg-gray-300 text-gray-700 rounded-md">Cancel</button>
                      </div>
                  </div>

                </form>
              </div>
            </details>
          </div>
      </div>

      <div class="w-full md:w-3/4 justify-start border border-teal-100 shadow-md rounded-lg mt-5">
        <div class="border-t-4 border-teal-400 p-2 rounded-md bg-white">
          <FullCalendar :options='calendarOptions'  class="mt-10 text-xs flex md:flex md:text-sm"/>
        </div>
      </div>
    </div>
    
</template>