<script setup>
import * as faceapi from "face-api.js"
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "~/stores/hrms/employee"
import { useFacialPattern, CATEGORY_TIME_IN, CATEGORY_TIME_OUT } from "~/stores/hrms/facialPattern"
const MODEL_URL = "/faceapimodels"
const faceLandMarks = ref(null)
const faceProbability = ref(null)
const detectionTimer = ref(4)
const lastIDlog = ref(null)
const ifCameraStart = ref(false)

const route = useRoute()
const queryParam = route.query

let video = null
let stream = null

const employee = useEmployeeInfo()
const snackbar = useSnackbar()
const facialPattern = useFacialPattern()
const { facialPatterList, currentMatch } = storeToRefs(facialPattern)
const { information, employeeIsSearched } = storeToRefs(employee)

currentMatch.value.department_id = queryParam.department_id ?? null
currentMatch.value.project_id = queryParam.project_id ?? null
currentMatch.value.group_type = queryParam.group_type ?? null

currentMatch.value.log_type = CATEGORY_TIME_IN
await facialPattern.getAllEmployeePattern()
const changeCategory = (cat) => {
    currentMatch.value.log_type = cat
}

onBeforeRouteLeave(() => {
    stream.getTracks().forEach((track) => {
        track.stop()
    })
})

const saveEmployeeAttendanceLog = async () => {
    try {
        if (!lastIDlog.value) {
            lastIDlog.value = currentMatch.value.employee_id
            await facialPattern.saveAttendanceLog()
            snackbar.add({
                type: "success",
                text: facialPattern.successMessage
            })
            await employee.getEmployeeInformation(lastIDlog.value)
        } else if (lastIDlog.value === currentMatch.value.employee_id) {
            currentMatch.value.remarks = "already_log"
        } else {
            await facialPattern.saveAttendanceLog()
            snackbar.add({
                type: "success",
                text: facialPattern.successMessage
            })
            await employee.getEmployeeInformation(currentMatch)
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
        lastIDlog.value = null
    }
}
const startCamera = () => {
    ifCameraStart.value = true
    Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]).then(async () => {
        video = document.getElementById("cameraPreview")

        stream = await navigator.mediaDevices.getUserMedia({ video: true })
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
                    faceapi.draw.drawDetections(canvas, resizedDetections)
                    const option = { label: currentMatch.value.name }
                    const drawBox = new faceapi.draw.DrawBox(resizedDetections.detection.box, option)
                    drawBox.draw(canvas)
                    if (detection.detection._score > 0.80) {
                        faceProbability.value = detection.detection._score
                        faceLandMarks.value = detection.descriptor
                        facialMatching()
                        detectionTimer.value = (detectionTimer.value - 0.5)
                        if (detectionTimer.value === 0) {
                            saveEmployeeAttendanceLog()
                            detectionTimer.value = 4
                        }
                    } else {
                        faceLandMarks.value = null
                    }
                } catch (error) {
                    faceLandMarks.value = error
                    context.clearRect(0, 0, canvas.width, canvas.height)
                    detectionTimer.value = 4
                }
            }, 500)
        })
    })
}

const employeeNames = []
const labeledFaceDescriptorsID = facialPatterList.value.map((face) => {
    const descriptor = [new Float32Array(Object.values(JSON.parse(face.patterns).descriptor))]
    employeeNames[face.employee_id] = face.employee.fullname_last
    return new faceapi.LabeledFaceDescriptors(face.employee_id + "", descriptor)
})

const faceMatcherId = new faceapi.FaceMatcher(labeledFaceDescriptorsID, 0.4)
const facialMatching = () => {
    if (faceLandMarks.value) {
        currentMatch.value.employee_id = faceMatcherId.findBestMatch(faceLandMarks.value).toString(false)
        if (currentMatch.value.employee_id === "unknown") {
            currentMatch.value.name = "NOT DETECTED"
            detectionTimer.value = 4
        } else {
            currentMatch.value.name = employeeNames[currentMatch.value.employee_id]
        }
    } else {
        currentMatch.value.name = ""
    }
}

</script>
<template>
    <div class="md:flex gap-4 justify-center">
        <div class="border-2 border-gray-400 rounded-lg p-2 md:w-1/3 space-y-4">
            <div class="flex justify-center text-3xl font-medium text-cyan-700 p-2 border-b-2">
                Attendance Portal
            </div>
            <div v-if="currentMatch.log_type === CATEGORY_TIME_IN" class="flex justify-center text-xl font-medium text-cyan-700 p-2">
                {{ currentMatch.group_type }} - TIME IN
            </div>
            <div v-else class="flex justify-center text-xl font-medium text-cyan-700 p-2">
                {{ currentMatch.group_type }} - TIME OUT
            </div>
            <HrmsCommonDepartmentProjectSelector
                v-if="!ifCameraStart"
                v-model:select-type="currentMatch.group_type"
                v-model:department-id="currentMatch.department_id"
                v-model:project-id="currentMatch.project_id"
            />
            <div v-if="!ifCameraStart && currentMatch.group_type && (currentMatch.department_id || currentMatch.project_id)" class="flex gap-4 justify-center p-2">
                <button class="w-18 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-3 py-1 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800" @click="startCamera">
                    START CAMERA
                </button>
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
                <div v-if="detectionTimer <=3" class="bg-gray-300 p-2 text-center">
                    <p>
                        TIMER: {{ detectionTimer.toFixed(0) }}
                    </p>
                </div>
                <div id="capturedImage" class="absolute top-0 m-auto" />
            </div>
            <div v-if="currentMatch.log_type === CATEGORY_TIME_IN" class="flex gap-4 justify-center p-2">
                <button class="w-18 text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-3 py-1 text-center dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-800" @click="changeCategory(CATEGORY_TIME_OUT)">
                    Time-Out
                </button>
            </div>
            <div v-else class="flex gap-4 justify-center p-2">
                <button class="w-18 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-3 py-1 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800" @click="changeCategory(CATEGORY_TIME_IN)">
                    Time-In
                </button>
            </div>
        </div>
        <div class="border-2 border-gray-400 rounded-lg p-2 md:w-1/3 space-y-4">
            <div class="flex justify-center text-3xl font-medium text-cyan-700 p-2 border-b-2">
                Welcome
            </div>
            <div class="w-full">
                <div v-if="employeeIsSearched">
                    <div class="space-y-6 mb-4" action="#">
                        <div class="flex flex-col">
                            <div class="p-4">
                                <img
                                    v-if="information.profile_photo"
                                    class="md:h-96 w-full bg-gray-400 rounded-lg"
                                    :src="information.profile_photo.base64"
                                    alt="profile pic"
                                >
                                <img
                                    v-else-if="information.gender.toLowerCase() === 'female'"
                                    class="md:h-96 w-full bg-gray-400 rounded-lg"
                                    :src="'/avatarexample.png'"
                                    alt="profile pic"
                                >
                                <img
                                    v-else
                                    class="md:h-58 w-full bg-gray-400 rounded-lg"
                                    :src="'/avatarexample.png'"
                                    alt="profile pic"
                                >
                            </div>
                            <div class="text-center">
                                <p class="text-3xl font-bold text-center p-2">
                                    {{ information.fullname_first }}
                                </p>
                                <label
                                    for="text"
                                    class="block text-sm font-medium italic text-teal-700"
                                >
                                    Programmer - Information Tech
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p class="text-xl font-bold text-center text-gray-400">
                        No Employee Log
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
