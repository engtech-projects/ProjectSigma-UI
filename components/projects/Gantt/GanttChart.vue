<template>
    <div class="mb-6">
        <h1 class="text-2xl font-bold mb-8 text-center block">
            GANTT CHART, CASH FLOW, MANPOWER & EQUIPMENT UTILIZATION SCHEDULE
        </h1>
        <div id="GanttChartDIV" />
        <table class="border-collapse border w-full bg-white text-xs">
            <thead class="text-xs">
                <tr>
                    <th />
                    <th />
                    <th />
                    <th>FEBRUARY</th>
                    <th>MARCH</th>
                    <th>APRIL</th>
                    <th>MAY</th>
                    <th>JUNE</th>
                    <th>JULY</th>
                    <th>AUGUST</th>
                    <th>SEPTEMBER</th>
                    <th>OCTOBER</th>
                    <th>NOVEMBER</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="border p-2 py-1 bg-yellow-300" rowspan="2">
                        PLANNED
                    </td>
                    <td class="border p-2 py-1">
                        PLANNED ACCOMPLISHMENT PER MONTH
                    </td>
                    <td class="border p-2 py-1">
                        %AGE
                    </td>
                    <td class="border p-2 text-center py-1">
                        1%
                    </td>
                    <td class="border p-2 text-center py-1">
                        2%
                    </td>
                    <td class="border p-2 text-center py-1">
                        .05%
                    </td>
                    <td class="border p-2 text-center py-1">
                        .05%
                    </td>
                    <td class="border p-2 text-center py-1">
                        .05%
                    </td>
                    <td class="border p-2 text-center py-1">
                        .05%
                    </td>
                    <td class="border p-2 text-center py-1">
                        .05%
                    </td>
                    <td class="border p-2 text-center py-1">
                        .05%
                    </td>
                    <td class="border p-2 text-center py-1">
                        .05%
                    </td>
                    <td class="border p-2 text-center py-1">
                        .05%
                    </td>
                </tr>
                <tr>
                    <td class="border p-2 py-1">
                        CUMMULATIVE ACCOMPLISHMENT PER MONTH
                    </td>
                    <td class="border p-2 py-1">
                        %AGE
                    </td>
                    <td class="border p-2 text-center py-1">
                        1%
                    </td>
                    <td class="border p-2 text-center py-1">
                        2%
                    </td>
                    <td class="border p-2 text-center py-1">
                        .05%
                    </td>
                    <td class="border p-2 text-center py-1">
                        .05%
                    </td>
                    <td class="border p-2 text-center py-1">
                        .05%
                    </td>
                    <td class="border p-2 text-center py-1">
                        .05%
                    </td>
                    <td class="border p-2 text-center py-1">
                        .05%
                    </td>
                    <td class="border p-2 text-center py-1">
                        .05%
                    </td>
                    <td class="border p-2 text-center py-1">
                        .05%
                    </td>
                    <td class="border p-2 text-center py-1">
                        .05%
                    </td>
                </tr>
                <tr>
                    <td class="border p-2 py-1 bg-green-300" rowspan="2">
                        CASHFLOW
                    </td>
                    <td class="border p-2 py-1">
                        PROJECTED AMOUNT
                    </td>
                    <td class="border p-2 py-1">
                        PESO
                    </td>
                    <td class="border p-2 text-center py-1">
                        1,024,670.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        2,049,340.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        2,564,010.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        3,078,680.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        3,593,350.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        4,108,020.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        4,622,690.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        5,137,360.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        5,652,030.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        6,166,700.00
                    </td>
                </tr>
                <tr>
                    <td class="border p-2 py-1">
                        CUMMULATIVE AMOUNT
                    </td>
                    <td class="border p-2 py-1">
                        PESO
                    </td>
                    <td class="border p-2 text-center py-1">
                        1,024,670.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        2,049,340.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        2,049,340.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        2,564,010.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        3,078,680.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        3,593,350.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        4,108,020.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        4,622,690.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        5,137,360.00
                    </td>
                    <td class="border p-2 text-center py-1">
                        5,652,030.00
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import * as JSGantt from "jsgantt-improved"
import "jsgantt-improved/dist/jsgantt.css"

export default {
    name: "GanttChart",
    props: {
        msg: {
            type: String,
            default: ""
        },
    },
    mounted () {
        const g = new JSGantt.GanttChart(
            document.getElementById("GanttChartDIV"),
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
                description: {
                    title: "Description",
                },
                quantity: {
                    title: "Quantity",
                },
                unit: {
                    title: "Unit",
                },
                unitCost: {
                    title: "Unit Cost",
                },
                contractAmount: {
                    title: "Contract Amount",
                },
                relativeWeight: {
                    title: "Relative Weight",
                },
                totalDays: {
                    title: "Total Days",
                },
            },
            vShowRes: 0, // Resource
            vShowStartDate: 0, // Start Date
            vShowEndDate: 0, // End Date
            vShowDur: 0, // Duration
            vShowComp: 0,
            vUseSingleCell: 10000, // Set the threshold cell per table row (Helps performance for large data.
            vFormatArr: ["Day", "Week", "Month", "Quarter"], // Even with setUseSingleCell using Hour format on such a large chart can cause issues in some browsers,
        })

        useGanttData().gantt.forEach((task) => {
            g.AddTaskItemObject(task)
        })

        g.Draw()
    },
}
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  </style>
