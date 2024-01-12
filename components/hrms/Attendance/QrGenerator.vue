<template>
    <div class=" md:grid grid-cols-2 gap-2 mt-0 ">
        <div class="shadow-md p-4 bg-white mb-3 border border-gray-300 rounded-lg w-full md:w-3/5 flex flex-col justify-center mx-auto">
            <p class="flex justify-center text-2xl font-normal text-gray-900 pb-5 antialiased tracking-wide">
                QR Generator
            </p>

            <div class="mb-4">
                <SearchBar />
            </div>

            <div>
                <form class="space-y-6 mb-4" action="#">
                    <img
                        class="md:h-58 w-full bg-gray-400 rounded-lg"
                        src="/avatarexample.png"
                        alt="profile pic"
                    >
                    <div class="flex gap-20">
                        <div>
                            <p class="text-xl font-bold">
                                Juan Dela Cruz
                            </p>
                            <label
                                for="text"
                                class="block mb-2 text-sm font-medium italic text-teal-700"
                            >Employee Name</label>
                        </div>
                        <div>
                            <p class="text-xl font-bold">
                                Developer
                            </p>
                            <label
                                for="text"
                                class="block mb-2 text-sm font-medium italic text-teal-700"
                            >Position</label>
                        </div>
                    </div>

                    <div class="flex mb-2 p-2 justify-end">
                        <button
                            type="submit"
                            class="flex gap-1 justify-center text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-gray-900 dark:hover:bg-gray-800"
                            @click.prevent="generateQRCode"
                        >
                            <Icon
                                name="material-symbols:qr-code-2-add"
                                class="w-5 h-5"
                                color="white"
                            />
                            Generate QR Code
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div class="p-4 mb-3 rounded-lg w-full md:w-1/2 flex flex-col justify-center">
            <img
                v-if="qrCodeData"
                class="md:h-58 w-full bg-gray-400 rounded-lg border border-slate-300 shadow-md"
                :src="qrCodeData"
                alt="QR Code"
            >
            <div v-if="qrCodeData" class="flex justify-center mt-4">
                <a
                    :href="qrCodeData"
                    download="generated_qr_code.png"
                    class="text-teal-700 underline cursor-pointer"
                >
                    Download QR Code
                </a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            qrCodeData: null,
        }
    },
    methods: {
        async generateQRCode () {
            // You can customize the QR code data based on your requirements
            const employeeData = {
                name: "Juan Dela Cruz",
                position: "Developer",
                // Add more data if needed
            }

            // Convert the employee data to a JSON string
            const jsonString = JSON.stringify(employeeData)

            try {
                // Generate the QR code using the 'qrcode' library
                const dataURL = await QRCode.toDataURL(jsonString)

                // Set the QR code data to the component's data
                this.qrCodeData = dataURL
            } catch (error) {
                console.error("Error generating QR code:", error)
            }
        },
    },
}
</script>
