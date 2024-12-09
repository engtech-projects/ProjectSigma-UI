<script setup>
import * as faceapi from "face-api.js"
import { useAttendancePortal } from "~/stores/hrms/attendancePortal"
const attendancePortal = useAttendancePortal()
const { attendanceSession } = storeToRefs(attendancePortal)
const { newAttendanceLog } = storeToRefs(attendancePortal)
const MODEL_URL = "/faceapimodels"
const currentDetectedFace = ref(null)
const currentDetectionId = ref(null)
const detectionTimer = ref(4)
const lastIDlog = ref(null)
const lastLogType = ref(null)
const metaMessage = ref("")
let video = null
let stream = null
let canvas = null
let context = null
let displaySize = null
const isPaused = defineModel("isPaused", { type: Boolean, default: false })
const emit = defineEmits(["resetPortalData"])
// CLOSE CAMERA ON LEAVE PAGE
onBeforeRouteLeave(() => {
    if (stream) {
        stream.getTracks().forEach((track) => {
            track.stop()
        })
    }
})
const startCamera = () => {
    Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        // faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]).then(async () => {
        video = document.getElementById("cameraPreview")
        stream = await navigator.mediaDevices.getUserMedia({ video: true })
        video.srcObject = stream
        await new Promise((resolve) => {
            video.onloadedmetadata = () => {
                video.play()
                resolve()
            }
        })
        video.addEventListener("play", setupCanvas())
    })
}
const setupCanvas = () => {
    canvas = faceapi.createCanvasFromMedia(video)
    context = canvas.getContext("2d")
    const container = document.getElementById("capturedImage")
    container.append(canvas)
    displaySize = { width: video.clientWidth, height: video.clientHeight }
    faceapi.matchDimensions(canvas, displaySize)
    if (attendanceSession.value.assignment_count > 1) {
        isPaused.value = true
    }
    detectFace()
}
const detectFace = () => {
    setInterval(async () => {
        if (isPaused.value) { return }
        context.clearRect(0, 0, canvas.width, canvas.height)
        currentDetectedFace.value = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
        if (currentDetectedFace.value) {
            // const resizedDetections = faceapi.resizeResults(currentDetectedFace.value, displaySize)
            // faceapi.draw.drawDetections(canvas, resizedDetections)
            findFaceOwner()
        } else {
            detectionTimer.value = 4
            currentDetectionId.value = null
        }
    }, 750)
}
const findFaceOwner = () => {
    // const matcher = new faceapi.FaceMatcher(attendancePortal.labeledFaceDescriptorsID, 0.4)
    const faceOwner = attendancePortal.faceMatcher.findBestMatch(currentDetectedFace.value.descriptor).toString(false)
    if (faceOwner === "unknown") {
        currentDetectionId.value = null
        detectionTimer.value = 4
        drawDetectionBoxOnCanvas(faceOwner)
    } else {
        processEmployee(faceOwner)
    }
}
const processEmployee = (employeeID) => {
    drawDetectionBoxOnCanvas(attendancePortal.faceNames[employeeID])
    attendancePortal.newAttendanceLog.data.employee_id = employeeID
    if (employeeID === currentDetectionId.value) {
        detectionTimer.value--
    } else {
        detectionTimer.value = 4
        currentDetectionId.value = employeeID
    }
    if (detectionTimer.value === 0) {
        saveEmployeeAttendanceLog(employeeID)
    }
}
const drawDetectionBoxOnCanvas = (name) => {
    const resizedDetections = faceapi.resizeResults(currentDetectedFace.value, displaySize)
    // faceapi.draw.drawDetections(canvas, resizedDetections)
    const box = resizedDetections.detection.box
    box._x = video.clientWidth - box.x - box.width
    const drawBox = new faceapi.draw.DrawBox(box, { label: name })
    drawBox.draw(canvas)
}
const saveEmployeeAttendanceLog = async (employeeID) => {
    if (newAttendanceLog.value.isLoading) { return }
    try {
        metaMessage.value = "Saving..."
        await attendancePortal.saveAttendanceLog()
        newAttendanceLog.value.successMessage = "Successfully Logged " + attendancePortal.newAttendanceLog.data.log_type
        attendancePortal.getTodayAttendanceLogs()
        lastIDlog.value = employeeID
        lastLogType.value = attendancePortal.newAttendanceLog.data.log_type
    } finally {
        setTimeout(() => {
            detectionTimer.value = 4
            if (attendanceSession.value.assignment_count > 1) {
                emit("resetPortalData")
                isPaused.value = true
                attendanceSession.value.currentName = ""
            }
        }, 100)
        resetMessages()
    }
}
onMounted(() => {
    startCamera()
})
let timeout = null
const resetMessages = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        attendancePortal.lastSuccessLogEmployee = null
        newAttendanceLog.value.successMessage = ""
        newAttendanceLog.value.errorMessage = ""
        metaMessage.value = ""
    }, 5000)
}
</script>
<template>
    <div id="FaceCamera Component">
        <div class="relative justify-center w-full" :class="{ 'hideCanvas': isPaused }">
            <div v-show="!isPaused">
                <video
                    id="cameraPreview"
                    class="w-50 h-50 -scale-x-100"
                    autoplay
                    muted
                />
            </div>
            <div class="bg-gray-300 p-2 text-center font-bold text-xl">
                <p v-if="detectionTimer <= 3 && detectionTimer > 0">
                    TIMER: {{ detectionTimer >= 0 ? detectionTimer.toFixed(0) : 0 }}
                </p>
                <p v-else-if="newAttendanceLog.successMessage" class="text-green-500">
                    {{ newAttendanceLog.successMessage }}
                </p>
                <p v-else-if="newAttendanceLog.errorMessage" class="text-red-600">
                    {{ newAttendanceLog.errorMessage }}
                </p>
                <p v-else>
                    {{ metaMessage !== "" ? metaMessage : "..." }}
                </p>
            </div>
            <div id="capturedImage" class="absolute top-0 m-auto" />
        </div>
    </div>
</template>
<style scoped>
.hideCanvas {
    :deep(canvas) {
        display: none;
    }
}
</style>
