<script setup lang="ts">
const { signIn } = useAuth()
definePageMeta({
    layout: "guest",
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/dashboard",
    },
})
useHead({
    title: "Login",
    meta: [{ name: "description", content: "Project SIGMA" }],
    bodyAttrs: {
        class: "login",
    },
})
const userCredentials = reactive({
    username: "",
    password: "",
    remember: false,
    response: ""
})
const snackbar = useSnackbar()
const boardLoading = ref(false)
const signingIn = ref("")
const loggedIn = ref("")

const login = async () => {
    boardLoading.value = true
    userCredentials.response = ""
    signingIn.value = "Signing in..."
    loggedIn.value = "Welcome " + userCredentials.username
    try {
        await signIn(
            {
                username: userCredentials.username,
                password: userCredentials.password,
            },
            { callbackUrl: "/dashboard" }
        )
        snackbar.add({
            type: "success",
            text: loggedIn.value
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error.data.message
        })
        // userCredentials.response = error.data.message
    } finally {
        signingIn.value = ""
        boardLoading.value = false
    }
}

</script>

<template>
    <div class="h-full">
        <section class="bg-gray-50 dark:bg-gray-900 overflow-auto">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <img class="w-48 md:w-full" src="/logo.fw.png" alt="logo">
                </a>
                <LayoutCard title="" :loading="boardLoading">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div class="border-b w-full h-[14px] text-center p-3 mt-2 mb-7">
                            <span class="text-md bg-white text-black px-3 italic">
                                Sign in to your account
                            </span>
                        </div>

                        <form
                            class="space-y-4 md:space-y-6"
                            action="#"
                            @submit.prevent="login()"
                        >
                            <div>
                                <label
                                    for="email"
                                    :class="{ 'text-red-500': userCredentials.response && !userCredentials.username }"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Username
                                </label>
                                <input
                                    id="email"
                                    v-model="userCredentials.username"
                                    type="text"
                                    name="email"
                                    :class="{ 'border-red-500': userCredentials.response && !userCredentials.username }"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Username"
                                >
                            </div>
                            <div>
                                <label
                                    for="password"
                                    :class="{ 'text-red-500': userCredentials.response && !userCredentials.password }"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Password</label>
                                <input
                                    id="password"
                                    v-model="userCredentials.password"
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    :class="{ 'border-red-500': userCredentials.response && !userCredentials.password }"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                            </div>
                            <div v-show="false" class="flex items-center justify-between gap-6">
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input
                                            id="remember"
                                            v-model="userCredentials.remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        >
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label
                                            for="remember"
                                            class="text-gray-500 dark:text-gray-300"
                                        >Remember me</label>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >Forgot password?</a>
                            </div>
                            <!-- <button
                                v-if="boardLoading"
                                class="w-full text-white bg-cyan-600 hover:bg-secondary-base focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                <img
                                    class="flex justify-center mx-auto w-8 rounded-md"
                                    src="/loader.gif"
                                    alt="logo"
                                >
                            </button> -->
                            <button
                                type="submit"
                                class="w-full text-white bg-cyan-600 hover:bg-secondary-base focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign in
                            </button>
                        </form>
                        <div class="w-full flex justify-center">
                            <NuxtLink
                                to="/attendance-portal/face-recognition"
                                class="w-full text-green-600 hover:text-green-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            >
                                <Icon name="mdi:face-recognition" class="mr-2 mt-[3px]" />
                                <span>Attendance Facial</span>
                            </NuxtLink>
                        </div>
                    </div>
                </LayoutCard>
            </div>
        </section>
    </div>
</template>
