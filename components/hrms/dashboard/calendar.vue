<script lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'


export default {
    components: {
    FullCalendar
    },
    data() {
    return {
        calendarOptions: {
            plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth',
            },
            initialView: 'dayGridMonth',
            weekends: true,
            nowIndicator: true,
            editable: true,
            selectable: true,
            initialEvents: [
                { title: 'nice event', start: new Date() }
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
    methods: {
        addEvent() {
        const newEvent = {
            title: this.newEvent.title,
            start: new Date(),
        };
        this.calendarOptions.initialEvents.push(newEvent);
        this.clearForm();
        },
        clearForm() {
        this.newEvent = {
            title: '',
            eventType: '',
            description: '',
        };
        },
        deleteEvent(info) {
        const index = this.calendarOptions.initialEvents.findIndex(event => event.title === info.event.title);
        if (index !== -1) {
            this.calendarOptions.initialEvents.splice(index, 1);
        }
        },
        eventClick(info) {
        const newTitle = prompt('Enter a new title for the event:', info.event.title);
        if (newTitle) {
            info.event.setProp('title', newTitle);
        }
        },
    }
}
</script>

<template>

    <div class="mt-10 mb-10 grid grid-cols-1 gap-2 md:grid-cols-3">
        <div class="border-2 p-2 rounded-lg w-full">
            <label for="eventTitle" class="text-2xl font-medium">Create Event</label>
            <div>
                <form action="" class="space-y-2 mt-4">
                    <div>
                        <label for="eventTitle">Event Title</label>
                        <input type="text" v-model="newEvent.title"  id="eventTitle" class="w-full rounded"/>
                    </div>
                    
                    <div>
                        <label for="eventTypr">Event Type</label>
                        <select name="" v-model="newEvent.eventType" id="" class="w-full rounded">
                            <option value="">Event 1</option>
                            <option value="">Event 2</option>
                            <option value="">Event 3</option>
                        </select>
                    </div>

                    <div>
                        <label for="description">Description</label>
                        <textarea type="text"  v-model="newEvent.description" id="eventTitle" class="w-full rounded" placeholder="What are your thoughts?"/>
                    </div>

                    <div class="flex justify-end">
                        <button @click="addEvent" class="flex-1 text-white p-2 rounded bg-cyan-800 content-center">
                            <Icon name="material-symbols-light:event" class="mr-2"/>Add Event</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="border-2 p-2 rounded-lg shadow col-span-2">
            <FullCalendar :options='calendarOptions' class="mt-10"/>
        </div>
    </div>
    
</template>
