<template>
    <div>
        <video
            id="cameraPreview"
            class="md:h-58 p-1 mb-6 rounded-md ring-2 ring-teal-300 dark:ring-teal-500 mx-auto"
            autoplay
            :poster="imageUrl"
        />

        <div>
            <img id="capturedImage" alt="Captured Image" class=" p-4 justify-center mx-auto hidden">
        </div>

        <!-- Add a placeholder for the captured image -->

        <div class="flex justify-center">
            <div class="flex gap-2">
                <button
                    class="text-white gap-2 bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                    @click="startCamera"
                >
                    <Icon
                        name="ic:outline-add-a-photo"
                        color="white"
                        class="w-5 h-5"
                    />
                    Start Camera
                </button>
                <button
                    class="text-white gap-2 bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                    :disabled="!cameraStarted"
                    @click="captureImage"
                >
                    <Icon
                        name="material-symbols:camera"
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
    data () {
        return {
            imageUrl: "/avatarexample.png",
            videoStream: null,
            cameraStarted: false,
        }
    },
    beforeUnmount () {
    // Cleanup when component is about to be unmounted
        if (this.videoStream) {
            this.videoStream.getTracks().forEach(track => track.stop())
        }
    },
    methods: {
        async startCamera () {
            try {
                const video = document.getElementById("cameraPreview")

                // Ensure any existing video stream is stopped before starting a new one
                if (this.videoStream) {
                    this.videoStream.getTracks().forEach(track => track.stop())
                }

                const stream = await navigator.mediaDevices.getUserMedia({ video: true })
                this.videoStream = stream
                video.srcObject = stream

                // Wait for the video to be loaded and start playing
                await new Promise((resolve) => {
                    video.onloadedmetadata = () => {
                        video.play()
                        resolve()
                    }
                })

                this.cameraStarted = true
            } catch (error) {
                return ("Error starting camera:", error)
            }
        },
        captureImage () {
            try {
                const video = document.getElementById("cameraPreview")
                const capturedImage = document.getElementById("capturedImage")

                // Create a canvas element to draw the video frame
                const canvas = document.createElement("canvas")
                canvas.width = video.videoWidth
                canvas.height = video.videoHeight
                const context = canvas.getContext("2d")

                // Draw the current video frame on the canvas
                context.drawImage(video, 0, 0, canvas.width, canvas.height)

                // Convert the canvas content to a Blob representing the image
                canvas.toBlob((blob) => {
                    if (blob) {
                        // Display the captured image
                        capturedImage.src = URL.createObjectURL(blob)
                        capturedImage.classList.remove("hidden")
                    }
                }, "image/png") // You can change the format as needed
            } catch (error) {
                return ["Error capturing image:", error]
            }
        },
    },
}
</script>
