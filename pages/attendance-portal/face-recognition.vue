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
onMounted(() => document.addEventListener("keyup", (event) => {
    if (event.key === " " ||
        event.code === "Space" ||
        event.keyCode === 32
    ) {
        attendancePortalParams.value.log_type = (attendancePortalParams.value.log_type === CATEGORY_TIME_IN) ? CATEGORY_TIME_OUT : CATEGORY_TIME_IN
    }
}))

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

attendancePortal.getAllEmployeePattern()
attendancePortal.getTodayAttendanceLogs()
attendancePortalParams.value.department_id = queryParam.department_id ?? null
attendancePortalParams.value.project_id = queryParam.project_id ?? null
attendancePortalParams.value.group_type = queryParam.group_type ?? null

attendancePortalParams.value.log_type = CATEGORY_TIME_IN

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
startCamera()
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
    <div class="w-full md:px-4 flex gap-2 justify-center m-auto mt-5">
        <div class="w-1/3 rounded-lg  space-y-4">
            <HrmsAttendanceEmployeeAnouncement />
        </div>
        <div class="w-full rounded-lg md:w-1/3 space-y-4">
            <LayoutBoards title="Face Recognition" class="text-center">
                <div class="w-full">
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
                    <div class="md:flex gap-2 space-x-2 p-2 justify-center">
                        <input id="Time-in" v-model="attendancePortalParams.log_type" class="" type="radio" value="In">
                        <label
                            for="Time-in"
                            class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                        >TIME IN</label>
                        <input id="time-out" v-model="attendancePortalParams.log_type" class="" type="radio" value="Out">
                        <label
                            for="time-out"
                            class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                        >TIME OUT</label>
                    </div>
                </div>
                <div class="w-full">
                    <HrmsAttendanceEmployeeAttendanceCard />
                </div>
            </LayoutBoards>
        </div>
        <div class="rounded-lg md:w-1/3 w-full">
            <LayoutBoards title="Todays Logs">
                <div class="flex flex-col gap-2 ">
                    <div v-if="employeeIsSearched | true">
                        <div class="space-y-2 p-3" action="#">
                            <div class="flex gap-4 justify-between">
                                <p class="text-3xl text-gray-700 font-bold mt-2">
                                    {{ information.fullname_first }}
                                    Juan Dela Cruz
                                </p>
                                <div class="flex gap-4 pt-4">
                                    <div class="flex justify-between gap-x-6">
                                        <p class="text-xl text-zinc-600 dark:text-zinc-300">
                                            <span class="text-cyan-900 font-bold" /> 7:00 AM
                                        </p>
                                        <p class="text-xl  text-zinc-600 dark:text-zinc-300">
                                            <span class="text-cyan-900 font-bold" /> 4:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="flex gap-4 justify-between">
                                <p class="text-3xl text-gray-700 font-bold mt-2">
                                    {{ information.fullname_first }}
                                    Juan Dela Cruz
                                </p>
                                <div class="flex gap-4 pt-4">
                                    <div class="flex justify-between gap-x-6">
                                        <p class="text-xl text-zinc-600 dark:text-zinc-300">
                                            <span class="text-cyan-900 font-bold" /> 7:00 AM
                                        </p>
                                        <p class="text-xl  text-zinc-600 dark:text-zinc-300">
                                            <span class="text-cyan-900 font-bold" /> 4:00 PM
                                        </p>
                                    </div>
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
            </LayoutBoards>
        </div>
    </div>
</template>
