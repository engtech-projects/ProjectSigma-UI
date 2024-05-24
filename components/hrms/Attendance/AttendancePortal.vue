<template>
    <div>
        <div class="camera-container">
            <video ref="video" autoplay />
            <canvas ref="canvas" style="display:none;" />
        </div>
        <div v-if="isLoggedIn" class="logged-in-message">
            Logged In
        </div>
    </div>
</template>

<script setup>

const video = ref(null)
const canvas = ref(null)
const isLoggedIn = ref(false)

const width = 320
let height = 0
let streaming = false

onMounted(() => {
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
            video.value.srcObject = stream
            video.value.play()
        })
        .catch((err) => {
            return ("An error occurred: ", err)
        })

    video.value.addEventListener("canplay", async () => {
        if (!streaming) {
            height = video.value.videoHeight / (video.value.videoWidth / width)
            video.value.setAttribute("width", width)
            video.value.setAttribute("height", height)
            canvas.value.setAttribute("width", width)
            canvas.value.setAttribute("height", height)
            streaming = true

            // Load face-api.js models
            await faceapi.nets.tinyFaceDetector.loadFromUri("/models")
            await faceapi.nets.faceLandmark68Net.loadFromUri("/models")
            await faceapi.nets.faceRecognitionNet.loadFromUri("/models")

            // Start continuous face detection
            detectFaces()
        }
    })
})

const detectFaces = () => {
    setInterval(async () => {
        if (!video.value.paused && !video.value.ended) {
            canvas.value.width = width
            canvas.value.height = height
            canvas.value.getContext("2d").drawImage(video.value, 0, 0, width, height)

            // Perform face detection
            const detections = await faceapi.detectAllFaces(canvas.value, new faceapi.TinyFaceDetectorOptions({ inputSize: 256 })).withFaceLandmarks().withFaceDescriptors()
            if (detections.length > 0) {
                // Face detected
                isLoggedIn.value = true
            } else {
                // No face detected
                isLoggedIn.value = false
            }
        }
    }, 100) // Adjust the interval as needed
}
</script>

<style scoped>
.camera-container {
    position: relative;
}

.logged-in-message {
    text-align: center;
    font-size: 24px;
    margin-top: 10px;
    color: green;
}

/* Add any additional styles as needed */
</style>
