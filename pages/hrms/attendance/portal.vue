<script setup>
import * as faceapi from "face-api.js"
import { storeToRefs } from "pinia"
// import { useEmployeeInfo } from "~/stores/hrms/employee"
import { useFacialPattern } from "~/stores/hrms/facialPattern"

// const employee = useEmployeeInfo()
const facialPattern = useFacialPattern()
const { facialPatterList, currentMatch } = storeToRefs(facialPattern)
const MODEL_URL = "/faceapimodels"
const videoStream = ref(null)
const faceLandMarks = ref(null)
const faceProbability = ref(null)
const detectionTimer = ref(3)

await facialPattern.getAllEmployeePattern()

const startCamera = () => {
    Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
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
            const context = canvas.getContext("2d")
            const container = document.getElementById("capturedImage")
            container.append(canvas)
            const displaySize = { width: video.clientWidth, height: video.clientHeight }
            faceapi.matchDimensions(canvas, displaySize)
            setInterval(async () => {
                try {
                    const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withFaceDescriptor()
                    const resizedDetections = faceapi.resizeResults(detection, displaySize)
                    context.clearRect(0, 0, canvas.width, canvas.height)
                    context.font = "bold 16px Arial"
                    faceapi.draw.drawDetections(canvas, resizedDetections)
                    const option = { label: currentMatch.value.name + " TIMER : " + detectionTimer.value.toFixed(0) }
                    const drawBox = new faceapi.draw.DrawBox(resizedDetections.detection.box, option)
                    drawBox.draw(canvas)
                    if (detection.detection._score > 0.80) {
                        faceProbability.value = detection.detection._score
                        faceLandMarks.value = detection.descriptor
                        euclidianMatching()
                        detectionTimer.value = (detectionTimer.value - 0.5)
                        if (detectionTimer.value === 0) {
                            detectionTimer.value = 3
                        }
                    } else {
                        faceLandMarks.value = null
                    }
                } catch (error) {
                    faceLandMarks.value = error
                    context.clearRect(0, 0, canvas.width, canvas.height)
                }
            }, 500)
        })
    })
}

const labeledFaceDescriptors = facialPatterList.value.map((face) => {
    const descriptor = [new Float32Array(Object.values(JSON.parse(face.patterns).descriptor))]
    currentMatch.value.id = face.employee_id
    return new faceapi.LabeledFaceDescriptors(face.employee.fullname_last + "", descriptor)
})

const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.4)
const euclidianMatching = () => {
    if (faceLandMarks.value) {
        currentMatch.value.name = faceMatcher.findBestMatch(faceLandMarks.value).toString(false)
        if (currentMatch.value.name === "unknown") {
            currentMatch.value.name = "NOT DETECTED"
            detectionTimer.value = 3
        }
    } else {
        currentMatch.value.name = ""
    }
}
startCamera()
</script>
<template>
    <div class="md:flex gap-4 justify-center">
        <div class="border-2 border-gray-400 rounded-lg p-2 md:w-1/3 space-y-4">
            <div class="flex justify-center text-3xl font-medium text-cyan-700 p-2">
                Attendance Portal
            </div>

            <div>
                <h1 class="text-lg font-medium leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white ">
                    Select Project
                </h1>
                <select v-model="selectedProject" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="projectmain">
                        Main
                    </option>
                    <option value="project1">
                        Project 1
                    </option>
                    <option value="project2">
                        Project 2
                    </option>
                    <option value="project3">
                        Project 3
                    </option>
                </select>
            </div>
            <div class="relative justify-center p-2 w-full">
                <div>
                    <video
                        id="cameraPreview"
                        class="w-50 h-50"
                        autoplay
                        muted
                    />
                </div>
                <div id="capturedImage" class="absolute top-0 m-auto" />
            </div>
            <p>
                {{ currentMatch }}
            </p>
            <div class="flex gap-4 justify-center p-2">
                <button class="w-18 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-3 py-1 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800" @click="redirectToProject">
                    Time-In
                </button>
            </div>
        </div>
        <div class="border-2 border-gray-400 rounded-lg p-2 md:w-1/3 space-y-4">
            <div class="flex justify-center text-3xl font-medium text-cyan-700 p-2">
                Welcome
            </div>
            <p>
                asd
            </p>
        </div>
    </div>
</template>
