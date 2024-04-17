<script setup>
import * as faceapi from "face-api.js"

const MODEL_URL = "/models"
const imageUrl = "/avatarexample.png"
const videoStream = ref(null)
const cameraStarted = ref(false)

const startCamera = () => {
    Promise.all([
        faceapi.loadTinyFaceDetectorModel(MODEL_URL),
    ]).then(async () => {
        const video = document.getElementById("cameraPreview")
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        videoStream.value = stream
        video.srcObject = stream

        // Wait for the video to be loaded and start playing
        await new Promise((resolve) => {
            video.onloadedmetadata = () => {
                video.play()
                resolve()
            }
        })
        cameraStarted.value = true
    })
}

const captureImage = () => {
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
}
</script>
<template>
    <div>
        <video
            id="cameraPreview"
            class="md:h-56 p-1 mb-6 rounded-md ring-2 ring-teal-300 dark:ring-teal-500 mx-auto"
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
