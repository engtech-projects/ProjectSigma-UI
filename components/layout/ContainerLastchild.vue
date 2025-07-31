<template>
    <div id="showOnlyOneChild" class="flex flex-col gap-4 [&>*]:hidden [&>:last-child]:block">
        <slot />
    </div>
</template>
