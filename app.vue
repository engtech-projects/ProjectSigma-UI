<template>
    <div>
        <div id="printContainer" />
        <NuxtLoadingIndicator />
        <NuxtLayout class="no-print">
            <NuxtPage />
        </NuxtLayout>
        <NuxtSnackbar />
    </div>
</template>
