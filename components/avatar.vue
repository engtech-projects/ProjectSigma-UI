<template>
  <div>
    <video
      id="cameraPreview"
      class="md:h-58 w-96 p-1 mb-6 rounded-md ring-2 ring-gray-300 dark:ring-gray-500 mx-auto"
      autoplay
      :poster="imageUrl"
      >
    </video>

    <div class="flex justify-center">
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        style="display: none"
        @change="handleImageUpload"
      />
      <div class="flex gap-2">
        <button
          @click="openImageInput"
          class="text-white gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <Icon name="ic:outline-file-upload" color="white" class="w-5 h-5" />
          Upload Image
        </button>

        <button
          @click="captureImage"
          class="text-white gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <Icon
            name="ic:outline-add-a-photo"
            color="white"
            class="w-5 h-5"
          />
          Capture Image
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '/avatarexample.png'
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
        const video = document.getElementById('cameraPreview');
        const capturedImage = document.getElementById('capturedImage');

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        // Wait for the video to be loaded and start playing
        await new Promise((resolve) => {
          video.onloadedmetadata = () => {
            video.play();
            resolve();
          };
        });

        // Create a canvas element to draw the video frame
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');

        // Draw the current video frame on the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas content to a Blob representing the image
        canvas.toBlob(async (blob) => {
          if (blob) {
            // Display the captured image
            capturedImage.src = URL.createObjectURL(blob);
          }

          // Stop the video stream
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }, 'image/png'); // You can change the format as needed
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    }

  }
};
</script>
