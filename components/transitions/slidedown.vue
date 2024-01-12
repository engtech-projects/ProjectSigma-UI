<template>
    <Transition name="slide">
        <slot />
    </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-20%);
  opacity: 0;
}
</style>
