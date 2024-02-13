import { writeFile } from "fs/promises"
import { v4 } from "uuid"

export default defineEventHandler(async (event) => {
    // return "This is post."

    const formData: any = await readMultipartFormData(event)

    const file = formData.find((item: any) => item.name === "file")

    const originalFileName = file.filename

    const path = "./public/job_description/" + v4() + "." + originalFileName.split(".").pop()

    await writeFile(path, file.data)
    return {
        path
    }
})
