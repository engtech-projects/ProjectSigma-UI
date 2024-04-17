<template>
    <div class="overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700 rounded-xl">
        <div class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300">
            Notifications
        </div>
        <div>
            <a href="#" class="flex py-3 px-4 border-b   dark:hover:bg-gray-600 dark:border-gray-600">
                <div class="flex-shrink-0">
                    <img class="w-11 h-11 rounded-full" src="/avatarexample.png" alt="avatar">
                    <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700">
                        <svg aria-hidden="true" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                            <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                        </svg>
                    </div>
                </div>
                <div class="pl-3 w-full">
                    <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                        New message from
                        <span class="font-semibold text-gray-900 dark:text-white">HR Head</span>
                        : Personal Action Form has been added
                    </div>
                    <div class="flex  gap-6 text-xs font-medium text-primary-600 dark:text-primary-500">
                        a few moments ago
                        <div class="flex justify-end ml-auto">
                            <button>
                                <Icon name="material-symbols:check-circle" color="green" class="w-5 h-5" />
                            </button>
                            <button>
                                <Icon name="material-symbols:cancel" color="red" class="w-5 h-5" />
                            </button>
                            <button>
                                <Icon name="material-symbols:visibility-rounded" color="blue" class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </a>
            <a href="#" class="flex py-3 px-4 border-b dark:hover:bg-gray-600 dark:border-gray-600">
                <div class="flex-shrink-0">
                    <img class="w-11 h-11 rounded-full" src="/avatarexample.png" alt="avatar">
                    <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-700">
                        <svg
                            aria-hidden="true"
                            class="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
                            />
                        </svg>
                    </div>
                </div>
                <div class="pl-3 w-full">
                    <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                        <span class="font-semibold text-gray-900 dark:text-white">
                            Engineer1
                        </span>
                        and
                        <span class="font-medium text-gray-900 dark:text-white">
                            5 others
                        </span>
                        submitted their monthly reports.
                    </div>
                    <div class="flex text-xs font-medium text-primary-600 dark:text-primary-500">
                        10 minutes ago
                        <div class="flex justify-end ml-auto">
                            <button>
                                <Icon name="material-symbols:check-circle" color="green" class="w-5 h-5" />
                            </button>
                            <button>
                                <Icon name="material-symbols:cancel" color="red" class="w-5 h-5" />
                            </button>
                            <button>
                                <Icon name="material-symbols:visibility-rounded" color="blue" class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </a>
            <a href="#" class="flex py-3 px-4 border-b dark:hover:bg-gray-600 dark:border-gray-600">
                <div class="flex-shrink-0">
                    <img class="w-11 h-11 rounded-full" src="/avatarexample.png" alt="avatar">
                    <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white dark:border-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            class="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
                <div class="pl-3 w-full">
                    <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                        <span class="font-semibold text-gray-900 dark:text-white">HR Head</span>
                        uploaded employee records.
                    </div>
                    <div class="flex text-xs font-medium text-primary-600 dark:text-primary-500">
                        44 minutes ago
                        <div class="flex justify-end ml-auto">
                            <button>
                                <Icon name="material-symbols:check-circle" color="green" class="w-5 h-5" />
                            </button>
                            <button>
                                <Icon name="material-symbols:cancel" color="red" class="w-5 h-5" />
                            </button>
                            <button>
                                <Icon name="material-symbols:visibility-rounded" color="blue" class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <NuxtLink to="/hrms/notifications" class="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50   dark:bg-gray-600 dark:text-white dark:hover:underline">
            <div class="inline-flex items-center">
                <svg
                    aria-hidden="true"
                    class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                        fill-rule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clip-rule="evenodd"
                    />
                </svg>
                View all
            </div>
        </NuxtLink>
    </div>
</template>
