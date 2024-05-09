<script setup>
import * as faceapi from "face-api.js"
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "~/stores/hrms/employee"
import { useAttendancePortal, CATEGORY_TIME_IN, CATEGORY_TIME_OUT } from "~/stores/hrms/attendancePortal"

definePageMeta({
    layout: "guest",
    auth: {
        unauthenticatedOnly: false,
        navigateAuthenticatedTo: "/attendance-portal/face-recognition",
    },
})
const MODEL_URL = "/faceapimodels"
const faceLandMarks = ref(null)
const faceProbability = ref(null)
const detectionTimer = ref(4)
const lastIDlog = ref(null)
const ifCameraStart = ref(false)
let faceMatcherId = null

const route = useRoute()
const queryParam = route.query

let video = null
let stream = null

const employee = useEmployeeInfo()
const snackbar = useSnackbar()
const attendancePortal = useAttendancePortal()
const { facialPatterList, attendancePortalParams } = storeToRefs(attendancePortal)
const { information, employeeIsSearched } = storeToRefs(employee)

attendancePortalParams.value.department_id = queryParam.department_id ?? null
attendancePortalParams.value.project_id = queryParam.project_id ?? null
attendancePortalParams.value.group_type = queryParam.group_type ?? null

attendancePortalParams.value.log_type = CATEGORY_TIME_IN
await attendancePortal.getAllEmployeePattern()
await attendancePortal.getTodayAttendanceLogs()

const changeCategory = (cat) => {
    attendancePortalParams.value.log_type = cat
}

onBeforeRouteLeave(() => {
    stream.getTracks().forEach((track) => {
        track.stop()
    })
})

const saveEmployeeAttendanceLog = async () => {
    try {
        if (!lastIDlog.value) {
            lastIDlog.value = attendancePortalParams.value.employee_id
            await attendancePortal.saveAttendanceLog()
            snackbar.add({
                type: "success",
                text: attendancePortal.successMessage
            })
            await employee.getPublicEmployeeInformation(lastIDlog.value)
        } else if (lastIDlog.value === attendancePortalParams.value.employee_id) {
            attendancePortalParams.value.remarks = "already_log"
        } else {
            await attendancePortal.saveAttendanceLog()
            snackbar.add({
                type: "success",
                text: attendancePortal.successMessage
            })
            await employee.getPublicEmployeeInformation(attendancePortalParams)
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
                    const option = { label: attendancePortalParams.value.name }
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
if (labeledFaceDescriptorsID.length > 0) {
    faceMatcherId = new faceapi.FaceMatcher(labeledFaceDescriptorsID, 0.4)
}
const facialMatching = () => {
    if (faceLandMarks.value) {
        attendancePortalParams.value.employee_id = faceMatcherId.findBestMatch(faceLandMarks.value).toString(false)
        if (attendancePortalParams.value.employee_id === "unknown") {
            attendancePortalParams.value.name = "NOT DETECTED"
            detectionTimer.value = 4
        } else {
            attendancePortalParams.value.name = employeeNames[attendancePortalParams.value.employee_id]
        }
    } else {
        attendancePortalParams.value.name = ""
    }
}

</script>
<template>
    <div class="flex gap-2 justify-center">
        <div class="w-full border-2 border-gray-400 md:w-1/3 space-y-4">
            <div class="flex justify-center text-3xl font-medium text-gray-50 p-2 border-b-2 bg-cyan-600">
                Attendance Portal
            </div>
            <div v-if="attendancePortalParams.log_type === CATEGORY_TIME_IN" class="flex text-xl font-medium text-cyan-700 p-2">
                TIME IN
            </div>
            <div v-else class="flex text-xl font-medium text-cyan-700 p-2">
                TIME OUT
            </div>
            <HrmsCommonDepartmentProjectSelector
                v-show="false"
                v-model:select-type="attendancePortalParams.group_type"
                v-model:department-id="attendancePortalParams.department_id"
                v-model:project-id="attendancePortalParams.project_id"
            />
            <div v-if="!ifCameraStart && attendancePortalParams.group_type && (attendancePortalParams.department_id || attendancePortalParams.project_id)" class="flex gap-4 justify-center p-2">
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
            <div v-if="attendancePortalParams.log_type === CATEGORY_TIME_IN" class="flex gap-4 justify-center p-2">
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
        <div class="w-full border-2 border-gray-400 md:w-1/3 space-y-4">
            <div class="flex justify-center text-3xl font-medium text-gray-50 p-2 border-b-2 bg-cyan-600">
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
        <div class="border-2 border-gray-400 md:w-1/3 w-full">
            <div class="flex justify-center text-3xl font-medium text-gray-50 p-2 border-b-2 bg-cyan-600">
                Today's Log
            </div>
            <div class="flex-row gap-2">
                <HrmsAttendanceEmployeeAttendanceCard />
                <HrmsAttendanceEmployeeAttendanceCard />
                <HrmsAttendanceEmployeeAttendanceCard />
            </div>
        </div>
    </div>
</template>
