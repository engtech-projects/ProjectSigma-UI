<script setup>
import * as faceapi from "face-api.js"
import { useEmployeeInfo } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()

const MODEL_URL = "/models"
const videoStream = ref(null)
const faceLandMarks = ref(null)
const faceProbability = ref(null)

const startCamera = () => {
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
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
        video.addEventListener("play", () => {
            const canvas = faceapi.createCanvasFromMedia(video)
            const container = document.getElementById("capturedImage")
            container.append(canvas)
            const displaySize = { width: video.clientWidth, height: video.clientHeight }
            faceapi.matchDimensions(canvas, displaySize)
            setInterval(async () => {
                try {
                    const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
                    const resizedDetections = faceapi.resizeResults(detection, displaySize)
                    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)
                    faceapi.draw.drawDetections(canvas, resizedDetections)
                    if (detection.detection._score > 0.80) {
                        faceProbability.value = detection.detection._score
                        faceLandMarks.value = detection.landmarks._positions
                    } else {
                        faceLandMarks.value = null
                    }
                } catch (error) {
                    faceLandMarks.value = null
                }
            }, 500)
        })
    })
}
startCamera()
const captureImage = async () => {
    try {
        await employee.updateSeminarTraining(params, id)
        snackbar.add({
            type: "success",
            text: employee.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}
</script>
<template>
    <div class="m-auto">
        <div v-if="employee.information" class="p-2">
            {{ employee.information.fullname_last ?? "NO EMPLOYEE" }}
        </div>
        <div class="w-full flex gap-2">
            <div class="relative justify-center p-2 w-1/2">
                <div>
                    <video
                        id="cameraPreview"
                        class=""
                        height="500"
                        width="500"
                        autoplay
                        muted
                    />
                </div>
                <div id="capturedImage" class="absolute top-0 m-auto" />
            </div>
            <div class="w-1/2">
                <div v-if="faceLandMarks" class="flex flex-col justify-center m-auto">
                    <p class="text-[12px] text-gray-900">
                        Face Landmark Result : {{ Math.abs((faceProbability * 100 ))}}
                    </p>
                    <p class="text-[5.5px] text-green-900 max-h-[500px]">
                        {{ faceLandMarks }}
                    </p>
                </div>
                <div v-else>
                    <p class="text-gray-500 text-xl justify-center flex mt-auto py-2">
                        NO FACE DETECTED
                    </p>
                </div>
            </div>
        </div>
        <div class="flex justify-end py-4">
            <div class="flex gap-2">
                <button
                    v-if="employee.information.id"
                    class="text-white gap-2 bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                    @click="captureImage"
                >
                    <Icon
                        name="material-symbols:camera"
                        color="white"
                        class="w-5 h-5"
                    />
                    Save Face Pattern
                </button>
            </div>
        </div>
    </div>
</template>
