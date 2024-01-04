<template>
  <div class="flex flex-col gap-3">
    <div>
      <HrmsAnnouncement />
    </div>
    <div>
      <HrmsAnnouncementList />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      announcements: [],
      newAnnouncement: {
        title: "",
        startDate: "",
        endDate: "",
        description: "",
        editing: false,
      },
    };
  },
  methods: {
    postAnnouncement() {
      if (
        this.newAnnouncement.title &&
        this.newAnnouncement.description &&
        this.newAnnouncement.startDate &&
        this.newAnnouncement.endDate
      ) {
        this.announcements.push({ ...this.newAnnouncement });
        this.newAnnouncement.title = "";
        this.newAnnouncement.startDate = "";
        this.newAnnouncement.endDate = "";
        this.newAnnouncement.description = "";
      }
    },
    editAnnouncement(index) {
      this.announcements[index].editing = true;
    },
    saveAnnouncement(index) {
      this.announcements[index].editing = false;
    },
    deleteAnnouncement(index) {
      this.announcements.splice(index, 1);
    },
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    formatMonthYear(date) {
      const options = { year: "numeric", month: "long" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};
</script>
