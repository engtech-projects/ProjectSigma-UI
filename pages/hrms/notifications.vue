<template>
  <!-- <div class="flex flex-row justify-center gap-2 mx-auto border-2 rounded-lg bg-white md:w-1/2 max-w-full mt-10 py-1">
    <button class="border-2 border-blue-200  hover:bg-teal-100 rounded-lg py-px px-2"  @click="showAllNotifications">All</button>
    <button class="border-2 border-blue-200  hover:bg-teal-200 rounded-lg py-px px-2"  @click="showUnreadNotifications">Unread</button>
  </div> -->
  <div class="flex flex-col border-2 mt-6 p-2 w-full md:w-1/2 max-w-full bg-white border-gray-200 rounded-lg shadow sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700 mx-auto">

    <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b flex items-center justify-between">
      Notifications
      <div class="relative">
        <button @click="togglePopup" class="flex flex-col ml-auto items-center ">
          <Icon name="mdi:dots-horizontal" color="black" class="w-10 h-6 rounded-full" />
          <div v-if="isPopupVisible" class="popup bg-gray-100 border-2 rounded-lg absolute right-0 mt-5">
            <!-- Content for the pop-up goes here -->
            <ul class="flex flex-col  p-2 space-y-2 text-xs">
              <li><a href="#">All</a></li>
              <hr class="w-full my-1 border-gray-300">
              <li><a href="#">Unread</a></li>
              <hr class="w-full my-1 border-gray-300">
              <li><a href="#">Menu3</a></li>
            </ul>
          </div>
          <button @click="closePopup"></button>
        </button>
      </div>
    </h5>

    <div class="notification-list">
      <!-- Replace this section with your dynamic data -->
      <a
        href="#"
        class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
        v-for="notification in notifications"
        :key="notification.id"
      >
        <div class="flex-shrink-0">
          <img
            class="w-11 h-11 rounded-full"
            :src="notification.avatar"
            :alt="notification.name + ' avatar'"
          />
          <div
            class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5"
            :class="notification.badgeClass"
          >
            <svg
              aria-hidden="true"
              class="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path :d="notification.badgeIcon"></path>
            </svg>
          </div>
        </div>
        <div class="pl-3 w-full">
          <div
            class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
          >
            <span class="font-semibold text-gray-900 dark:text-white">
              {{ notification.name }}
            </span>
            {{ notification.message }}
          </div>
          <div
            class="flex text-xs font-medium text-primary-600 dark:text-primary-500"
          >
            {{ notification.timestamp }}
            <div class="flex justify-end ml-auto">
                      <button
                      @click="approveItem(item)"
                      >
                        <Icon name="material-symbols:check-circle" color="green" class="w-5 h-5"/>
                        
                      </button>
                      <button
                      @click="denyItem(item)"
                      >
                        <Icon name="material-symbols:cancel" color="red" class="w-5 h-5"/>
                      </button>
                      <button
                      @click="viewItem(item)"
                      >
                        <Icon name="material-symbols:visibility-rounded" color="blue" class="w-5 h-5"/>
                      </button>
                    </div>
          </div>
          
        </div>
      </a>
      <!-- End of dynamic data section -->
  
      <!-- View all button -->
      <a
        href="#"
        class="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline"
      >
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPopupVisible: false,
      filterStatus: 'all', 
      notifications: [
        {
          id: 1,
          name: "HR Head",
          avatar: "/avatarexample.png",
          badgeClass: "bg-gray-900",
          badgeIcon: "M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z",
          message: ': Personal Action Form has been added',
          timestamp: 'a few moments ago',
        },
        {
          id: 2,
          name: "Engineer 1",
          avatar: "/avatarexample.png",
          badgeClass: "bg-gray-900",
          badgeIcon: "M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z",
          message: " and 5 others submitted their monthly reports.",
          timestamp: '10 minutes ago',
        },
        {
          id: 3,
          name: "HR Head",
          avatar: "/avatarexample.png",
          badgeClass: "bg-gray-900",
          badgeIcon: "M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z",
          message: " uploaded employee records.",
          timestamp: '44 minutes ago',
        },
        // {
        //   id: 4,
        //   name: "Leslie Livingston",
        //   avatar: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png",
        //   badgeClass: "bg-green-400",
        //   badgeIcon: "M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z",
        //   message: " mentioned you in a comment: @bonnie.green what do you say?",
        //   timestamp: '1 hour ago',
        // },
        // {
        //   id: 5,
        //   name: "Robert Brown",
        //   avatar: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png",
        //   badgeClass: "bg-purple-500",
        //   badgeIcon: "M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z",
        //   message: " posted a new video: Glassmorphism - learn how to implement the new design trend.",
        //   timestamp: '3 hours ago',
        // },
        // {
        //   id: 6,
        //   name: "Robert Brown",
        //   avatar: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png",
        //   badgeClass: "bg-purple-500",
        //   badgeIcon: "M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z",
        //   message: " posted a new video: Glassmorphism - learn how to implement the new design trend.",
        //   timestamp: '3 hours ago',
        //   read: false,
        // },
      ],
    };
  },

  computed: {
    filteredNotifications() {
      if (this.filterStatus === 'unread') {
        // Filter unread notifications
        return this.notifications.filter(notification => !notification.read);
      }
      // Show all notifications
      return this.notifications;
    },
  },

  methods: {
      togglePopup() {
        this.isPopupVisible = !this.isPopupVisible;
      },
      closePopup() {
        this.isPopupVisible = false;
      },
      showAllNotifications() {
      this.filterStatus = 'all';
      },
      showUnreadNotifications() {
        this.filterStatus = 'unread';
      },
    },
};

definePageMeta({
  layout: "default",
}),
  useHead({
    title: "Notification",
    meta: [{ name: "description", content: "Notifications" }],
    bodyAttrs: {
      class: "test",
    },
  });



</script>

