<template>
    <div id="toPrint" class="flex flex-col gap-2 bg-white w-screen p-2">
        <input type="file" accept=".xlsx" class="mb-4 print:hidden">

        <div class="flex flex-col gap-2 pt-4 border-2 border-black pb-4 min-h-[1000px] print:min-h-[1000px] relative">
            <!-- Header -->
            <div class="text-center font-bold text-xl border-b-2 pb-2 mb-2">
                BILL OF QUANTITIES (Page 1 of 1)
            </div>

            <!-- Table -->
            <div class="overflow-auto border rounded shadow p-2 print:p-0 print:shadow-none print:border-0">
                <table class="table-auto w-full border-collapse border border-gray-300 text-sm">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="border px-2 py-1" />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border px-2 py-1" />
                        </tr>
                        <tr>
                            <td class="border px-2 py-1" />
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Footer -->
            <div class="mt-6 text-xs text-right pr-4" />
        </div>
    </div>
</template>
