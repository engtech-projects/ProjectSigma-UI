<template>
    <div class="mb-6">
        <h1 class="text-md font-bold mb-2 block">
            MANPOWER UTILIZATION SCHEDULE
        </h1>
        <div id="GanttChartDIVManpower" />
    </div>
</template>

<script setup>
import * as JSGantt from "jsgantt-improved"
import "jsgantt-improved/dist/jsgantt.css"

onMounted(() => {
    const g = new JSGantt.GanttChart(
        document.getElementById("GanttChartDIVManpower"),
        "day"
    )

    g.setOptions({
        vCaptionType: "Complete", // Set to Show Caption : None,Caption,Resource,Duration,Complete,
        vQuarterColWidth: 20,
        vDateTaskDisplayFormat: "day dd month yyyy", // Shown in tool tip box
        vDayMajorDateDisplayFormat: "mon yyyy - Week ww", // Set format to dates in the "Major" header of the "Day" view
        vWeekMinorDateDisplayFormat: "dd mon", // Set format to display dates in the "Minor" header of the "Week" view
        vLang: "en",
        vShowTaskInfoLink: 1, // Show link in tool tip (0/1)
        vShowEndWeekDate: 0, // Show/Hide the date for the last day of the week in header for daily
        vAdditionalHeaders: {
            // Add data columns to your table
            unit: {
                title: "",
            }
        },
        vShowRes: 0, // Resource
        vShowStartDate: 0, // Start Date
        vShowEndDate: 0, // End Date
        vShowDur: 0, // Duration
        vShowComp: 0,
        vUseSingleCell: 10000, // Set the threshold cell per table row (Helps performance for large data.
        vFormatArr: ["Day", "Week", "Month", "Quarter"], // Even with setUseSingleCell using Hour format on such a large chart can cause issues in some browsers,
    })

    useGanttData().manpower.forEach((task) => {
        g.AddTaskItemObject(task)
    })

    g.Draw()
})
</script>
