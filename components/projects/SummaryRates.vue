<template>
    <div class="flex flex-col">
        <h1 class="text-2xl text-black uppercase font-semibold text-center mb-6">
            Summary of Rates
        </h1>
        <div class="flex flex-col gap-2" @click="resetActiveCost($event)">
            <h3 class="text-gray-500 uppercase text-md text-center">
                Cost of Materials
            </h3>
            <div class="flex flex-col border-t border-blue-500 border-dashed">
                <table>
                    <tbody>
                        <tr v-for="(item, index) in costData['cost of materials']" :key="index">
                            <td>
                                {{ item.item }}
                            </td>
                            <td class="w-3/12">
                                <div class="flex flex-between w-full" @dblclick="activateCost($event, index)">
                                    <input v-if="activeCost === index" v-model="item.quantity" type="text" class="border-0 bg-gray-100 h-7 w-24 text-right">
                                    <span v-else class="flex-1 text-right">{{ item.quantity }}</span>
                                    <span class="flex-1 text-center">/</span>
                                    <span class="flex-1 text-left">{{ item.unit }}</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <h3 class="text-gray-500 uppercase text-md text-center">
                Labor Cost
            </h3>
            <div class="flex flex-col border-t border-blue-500 border-dashed">
                <table>
                    <tbody>
                        <tr v-for="(item, index) in costData['labor cost']" :key="index">
                            <td>
                                {{ item.item }}
                            </td>
                            <td class="w-3/12">
                                <div class="flex flex-between w-full">
                                    <span class="flex-1 text-right">{{ item.rate }}</span>
                                    <span class="flex-1 text-center">/</span>
                                    <span class="flex-1 text-left">{{ item.unit }}</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="flex justify-end py-4 pt-6">
            <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-12 h-8">
                <Icon name="ic:outline-local-printshop" class="text-white h-6 w-6" />
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const activeCost = ref(null)
const resetActiveCost = (event: Event) => {
    if ((event.target as HTMLElement).tagName !== "INPUT") {
        activeCost.value = null
    }
}
const activateCost = (event: Event, index: number) => {
    activeCost.value = index

    nextTick(() => {
        // Find the newly rendered input inside the parent div
        const target = event.currentTarget as HTMLElement
        const inputChild = target.querySelector("input")

        if (inputChild) {
            (inputChild as HTMLInputElement).focus()
            inputChild.select()
        }
    })
}
const costData = {
    "cost of materials": [
        {
            item: "1\"x2\"x4\" sticks",
            quantity: 160,
            unit: "bndl."
        },
        {
            item: "3/4 Gravel",
            quantity: 1402.89,
            unit: "cu.m."
        },
        {
            item: "Aggregate Subbase Course (with 15% Shrinkage Factor)",
            quantity: 700,
            unit: "cu.m."
        },
        {
            item: "Aggregates G1",
            quantity: 1402.89,
            unit: "cu.m."
        },
        {
            item: "Body Hardness & Lanyards",
            quantity: 3.5,
            unit: "man-day"
        },
        {
            item: "Boulders",
            quantity: 700,
            unit: "cu.m."
        },
        {
            item: "Cement",
            quantity: 273,
            unit: "bag"
        },
        {
            item: "Coco Log",
            quantity: 410,
            unit: "m"
        },
        {
            item: "Common Borrow (with 25% Shrinkage Factor)",
            quantity: 370,
            unit: "cu.m."
        },
        {
            item: "Concrete Stainless Sprayer",
            quantity: 3000,
            unit: "pc(s)"
        },
        {
            item: "Construction of Field Office for the Engineer (Bunk House with Complete Electrical, Water & Sanitary",
            quantity: 630000,
            unit: "l.s."
        },
        {
            item: "Covid 19 Rapid Antibody Test",
            quantity: 1000,
            unit: "each"
        },
        {
            item: "Curing Compound",
            quantity: 35,
            unit: "ltr(s)"
        },
        {
            item: "CWN (Assorted)",
            quantity: 85,
            unit: "kgs."
        },
        {
            item: "Disinfection Spray",
            quantity: 1000,
            unit: "can"
        },
        {
            item: "Dust Mask",
            quantity: 10,
            unit: "man-day"
        },
        {
            item: "Ear Muff",
            quantity: 0.85,
            unit: "man-day"
        },
        {
            item: "Ethyl Alcohol",
            quantity: 185,
            unit: "li."
        },
        {
            item: "Eye Googles",
            quantity: 5,
            unit: "man-day"
        },
        {
            item: "Fine Aggregates",
            quantity: 1402.89,
            unit: "cu.m."
        },
        {
            item: "Hard Asphalt",
            quantity: 1980,
            unit: "bag(s)"
        },
        {
            item: "Liquid Hand Soap",
            quantity: 200,
            unit: "can"
        }
    ],
    "labor cost": [
        {
            item: "Chain Men",
            rate: 49.25,
            unit: "hr."
        },
        {
            item: "Chief of Party (Geodetic Engineer)",
            rate: 124.82,
            unit: "hr."
        },
        {
            item: "Construction Foreman",
            rate: 95,
            unit: "hr."
        },
        {
            item: "Designer (Highway Engineer)",
            rate: 124.82,
            unit: "hr."
        },
        {
            item: "Draftsman (CAD Operator)",
            rate: 88.21,
            unit: "hr."
        },
        {
            item: "Driver",
            rate: 63.85,
            unit: "hr."
        },
        {
            item: "Estimator (Quantity Engineer)",
            rate: 88.21,
            unit: "hr."
        },
        {
            item: "Health Personnel",
            rate: 50,
            unit: "hr."
        },
        {
            item: "Instrument Man",
            rate: 88.21,
            unit: "hr."
        },
        {
            item: "Recorder (Horizontal and Vertical Control)",
            rate: 88.21,
            unit: "hr."
        },
        {
            item: "Rod Men",
            rate: 49.25,
            unit: "hr."
        },
        {
            item: "Safety Practitioner/Officer",
            rate: 50,
            unit: "hr."
        },
        {
            item: "Sanitation Aide",
            rate: 50,
            unit: "hr."
        },
        {
            item: "Sight Men (Foresight and Backsight)",
            rate: 49.25,
            unit: "hr."
        },
        {
            item: "Skilled Laborer",
            rate: 65,
            unit: "hr."
        },
        {
            item: "Unskilled Laborer",
            rate: 50,
            unit: "hr."
        }
    ]
}
</script>

<style>

</style>
