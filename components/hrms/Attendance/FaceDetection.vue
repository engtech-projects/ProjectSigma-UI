<script setup>
import * as faceapi from "face-api.js"
import { useEmployeeInfo } from "@/stores/hrms/employee"
import { useAttendancePortal } from "@/stores/hrms/attendancePortal"
const employee = useEmployeeInfo()
const attendancePortal = useAttendancePortal()

const MODEL_URL = "/faceapimodels"
let stream = null
const videoStream = ref(null)
const faceLandMarks = ref(null)
const snackbar = useSnackbar()
const readyState = ref(false)
const faceProbability = ref(null)
const cameraStarted = ref(false)

onBeforeRouteLeave(() => {
    if (stream) {
        stream.getTracks().forEach((track) => {
            track.stop()
        })
    }
})

const startCamera = () => {
    cameraStarted.value = true
    Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        // faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        // faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]).then(async () => {
        const video = document.getElementById("cameraPreview")

        stream = await navigator.mediaDevices.getUserMedia({ video: true })
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
                    const detection = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceDescriptor()
                    const resizedDetections = faceapi.resizeResults(detection, displaySize)
                    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)
                    faceapi.draw.drawDetections(canvas, resizedDetections)
                    if (detection.detection._score > 0.80) {
                        faceProbability.value = detection.detection._score
                        faceLandMarks.value = detection
                        readyState.value = true
                    } else {
                        faceLandMarks.value = null
                        readyState.value = false
                    }
                } catch (error) {
                    faceLandMarks.value = error
                    readyState.value = false
                }
            }, 500)
        })
    })
}
const captureImage = async () => {
    try {
        await attendancePortal.saveOrUpdateEmployeePattern(faceLandMarks.value, employee.information.id)
        snackbar.add({
            type: "success",
            text: attendancePortal.successMessage
        })
        employee.getEmployeeInformation(employee.information.id)
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
        <template v-if="cameraStarted">
            <div v-if="employee.information.id" class="text-xl justify-center items-center flex-col p-2">
                <p class="text-center">
                    {{ employee.information.fullname_last }}
                </p>
                <div v-if="employee.information?.face_patterns?.length > 0">
                    <p class="text-center">
                        <Icon name="material-symbols:check-circle" color="green" class="w-5 h-5" />
                        Ready for Facial Recognition
                    </p>
                </div>
                <div v-else>
                    <p class="text-center">
                        <Icon name="material-symbols:cancel" color="red" class="w-5 h-5" />
                        No Facial Marks Saved
                    </p>
                </div>
            </div>
            <div v-else>
                <p class="text-gray-500 text-xl justify-center flex mt-auto py-2">
                    Search for Employee on the Left
                </p>
            </div>
            <div class="w-full flex-col gap-2 justify-center">
                <div class="flex justify-center items-center">
                    <div class="relative">
                        <video
                            id="cameraPreview"
                            class="relative"
                            height="500"
                            width="500"
                            autoplay
                            muted
                        />
                        <div id="capturedImage" class="absolute top-0" />
                    </div>
                </div>
                <div>
                    <div v-if="faceLandMarks">
                        <p class="text-gray-900 text-xl justify-center flex mt-auto py-2">
                            Face Landmark Result : %{{ Math.abs((faceProbability * 100 ).toFixed(2)) }}
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
                        :disabled="!readyState"
                        :class="[
                            readyState ? 'text-white gap-2 bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800' :
                            'text-white gap-2 bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800'
                        ]"
                        @click="captureImage()"
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
        </template>
        <div v-else class="flex justify-center">
            <button class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5" @click="startCamera">
                Start Camera
            </button>
        </div>
    </div>
</template>
