<template>
  <div>
    <img class="w-36 h-36 p-1 mb-6 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 mx-auto block" :src="imageUrl" alt="Bordered avatar">
    
    <div class="text-center space-x-6">
      
      <input type="file" id="imageInput" accept="image/*" style="display: none" @change="handleImageUpload">
      <button @click="openImageInput" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-2.5 h-2.5 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
        Upload Image
      </button>
      <button @click="captureImage" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-2.5 h-2.5 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
        Capture Image
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png'
    };
  },
  methods: {
    openImageInput() {
      const input = this.$el.querySelector('#imageInput');
      if (input) {
        input.click();
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageUrl = URL.createObjectURL(file);
      }
    },
    async captureImage() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const track = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(track);
        const blob = await imageCapture.takePhoto();
        this.imageUrl = URL.createObjectURL(blob);
        track.stop();
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    }
  }
};
</script>
