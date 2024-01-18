<template>
    <LayoutBoards title="Total Number of Male and Female Employee">
        <LayoutChartDoughnut
            :labels="[
                'Male',
                'Female',
            ]"
            :datas="[
                '420',
                '220',

            ]"
        />
    </LayoutBoards>
</template>
