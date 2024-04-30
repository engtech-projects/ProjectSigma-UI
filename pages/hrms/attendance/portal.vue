<script setup>
import * as faceapi from "face-api.js"
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "~/stores/hrms/employee"
import { useFacialPattern, CATEGORY_TIME_IN, CATEGORY_TIME_OUT, GROUP_TYPE_PROJECT, GROUP_TYPE_DEPARTMENT } from "~/stores/hrms/facialPattern"
import { useDepartmentStore } from "~/stores/hrms/setup/departments"
import { useProjectStore } from "~/stores/project-monitoring/projects"
const MODEL_URL = "/faceapimodels"
const videoStream = ref(null)
const faceLandMarks = ref(null)
const faceProbability = ref(null)
const detectionTimer = ref(3)
const lastIDlog = ref(null)
const ifCameraStart = ref(false)

const employee = useEmployeeInfo()
const snackbar = useSnackbar()
const facialPattern = useFacialPattern()
const department = useDepartmentStore()
const project = useProjectStore()
const { facialPatterList, currentMatch } = storeToRefs(facialPattern)
const { list: projectList } = storeToRefs(project)
const { list: departmentList } = storeToRefs(department)
const { information, employeeIsSearched } = storeToRefs(employee)

currentMatch.value.log_type = CATEGORY_TIME_IN
currentMatch.value.group_type = GROUP_TYPE_PROJECT
project.getProject()
department.getDepartment()
await facialPattern.getAllEmployeePattern()
const changeCategory = (cat) => {
    currentMatch.value.log_type = cat
}
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
            snackbar.add({
                type: "warning",
                text: "Already Log"
            })
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
                    faceapi.draw.drawDetections(canvas, resizedDetections)
                    const option = { label: currentMatch.value.name }
                    const drawBox = new faceapi.draw.DrawBox(resizedDetections.detection.box, option)
                    drawBox.draw(canvas)
                    if (detection.detection._score > 0.80) {
                        faceProbability.value = detection.detection._score
                        faceLandMarks.value = detection.descriptor
                        euclidianMatching()
                        detectionTimer.value = (detectionTimer.value - 0.5)
                        if (detectionTimer.value === 0) {
                            saveEmployeeAttendanceLog()
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
    currentMatch.value.employee_id = face.employee_id
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
            <div class="md:flex gap-2 space-x-2 p-2">
                <input id="department" v-model="currentMatch.group_type" class="" type="radio" :value="GROUP_TYPE_PROJECT">
                <label
                    for="department"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >PROJECT</label>
                <input id="project" v-model="currentMatch.group_type" class="" type="radio" :value="GROUP_TYPE_DEPARTMENT">
                <label
                    for="project"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >DEPARTMENT</label>
            </div>
            <div v-if="currentMatch.group_type === GROUP_TYPE_DEPARTMENT" class="px-2">
                <h1 class="text-lg font-medium leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white ">
                    Select Department
                </h1>
                <select v-model="currentMatch.department_id" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option v-for="(dep, index ) in departmentList" :key="index" :value="dep.id">
                        {{ dep.department_name }}
                    </option>
                </select>
            </div>
            <div v-if="currentMatch.group_type === GROUP_TYPE_PROJECT" class="px-2">
                <h1 class="text-lg font-medium leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white ">
                    Select Project
                </h1>
                <select v-model="currentMatch.project_id" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option v-for="(proj, index ) in projectList" :key="index" :value="proj.id">
                        [ {{ proj.project_code }} ] - {{ proj.project_identifier }}
                    </option>
                </select>
            </div>
            <div v-if="!ifCameraStart" class="flex gap-4 justify-center p-2">
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
                    <p class="text-xl font-bold">
                        No Employee Selected
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
