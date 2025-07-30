<script setup>
useHead({
    title: "Accounting Books",
})
const data = ref([
    {
        "Item Name": "Mobilization, Demobilization, Water & Sanitary Installation Including Provisions of 2 sets of Portable Toilets",
        Unit: "l.s.",
        "Unit Cost (PHP)": 342485.40,
        "Contract Agency Data Original Quantity": 1.00,
        "Proposed/Revised/Final Quantity": null,
        "Implementation Data/Direct Cost Unit Cost (PHP)": 300255.25,
        "Survey/Actual Quantity": 1.00,
        "Direct Cost Amount": 300255.25,
        "Savings/Overruns Quantity": 0.00,
        Amount: null
    },
    {
        "Item Name": "Provision of 140 HP Pick-Up Type Service Vehicle for the Engineer on Time Basis",
        Unit: "mo.",
        "Unit Cost (PHP)": 27414.24,
        "Contract Agency Data Original Quantity": 7.90,
        "Proposed/Revised/Final Quantity": null,
        "Implementation Data/Direct Cost Unit Cost (PHP)": 27414.24,
        "Survey/Actual Quantity": 7.80,
        "Direct Cost Amount": 214572.50,
        "Savings/Overruns Quantity": null,
        Amount: null
    },
    {
        "Item Name": "Construction Survey and Staking",
        Unit: "l.s.",
        "Unit Cost (PHP)": 31365.28,
        "Contract Agency Data Original Quantity": null,
        "Proposed/Revised/Final Quantity": null,
        "Implementation Data/Direct Cost Unit Cost (PHP)": 25557.34,
        "Survey/Actual Quantity": 7.80,
        "Direct Cost Amount": 201841.48,
        "Savings/Overruns Quantity": null,
        Amount: null
    },
    {
        "Item Name": "Occupational Safety and Health Program",
        Unit: "each",
        "Unit Cost (PHP)": 10254.18,
        "Contract Agency Data Original Quantity": null,
        "Proposed/Revised/Final Quantity": null,
        "Implementation Data/Direct Cost Unit Cost (PHP)": 16813.30,
        "Survey/Actual Quantity": 1.00,
        "Direct Cost Amount": 4082.17,
        "Savings/Overruns Quantity": null,
        Amount: null
    },
    {
        "Item Name": "Traffic Management",
        Unit: "mo.",
        "Unit Cost (PHP)": 10185.25,
        "Contract Agency Data Original Quantity": 7.90,
        "Proposed/Revised/Final Quantity": null,
        "Implementation Data/Direct Cost Unit Cost (PHP)": 18300.00,
        "Survey/Actual Quantity": 1.00,
        "Direct Cost Amount": 11200.00,
        "Savings/Overruns Quantity": null,
        Amount: null
    },
    {
        "Item Name": "Mobilization / Demobilization",
        Unit: "each",
        "Unit Cost (PHP)": 68314.00,
        "Contract Agency Data Original Quantity": 1.00,
        "Proposed/Revised/Final Quantity": null,
        "Implementation Data/Direct Cost Unit Cost (PHP)": 44336.75,
        "Survey/Actual Quantity": 1.00,
        "Direct Cost Amount": 44336.75,
        "Savings/Overruns Quantity": null,
        Amount: null
    },
    {
        "Item Name": "Individual Removal of Trees (150 mm dia. & below)",
        Unit: "each",
        "Unit Cost (PHP)": 141.32,
        "Contract Agency Data Original Quantity": 78.00,
        "Proposed/Revised/Final Quantity": 11042.32,
        "Implementation Data/Direct Cost Unit Cost (PHP)": 457.34,
        "Survey/Actual Quantity": 76.00,
        "Direct Cost Amount": 27230.10,
        "Savings/Overruns Quantity": null,
        Amount: null
    },
    {
        "Item Name": "Aggregates Subbase Course",
        Unit: "cum",
        "Unit Cost (PHP)": 938.77,
        "Contract Agency Data Original Quantity": 8415.47,
        "Proposed/Revised/Final Quantity": 7915046.59,
        "Implementation Data/Direct Cost Unit Cost (PHP)": 337.40,
        "Survey/Actual Quantity": 8425.47,
        "Direct Cost Amount": 2843711.50,
        "Savings/Overruns Quantity": null,
        Amount: null
    },
    {
        "Item Name": "Portland Cement Concrete Pavement (Unreinforced), 0.23m thick, 14 days",
        Unit: "sq.m",
        "Unit Cost (PHP)": 1424.17,
        "Contract Agency Data Original Quantity": 1094.40,
        "Proposed/Revised/Final Quantity": 1797001.45,
        "Implementation Data/Direct Cost Unit Cost (PHP)": 1388.00,
        "Survey/Actual Quantity": 1064.40,
        "Direct Cost Amount": 1476518.77,
        "Savings/Overruns Quantity": null,
        Amount: null
    },
    {
        "Item Name": "Reinforcing Steel Grade 40",
        Unit: "kg",
        "Unit Cost (PHP)": 116.78,
        "Contract Agency Data Original Quantity": 17343.00,
        "Proposed/Revised/Final Quantity": 2107296.78,
        "Implementation Data/Direct Cost Unit Cost (PHP)": 397.15,
        "Survey/Actual Quantity": 17343.00,
        "Direct Cost Amount": 1488902.06,
        "Savings/Overruns Quantity": null,
        Amount: null
    },
    {
        "Item Name": "Structural Steel Sheet Piles, Furnished, Driven",
        Unit: "m.",
        "Unit Cost (PHP)": 1130.41,
        "Contract Agency Data Original Quantity": 823.40,
        "Proposed/Revised/Final Quantity": 1050491.40,
        "Implementation Data/Direct Cost Unit Cost (PHP)": 1504.43,
        "Survey/Actual Quantity": 823.40,
        "Direct Cost Amount": 854375.20,
        "Savings/Overruns Quantity": null,
        Amount: null
    },
    {
        "Item Name": "Structural Steel Sheet Piles, Furnished, Driven",
        Unit: "m.",
        "Unit Cost (PHP)": 13790.46,
        "Contract Agency Data Original Quantity": 717.84,
        "Proposed/Revised/Final Quantity": 9899740.00,
        "Implementation Data/Direct Cost Unit Cost (PHP)": 1377.41,
        "Survey/Actual Quantity": 717.84,
        "Direct Cost Amount": 1188343.30,
        "Savings/Overruns Quantity": null,
        Amount: null
    },
    {
        "Item Name": "Steel H-Piles, Furnished",
        Unit: "m.",
        "Unit Cost (PHP)": 13790.46,
        "Contract Agency Data Original Quantity": 372.00,
        "Proposed/Revised/Final Quantity": 5131225.52,
        "Implementation Data/Direct Cost Unit Cost (PHP)": 3126.71,
        "Survey/Actual Quantity": 372.00,
        "Direct Cost Amount": 1163954.80,
        "Savings/Overruns Quantity": 180.00,
        Amount: 562807.59
    },
    {
        "Item Name": "Steel H-Piles, Driven",
        Unit: "m.",
        "Unit Cost (PHP)": 1989.21,
        "Contract Agency Data Original Quantity": 841.00,
        "Proposed/Revised/Final Quantity": 1672927.43,
        "Implementation Data/Direct Cost Unit Cost (PHP)": 218.54,
        "Survey/Actual Quantity": 841.00,
        "Direct Cost Amount": 81345.89,
        "Savings/Overruns Quantity": 165.00,
        Amount: 16368.63
    },
    {
        "Item Name": "Structural Steel Sheet Piles, Furnished, Driven",
        Unit: "m.",
        "Unit Cost (PHP)": 11445.64,
        "Contract Agency Data Original Quantity": 507.00,
        "Proposed/Revised/Final Quantity": 5807043.48,
        "Implementation Data/Direct Cost Unit Cost (PHP)": 2331.25,
        "Survey/Actual Quantity": 507.00,
        "Direct Cost Amount": 1241181.30,
        "Savings/Overruns Quantity": 2330.50,
        Amount: 538201.15
    },
    {
        "Item Name": "Structural Steel Sheet Piles, Furnished, Driven",
        Unit: "m.",
        "Unit Cost (PHP)": 11445.64,
        "Contract Agency Data Original Quantity": 371.50,
        "Proposed/Revised/Final Quantity": 7912803.19,
        "Implementation Data/Direct Cost Unit Cost (PHP)": 2371.50,
        "Survey/Actual Quantity": 371.50,
        "Direct Cost Amount": 1241181.30,
        "Savings/Overruns Quantity": 2330.50,
        Amount: 538201.15
    },
    {
        "Item Name": "Flood Exposure",
        Unit: "l.a.",
        "Unit Cost (PHP)": null,
        "Contract Agency Data Original Quantity": null,
        "Proposed/Revised/Final Quantity": null,
        "Implementation Data/Direct Cost Unit Cost (PHP)": 4501834.00,
        "Survey/Actual Quantity": 1.00,
        "Direct Cost Amount": 4501834.00,
        "Savings/Overruns Quantity": null,
        Amount: null
    }
])
</script>
<template>
    <div class="flex flex-col w-full gap-6 bg-white p-8 min-h-[1000px]">
        <DocumentTemplatesIsoHeader :page="{currentPage: 1, totalPages: 1}" />
        <div class="flex flex-col justify-center w-full">
            <h1 class="text-xl font-bold uppercase text-center py-4">
                Summary of Estimated Net Income
            </h1>
        </div>
        <div class="flex flex-col">
            <table class="text-xs mb-4">
                <thead>
                    <tr>
                        <th class="w-1/4 text-left px-2">
                            <span class="font-bold text-left">
                                PROJECT CODE:
                            </span>
                        </th>
                        <th class="h-6 border-b border-black" colspan="2" />
                    </tr>
                    <tr>
                        <th class="w-1/4 text-left px-2">
                            <span class="font-bold text-left">
                                PROJECT NAME:
                            </span>
                        </th>
                        <th class="h-6 border-b border-black" colspan="2" />
                    </tr>
                    <tr>
                        <th class="w-1/4 text-left px-2">
                            <span class="font-bold text-left">
                                LOCATION:
                            </span>
                        </th>
                        <th class="h-6 border-b border-black" colspan="2" />
                    </tr>
                    <tr>
                        <th class="w-1/4 text-left px-2">
                            <span class="font-bold text-left">
                                SCOPE OF WORK:
                            </span>
                        </th>
                        <th class="h-6 border-b border-black" colspan="2" />
                    </tr>
                </thead>
            </table>
            <table class="border border-black text-xs">
                <thead>
                    <tr>
                        <th class="border border-black py-1" rowspan="3">
                            Item Name
                        </th>
                        <th class="border border-black py-1" rowspan="3">
                            Unit
                        </th>
                        <th class="border border-black" colspan="5">
                            Contracts/Agency Data
                        </th>
                        <th class="border border-black" colspan="3">
                            Implementation Data/Direct Cost
                        </th>
                        <th class="border border-black" colspan="2">
                            Savings/No. Work-1
                        </th>
                    </tr>
                    <tr>
                        <th class="border border-black py-1" rowspan="2">
                            Unit Cost (Php)
                        </th>
                        <th class="border border-black py-1" colspan="2">
                            Original
                        </th>
                        <th class="border border-black" colspan="2">
                            Proposed/Revised
                        </th>
                        <th class="border border-black" rowspan="2">
                            Unit Cost (Php)
                        </th>
                        <th class="border border-black" rowspan="2">
                            Survey/Actual Qty
                        </th>
                        <th class="border border-black" rowspan="2">
                            Direct Cost
                        </th>
                        <th class="border border-black" rowspan="2">
                            Quantity
                        </th>
                        <th class="border border-black" rowspan="2">
                            Amount
                        </th>
                    </tr>
                    <tr>
                        <th class="border border-black">
                            Quantity
                        </th>
                        <th class="border border-black">
                            Amount
                        </th>
                        <th class="border border-black">
                            Quantity
                        </th>
                        <th class="border border-black">
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="index in data" :key="index" class="h-6">
                        <td class="border border-black px-4 h-6">
                            {{ index["Item Name"] }}
                        </td>
                        <td class="border border-black px-4 h-6">
                            {{ index["Unit"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["Unit Cost (PHP)"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["Contract Agency Data Original Quantity"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["Proposed/Revised/Final Quantity"] }}
                        </td>
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4">
                            {{ index["Implementation Data/Direct Cost Unit Cost (PHP)"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["Survey/Actual Quantity"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["Direct Cost Amount"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["Savings/Overruns Quantity"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["Amount"] }}
                        </td>
                    </tr>
                    <tr class="h-6">
                        <td class="border border-black text-center px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                    </tr>
                    <tr class="h-6">
                        <td class="border border-black text-center px-4" colspan="2">
                            TOTAL
                        </td>
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4">
                            96,501,789
                        </td>
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4">
                            37,258,451
                        </td>
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4">
                            6,521,995
                        </td>
                    </tr>
                    <!-- <tr v-for="index in 15" :key="index" class="h-6">
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black text-right px-4" />
                    </tr>
                    <tr class="h-6">
                        <td class="border border-black px-4 h-6 font-bold text-right" colspan="2">
                            TOTAL
                        </td>
                        <td class="border border-black text-right px-4" />
                    </tr> -->
                </tbody>
            </table>
            <div class="max-w-md mx-auto bg-white rounded-lg">
                <div class="grid grid-cols-2 gap-1 text-xs">
                    <div class="text-left font-medium">
                        Direct Cost:
                    </div>
                    <div class="text-right border-b border-black">
                        38.36%
                    </div>
                    <div class="text-left font-medium">
                        Indirect:
                    </div>
                    <div class="text-right border-b border-black" />
                    <div class="text-left font-medium">
                        Tax:
                    </div>
                    <div class="text-right border-b border-black" />
                    <div class="text-left font-medium">
                        Net:
                    </div>
                    <div class="text-right border-b border-black" />
                    <div class="text-left font-medium">
                        Savings:
                    </div>
                    <div class="text-right border-b border-black" />
                    <div class="text-left font-medium col-span-2">
                        Expected Net Income (Net + Savings):
                    </div>
                </div>
            </div>
            <HrmsReportsSignaturesRow>
                <FormSignatory
                    label="PREPARED BY"
                    :signatory="{
                        name: '',
                        title: ''
                    }"
                />
                <FormSignatory
                    label="CHECKED & REVIEWED BY"
                    :signatory="{
                        name: '',
                        title: ''
                    }"
                />
                <FormSignatory
                    label="RECOMMENDING APPROVAL"
                    :signatory="{
                        name: '',
                        title: ''
                    }"
                />
                <FormSignatory
                    label="APPROVED BY"
                    :signatory="{
                        name: '',
                        title: ''
                    }"
                />
            </HrmsReportsSignaturesRow>
        </div>
        <div class="flex justify-end py-4 pt-6">
            <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-12 h-8">
                <Icon name="ic:outline-local-printshop" class="text-white h-6 w-6" />
            </button>
        </div>
    </div>
</template>

<style scoped>
    .border-double {
        border-style: double!important;
    }
</style>
