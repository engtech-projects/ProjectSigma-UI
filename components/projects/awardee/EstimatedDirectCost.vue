<script setup>
useHead({
    title: "Accounting Books",
})
const data = ref([
    {
        "Pay Item No.": "A.1(1)",
        Description: "Construction of Field Office for the Engineer (Steel Sheet with Complete Electrical, Water & Sanitary Installation including Provision of 2 sets of Multimodal Toilet Boxes)",
        "Unit Price": 442486.40,
        "ORIGINAL CONTRACT CONT Unit": "l.s.",
        "ORIGINAL CONTRACT CONT Quantity": 1,
        "ORIGINAL CONTRACT CONT Amount": 442486.40,
        "DIRECT COST Materials": 291254.00,
        "DIRECT COST Labor": 13176.00,
        "DIRECT COST Equipment": 41308.76,
        "DIRECT COST Fuel / Oil Cost": 1445.49,
        "DIRECT COST Overhead Cost": null,
        TOTAL: 509800.25,
        "UNIT COST PER ITEM": 509800.25
    },
    {
        "Pay Item No.": "A.1(3b)",
        Description: "Provision of 140 HP Pick-Up Type Service Vehicle for the Engineer on Base Rental Basis ( ) and Brand - New Pick-Up Type Service Vehicle",
        "Unit Price": 27414.24,
        "ORIGINAL CONTRACT CONT Unit": "mo.",
        "ORIGINAL CONTRACT CONT Quantity": 7.9,
        "ORIGINAL CONTRACT CONT Amount": 216572.50,
        "DIRECT COST Materials": null,
        "DIRECT COST Labor": 216572.50,
        "DIRECT COST Equipment": null,
        "DIRECT COST Fuel / Oil Cost": null,
        "DIRECT COST Overhead Cost": null,
        TOTAL: 216572.50,
        "UNIT COST PER ITEM": 27414.24
    },
    {
        "Pay Item No.": "A.1(3b)",
        Description: "Operation and Maintenance of 140 HP Pick-Up Type Service Vehicle for the Engineer",
        "Unit Price": 31365.28,
        "ORIGINAL CONTRACT CONT Unit": "mo.",
        "ORIGINAL CONTRACT CONT Quantity": 7.9,
        "ORIGINAL CONTRACT CONT Amount": 287835.75,
        "DIRECT COST Materials": 79000.00,
        "DIRECT COST Labor": null,
        "DIRECT COST Equipment": null,
        "DIRECT COST Fuel / Oil Cost": 122803.43,
        "DIRECT COST Overhead Cost": null,
        TOTAL: 201803.43,
        "UNIT COST PER ITEM": 25544.74
    },
    {
        "Pay Item No.": "B.4(7)",
        Description: "Construction Survey and Staking",
        "Unit Price": 92388.18,
        "ORIGINAL CONTRACT CONT Unit": "km.",
        "ORIGINAL CONTRACT CONT Quantity": 0.18,
        "ORIGINAL CONTRACT CONT Amount": 16630.18,
        "DIRECT COST Materials": null,
        "DIRECT COST Labor": null,
        "DIRECT COST Equipment": 4560.77,
        "DIRECT COST Fuel / Oil Cost": null,
        "DIRECT COST Overhead Cost": null,
        TOTAL: 4560.77,
        "UNIT COST PER ITEM": 25337.61
    },
    {
        "Pay Item No.": "B.5",
        Description: "Project Billboard/Signboard (DPWH) - 1 piece 1' x 4' x 8' Tarpaulin, 1 piece 10' x 4' x 8' Tarpaulin",
        "Unit Price": 92388.18,
        "ORIGINAL CONTRACT CONT Unit": "l.s.",
        "ORIGINAL CONTRACT CONT Quantity": 1,
        "ORIGINAL CONTRACT CONT Amount": 9751.15,
        "DIRECT COST Materials": 3000.00,
        "DIRECT COST Labor": null,
        "DIRECT COST Equipment": null,
        "DIRECT COST Fuel / Oil Cost": 10250.00,
        "DIRECT COST Overhead Cost": null,
        TOTAL: 4080.00,
        "UNIT COST PER ITEM": 4080.00
    },
    {
        "Pay Item No.": "B.6(1)",
        Description: "Occupational Safety and Health Program",
        "Unit Price": 175975.10,
        "ORIGINAL CONTRACT CONT Unit": "l.s.",
        "ORIGINAL CONTRACT CONT Quantity": 1,
        "ORIGINAL CONTRACT CONT Amount": 175975.10,
        "DIRECT COST Materials": 85000.00,
        "DIRECT COST Labor": null,
        "DIRECT COST Equipment": null,
        "DIRECT COST Fuel / Oil Cost": 10250.00,
        "DIRECT COST Overhead Cost": null,
        TOTAL: 188300.00,
        "UNIT COST PER ITEM": 188300.00
    },
    {
        "Pay Item No.": "B.7(1)",
        Description: "Traffic Management",
        "Unit Price": 34191.36,
        "ORIGINAL CONTRACT CONT Unit": "mo.",
        "ORIGINAL CONTRACT CONT Quantity": 7.9,
        "ORIGINAL CONTRACT CONT Amount": 250442.84,
        "DIRECT COST Materials": 15300.00,
        "DIRECT COST Labor": null,
        "DIRECT COST Equipment": null,
        "DIRECT COST Fuel / Oil Cost": null,
        "DIRECT COST Overhead Cost": null,
        TOTAL: 15300.00,
        "UNIT COST PER ITEM": 1936.71
    },
    {
        "Pay Item No.": "B.8(1)",
        Description: "Mobilization / Demobilization",
        "Unit Price": 64364.00,
        "ORIGINAL CONTRACT CONT Unit": "l.s.",
        "ORIGINAL CONTRACT CONT Quantity": 1,
        "ORIGINAL CONTRACT CONT Amount": 64364.00,
        "DIRECT COST Materials": null,
        "DIRECT COST Labor": 3750.75,
        "DIRECT COST Equipment": 44336.75,
        "DIRECT COST Fuel / Oil Cost": null,
        "DIRECT COST Overhead Cost": null,
        TOTAL: 44336.75,
        "UNIT COST PER ITEM": 44336.75
    },
    {
        "Pay Item No.": "1700(103)",
        Description: "Individual Removal of Trees (150 mm dia & below)",
        "Unit Price": 141.32,
        "ORIGINAL CONTRACT CONT Unit": "each",
        "ORIGINAL CONTRACT CONT Quantity": 78,
        "ORIGINAL CONTRACT CONT Amount": 11042.32,
        "DIRECT COST Materials": null,
        "DIRECT COST Labor": 28444.00,
        "DIRECT COST Equipment": 3100.10,
        "DIRECT COST Fuel / Oil Cost": 11495.00,
        "DIRECT COST Overhead Cost": null,
        TOTAL: 457.34,
        "UNIT COST PER ITEM": 457.34
    },
    {
        "Pay Item No.": "1701(2)",
        Description: "Dismantle Extension",
        "Unit Price": 611.52,
        "ORIGINAL CONTRACT CONT Unit": "cu.m.",
        "ORIGINAL CONTRACT CONT Quantity": 3503.00,
        "ORIGINAL CONTRACT CONT Amount": 2142153.56,
        "DIRECT COST Materials": null,
        "DIRECT COST Labor": 755482.11,
        "DIRECT COST Equipment": 256221.47,
        "DIRECT COST Fuel / Oil Cost": 425638.00,
        "DIRECT COST Overhead Cost": null,
        TOTAL: 1413341.64,
        "UNIT COST PER ITEM": 282.55
    },
    {
        "Pay Item No.": "1704(1)b",
        Description: "Dismantled Rock Borrow",
        "Unit Price": 938.33,
        "ORIGINAL CONTRACT CONT Unit": "cu.m.",
        "ORIGINAL CONTRACT CONT Quantity": 8415.47,
        "ORIGINAL CONTRACT CONT Amount": 7915046.59,
        "DIRECT COST Materials": 1213296.81,
        "DIRECT COST Labor": 872442.63,
        "DIRECT COST Equipment": 622471.76,
        "DIRECT COST Fuel / Oil Cost": 339000.00,
        "DIRECT COST Overhead Cost": null,
        TOTAL: 3047211.20,
        "UNIT COST PER ITEM": 362.09
    },
    {
        "Pay Item No.": "200(1)",
        Description: "Aggregate Subbase Course",
        "Unit Price": 1287.97,
        "ORIGINAL CONTRACT CONT Unit": "cu.m.",
        "ORIGINAL CONTRACT CONT Quantity": 318.38,
        "ORIGINAL CONTRACT CONT Amount": 409763.91,
        "DIRECT COST Materials": 77500.00,
        "DIRECT COST Labor": 18456.30,
        "DIRECT COST Equipment": 73548.43,
        "DIRECT COST Fuel / Oil Cost": 117253.77,
        "DIRECT COST Overhead Cost": null,
        TOTAL: 286758.50,
        "UNIT COST PER ITEM": 932.54
    },
    {
        "Pay Item No.": "311(1)a1",
        Description: "Portland Cement Concrete Pavement (Unreinforced), 0.23m thick, 14 days",
        "Unit Price": 1642.07,
        "ORIGINAL CONTRACT CONT Unit": "sq.m.",
        "ORIGINAL CONTRACT CONT Quantity": 1094.40,
        "ORIGINAL CONTRACT CONT Amount": 1797001.45,
        "DIRECT COST Materials": 898129.94,
        "DIRECT COST Labor": 221291.39,
        "DIRECT COST Equipment": 447381.15,
        "DIRECT COST Fuel / Oil Cost": 19000.00,
        "DIRECT COST Overhead Cost": null,
        TOTAL: 2176338.37,
        "UNIT COST PER ITEM": 1988.43
    },
    {
        "Pay Item No.": "404(1)",
        Description: "Concrete (Class A)",
        "Unit Price": 10574.95,
        "ORIGINAL CONTRACT CONT Unit": "cu.m.",
        "ORIGINAL CONTRACT CONT Quantity": 146.3,
        "ORIGINAL CONTRACT CONT Amount": 1496299.77,
        "DIRECT COST Materials": 872483.00,
        "DIRECT COST Labor": 304494.52,
        "DIRECT COST Equipment": 205193.91,
        "DIRECT COST Fuel / Oil Cost": 34500.00,
        "DIRECT COST Overhead Cost": null,
        TOTAL: 1330338.12,
        "UNIT COST PER ITEM": 8971.34
    },
    {
        "Pay Item No.": "407(1)",
        Description: "Reinforcing Steel Grade 40",
        "Unit Price": 118.00,
        "ORIGINAL CONTRACT CONT Unit": "kg.",
        "ORIGINAL CONTRACT CONT Quantity": 17343.0,
        "ORIGINAL CONTRACT CONT Amount": 2046474.00,
        "DIRECT COST Materials": 1107148.00,
        "DIRECT COST Labor": 257944.40,
        "DIRECT COST Equipment": 287971.45,
        "DIRECT COST Fuel / Oil Cost": null,
        "DIRECT COST Overhead Cost": null,
        TOTAL: 1653063.85,
        "UNIT COST PER ITEM": 81.76
    },
    {
        "Pay Item No.": "500(1)",
        Description: "Steel Sheet Rock Embankment",
        "Unit Price": 1130.00,
        "ORIGINAL CONTRACT CONT Unit": "cu.m.",
        "ORIGINAL CONTRACT CONT Quantity": 823.40,
        "ORIGINAL CONTRACT CONT Amount": 930442.00,
        "DIRECT COST Materials": 407427.53,
        "DIRECT COST Labor": 223455.43,
        "DIRECT COST Equipment": 273000.00,
        "DIRECT COST Fuel / Oil Cost": 139130.30,
        "DIRECT COST Overhead Cost": null,
        TOTAL: 1043013.26,
        "UNIT COST PER ITEM": 1266.62
    }
])
</script>
<template>
    <div class="flex flex-col w-full gap-6 bg-white p-8 min-h-[1000px]">
        <AccountingCommonEvenparHeader :page="{currentPage: 1, totalPages: 1}" />
        <div class="flex flex-col justify-center w-full">
            <h1 class="text-xl font-bold uppercase text-center">
                Summary of Estimated Direct Cost
            </h1>
            <h2 class="text-lg font-bold uppercase text-center py-2">
                Revision NO._____
            </h2>
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
                </thead>
            </table>
            <table class="border border-black text-xs">
                <thead>
                    <tr>
                        <th class="border border-black py-1" rowspan="2">
                            Pay Item No.
                        </th>
                        <th class="border border-black py-1" rowspan="2">
                            Description
                        </th>
                        <th class="border border-black" rowspan="2">
                            Unit Price
                        </th>
                        <th class="border border-black" colspan="3">
                            ORIGINAL CONTRACT COST
                        </th>
                        <th class="border border-black" colspan="5">
                            DIRECT COST
                        </th>
                        <th class="border border-black" rowspan="2">
                            TOTAL
                        </th>
                        <th class="border border-black" rowspan="2">
                            UNIT COST PER ITEM
                        </th>
                    </tr>
                    <tr>
                        <th class="border border-black py-1">
                            Quantity
                        </th>
                        <th class="border border-black py-1">
                            Unit
                        </th>
                        <th class="border border-black">
                            Amount
                        </th>
                        <th class="border border-black">
                            Materials
                        </th>
                        <th class="border border-black">
                            Equipment
                        </th>
                        <th class="border border-black">
                            Labor
                        </th>
                        <th class="border border-black">
                            Fuel/OIL Cost
                        </th>
                        <th class="border border-black">
                            Overhead Cost
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="index in data" :key="index" class="h-6">
                        <td class="border border-black px-4 h-6">
                            {{ index["Pay Item No."] }}
                        </td>
                        <td class="border border-black px-4 h-6">
                            {{ index["Description"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["Unit Price"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["ORIGINAL CONTRACT CONT Quantity"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["ORIGINAL CONTRACT CONT Unit"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["ORIGINAL CONTRACT CONT Amount"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["DIRECT COST Materials"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["DIRECT COST Equipment"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["DIRECT COST Labor"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["DIRECT COST Fuel / Oil Cost"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["DIRECT COST Overhead Cost"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["TOTAL"] }}
                        </td>
                        <td class="border border-black text-right px-4">
                            {{ index["UNIT COST PER ITEM"] }}
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
        </div>
    </div>
</template>

<style scoped>
    .border-double {
        border-style: double!important;
    }
</style>
