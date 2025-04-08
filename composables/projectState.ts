export const useProjectState = () => {
    const projects = ref([
        {
            project_code: "PRF - ACS - 2025-03-0007",
            location: "LIBERTAD BUTUAN CITY , AGUSAN DEL NORTE",
            amount: "1,680.00 ",
            status: "Draft",
            created_at: "March 11 , 2025 10:22 AM",
        },
        {
            project_code: "PRF - ACS - 2025-03-0007",
            location: "LIBERTAD BUTUAN CITY , AGUSAN DEL NORTE",
            amount: "1,680.00 ",
            status: "Draft",
            created_at: "March 11 , 2025 10:22 AM",
        },
        {
            project_code: "PRF - ACS - 2025-03-0007",
            location: "LIBERTAD BUTUAN CITY , AGUSAN DEL NORTE",
            amount: "1,680.00 ",
            status: "Draft",
            created_at: "March 11 , 2025 10:22 AM",
        },
        {
            project_code: "PRF - ACS - 2025-03-0007",
            location: "LIBERTAD BUTUAN CITY , AGUSAN DEL NORTE",
            amount: "1,680.00 ",
            status: "Draft",
            created_at: "March 11 , 2025 10:22 AM",
        },
        {
            project_code: "PRF - ACS - 2025-03-0007",
            location: "LIBERTAD BUTUAN CITY , AGUSAN DEL NORTE",
            amount: "1,680.00 ",
            status: "Draft",
            created_at: "March 11 , 2025 10:22 AM",
        },
        {
            project_code: "PRF - ACS - 2025-03-0007",
            location: "LIBERTAD BUTUAN CITY , AGUSAN DEL NORTE",
            amount: "1,680.00 ",
            status: "Draft",
            created_at: "March 11 , 2025 10:22 AM",
        },
        {
            project_code: "PRF - ACS - 2025-03-0007",
            location: "LIBERTAD BUTUAN CITY , AGUSAN DEL NORTE",
            amount: "1,680.00 ",
            status: "Draft",
            created_at: "March 11 , 2025 10:22 AM",
        },
        {
            project_code: "PRF - ACS - 2025-03-0007",
            location: "LIBERTAD BUTUAN CITY , AGUSAN DEL NORTE",
            amount: "1,680.00 ",
            status: "Draft",
            created_at: "March 11 , 2025 10:22 AM",
        },
        {
            project_code: "PRF - ACS - 2025-03-0007",
            location: "LIBERTAD BUTUAN CITY , AGUSAN DEL NORTE",
            amount: "1,680.00 ",
            status: "Draft",
            created_at: "March 11 , 2025 10:22 AM",
        },
        {
            project_code: "PRF - ACS - 2025-03-0007",
            location: "LIBERTAD BUTUAN CITY , AGUSAN DEL NORTE",
            amount: "1,680.00 ",
            status: "Draft",
            created_at: "March 11 , 2025 10:22 AM",
        },
        {
            project_code: "PRF - ACS - 2025-03-0007",
            location: "LIBERTAD BUTUAN CITY , AGUSAN DEL NORTE",
            amount: "1,680.00 ",
            status: "Draft",
            created_at: "March 11 , 2025 10:22 AM",
        },
        {
            project_code: "PRF - ACS - 2025-03-0007",
            location: "LIBERTAD BUTUAN CITY , AGUSAN DEL NORTE",
            amount: "1,680.00 ",
            status: "Draft",
            created_at: "March 11 , 2025 10:22 AM",
        },
        {
            project_code: "PRF - ACS - 2025-03-0007",
            location: "LIBERTAD BUTUAN CITY , AGUSAN DEL NORTE",
            amount: "1,680.00 ",
            status: "Draft",
            created_at: "March 11 , 2025 10:22 AM",
        }
    ])
    const edit = ref(false)
    const currentPage = ref(1)
    const pageSize = ref(5) // Assuming 5 items per page
    const totalPages = ref(Math.ceil(projects.value.length / pageSize.value))

    const getCurrentPageProjects = () => {
        const startIndex = (currentPage.value - 1) * pageSize.value
        const endIndex = startIndex + pageSize.value
        return projects.value.slice(startIndex, endIndex)
    }

    const setCurrentPage = (page) => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page
        }
    }

    const nextPage = () => {
        if (currentPage.value < totalPages.value) {
            currentPage.value++
        }
    }

    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--
        }
    }

    return {
        projects,
        currentPage,
        pageSize,
        totalPages,
        edit,
        getCurrentPageProjects,
        setCurrentPage,
        nextPage,
        prevPage,
    }
}
