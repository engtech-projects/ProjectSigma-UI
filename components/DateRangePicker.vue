<template>
  <div class="input-group">
    <nuxt-link @click="toggleDateRange" class="btn btn-default pull-right active" id="daterange-btn">
      <i class="fa fa-calendar"></i> <span>{{ dateRangeLabel }}</span>
      <i class="fa fa-caret-down"></i>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDateRange: false,
      dateRangeLabel: 'Select Date Span',
    };
  },
  methods: {
    toggleDateRange() {
      this.showDateRange = !this.showDateRange;
      this.dateRangeLabel = this.showDateRange ? 'Close Date Span' : 'Select Date Span';
    },
  },
};
</script>

<style scoped>
/* Component-specific styles go here */
</style>
