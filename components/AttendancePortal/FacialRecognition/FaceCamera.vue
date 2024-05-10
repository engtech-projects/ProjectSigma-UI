<script setup>
import * as faceapi from "face-api.js"
import { useAttendancePortal } from "~/stores/hrms/attendancePortal"
const attendancePortal = useAttendancePortal()
const { errorMessage, successMessage } = storeToRefs(attendancePortal)
const MODEL_URL = "/faceapimodels"
const currentDetectedFace = ref(null)
const currentDetectionId = ref(null)
const detectionTimer = ref(4)
const lastIDlog = ref(null)
const lastLogType = ref(null)
let video = null
let stream = null
let canvas = null
let context = null
let displaySize = null
// CLOSE CAMERA ON LEAVE PAGE
onBeforeRouteLeave(() => {
    stream.getTracks().forEach((track) => {
        track.stop()
    })
})
const startCamera = () => {
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
    detectFace()
}
const detectFace = () => {
    setInterval(async () => {
        context.clearRect(0, 0, canvas.width, canvas.height)
        currentDetectedFace.value = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withFaceDescriptor()
        if (currentDetectedFace.value) {
            // const resizedDetections = faceapi.resizeResults(currentDetectedFace.value, displaySize)
            // faceapi.draw.drawDetections(canvas, resizedDetections)
            findFaceOwner()
        } else {
            detectionTimer.value = 4
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
    attendancePortal.attendancePortalParams.employee_id = employeeID
    if (employeeID === currentDetectionId.value) {
        detectionTimer.value--
    } else {
        detectionTimer.value = 4
        currentDetectionId.value = employeeID
    }
    if (detectionTimer.value === 0) {
        saveEmployeeAttendanceLog()
    }
}
const drawDetectionBoxOnCanvas = (name) => {
    const box = currentDetectedFace.value.detection.box
    box._x = video.clientWidth - box.x - box.width
    const drawBox = new faceapi.draw.DrawBox(box, { label: name })
    drawBox.draw(canvas)
}
const saveEmployeeAttendanceLog = async (employeeID) => {
    try {
        if (lastIDlog.value === employeeID && lastLogType.value === attendancePortal.attendancePortalParams.log_type) {
            attendancePortal.attendancePortalParams.remarks = "already_log"
        } else {
            await attendancePortal.saveAttendanceLog()
            setTimeout(() => {
                attendancePortal.lastSuccessLogEmployee = null
                attendancePortal.successMessage = ""
            }, 1500)
            lastIDlog.value = employeeID
            lastLogType.value = attendancePortal.attendancePortalParams.log_type
        }
    } catch (error) {
        setTimeout(() => {
            attendancePortal.errorMessage = ""
        }, 1500)
        // Do Noting. Error message shown elsewhere
    }
}
startCamera()
</script>
<template>
    <div id="FaceCamera Component">
        <div class="relative justify-center w-full">
            <div>
                <video
                    id="cameraPreview"
                    class="w-50 h-50 -scale-x-100"
                    autoplay
                    muted
                />
            </div>
            <div v-if="detectionTimer <= 3 && detectionTimer > 0" class="bg-gray-300 p-2 text-center">
                <p>
                    TIMER: {{ detectionTimer >= 0 ? detectionTimer.toFixed(0) : 0 }}
                </p>
            </div>
            <div v-if="successMessage" class="bg-gray-300 p-2 text-center text-green">
                <p>
                    {{ successMessage }}
                </p>
            </div>
            <div v-if="errorMessage" class="bg-gray-300 p-2 text-center text-red">
                <p>
                    {{ errorMessage }}
                </p>
            </div>
            <div id="capturedImage" class="absolute top-0 m-auto" />
        </div>
    </div>
</template>
