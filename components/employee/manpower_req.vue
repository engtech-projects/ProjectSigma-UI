<template>
  <div class="flex mt-5 md:mt-5 w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
        <form class="max-w-full">
            
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div class="mb-5">
                    <label for="req_department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Requesting Department</label>
                    <input type="text" id="req_department" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
                <div class="mb-5">
                    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div class="div">
                            <label for="date_requested" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Requested</label>
                            <input type="date" id="date_requested" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        </div>
                        <div class="div">
                            <label for="date_required" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Required</label>
                            <input type="date" id="date_required" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div class="mb-5">
                    <label for="position_title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position / Title</label>
                    <input type="text" id="position_title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
                <div class="mb-5">
                    <label for="employment_type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employment Type</label>
                    <select id="employment_type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value="">Select options</option>
                        <option value="1">Student Trainee</option>
                        <option value="2">Project Hire</option>
                        <option value="3">Contractual</option>
                        <option value="4">Regular</option>
                    </select>
                    <!-- <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div class="flex items-center mb-4 gap-3">
                            <input id="employment-type-1" type="radio" value="1" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="employment-type-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Student Trainee</label>
                        </div>
                        <div class="flex items-center mb-4 gap-3">
                            <input id="employment-type-2" type="radio" value="2" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="employment-type-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Project Hire</label>
                        </div>
                        <div class="flex items-center mb-4 gap-3">
                            <input id="employment-type-3" type="radio" value="3" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="employment-type-3" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contractual</label>
                        </div>
                        <div class="flex items-center mb-4 gap-3">
                            <input id="employment-type-4" type="radio" value="4" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="employment-type-4" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Regular</label>
                        </div>
                    </div> -->
                </div>
            </div>
            <div class="mb-5 grid grid-cols-1 gap-6 sm:grid-cols-4">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nature of Request</label>
                    <select id="employment_type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value="">Select options</option>
                        <option value="1">New / Addition</option>
                        <option value="2">Replacement</option>
                    </select>
                    <!-- <div class="flex items-center mb-4 gap-3">
                        <input id="nature-req-1" type="radio" value="4" name="default-radio-1" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="nature-req-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">New / Addition</label>
                    </div>
                    <div class="flex items-center mb-4 gap-3">
                        <input id="nature-req-2" type="radio" value="4" name="default-radio-1" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="nature-req-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Replacement</label>
                    </div> -->
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age Range</label>
                    <input type="number" id="age_range" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                    <select id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value="">Select options</option>
                        <option value="1">Single</option>
                        <option value="2">Married</option>
                        <option value="2">No</option>
                    </select>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                    <select id="gender" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value="">Select options</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="2">No Preference</option>
                    </select>
                </div>
            </div>
            <div class="mb-5">
                <label for="educational_req" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Educational Requirement</label>
                <textarea id="educational_req" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
            </div>
            <div class="mb-5">
                <label for="pref_qualification" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preferred Qualifications / Experience (not mentioned above or in the JD)</label>
                <textarea id="pref_qualification" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
            </div>
            <div class="mb-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label for="requested_by" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Requested by</label>
                    <input type="number" id="requested_by" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    <!-- <select id="gender" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value="">Select options</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="2">No Preference</option>
                    </select> -->
                </div>
                <div>
                    <label for="approved_by" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preferred Qualifications / Experience (not mentioned above or in the JD)</label>
                    <select id="approved_by" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value="">Select options</option>
                        <option value="1">Lorem 1</option>
                        <option value="2">Lorem 2</option>
                        <option value="3">Lorem 3</option>
                    </select>
                </div>
            </div>
            <div class="mb-5">
                <label for="additional_remarks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Additional Remarks (Reason for Request)</label>
                <textarea id="additional_remarks" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
            </div>
            <div class="mb-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <div class="mb-5">
                        <label for="requested_status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Requested by</label>
                        <select id="requested_status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option value="">Select options</option>
                            <option value="1">Filled</option>
                            <option value="2">Hold</option>
                            <option value="3">Cancelled</option>
                            <option value="4">Disapproved</option>
                        </select>
                    </div>
                    <div class="mb-5">
                        <label for="hired_personnel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name of Hired Personnel</label>
                        <input type="number" id="hired_personnel" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                </div>
                <div>
                    <div class="mb-5">
                        <label for="charge_department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Charged to (Department)</label>
                        <select id="charge_department" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option value="">Select options</option>
                            <option value="1">Department 1</option>
                            <option value="2">Department 2</option>
                            <option value="3">Department 3</option>
                        </select>
                    </div>
                    <div class="mb-5">
                        <label for="breakdown_details" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Breakdown Details</label>
                        <input type="text" id="breakdown_details" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                </div>
            </div>
            <div class="mb-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div class="mb-5">
                    <label for="processed_by" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Processed by</label>
                    <select id="processed_by" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value="">Select options</option>
                        <option value="1">Lorem 1</option>
                        <option value="2">Lorem 2</option>
                        <option value="3">Lorem 3</option>
                    </select>
                </div>
                <div class="mb-5">
                    <label for="checked_by" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Checked / Approved by</label>
                    <select id="checked_by" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value="">Select options</option>
                        <option value="1">Lorem 1</option>
                        <option value="2">Lorem 2</option>
                        <option value="3">Lorem 3</option>
                    </select>
                </div>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    </div>
</template>