<template>
  <div class="shadow-md p-4 mt-6 bg-white mb-3 border border-gray-200 rounded-lg w-full">
    <div class="flex items-center gap-20 md:justify-center p-4" >
    
      <div class="text-2xl p-3 lg:text-4xl text-center ">
        <h1 class="font-bold text-7xl text-green-500">EVENPAR</h1>
        <h4 class="font-medium text-sm "> CONSTRUCTION AND DEVELOPMENT CORPORATION</h4>
        <h6 class="font-normal text-xs">P-1, Poblacion 8, Buenavista, Agusan Del Norte</h6>
        <h6 class="font-normal text-xs">email address: evenparcorporation@gmail.com</h6>
      </div>
      <div>
        <img
          class="w-32 h-32 dark:ring-gray-500 mx-auto block logo "
          src="/evenpar.jpg"
          alt="Evenpar Logo"
        />
      </div>
    </div>  
    <div>
      <div class="flex flex-col">
        <div><p class="font-bold text-xl text-green-500">EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION</p></div>
        <div><p class="font-normal text-xs">P-1, Poblacion 8, Buenavista, Agusan Del Norte</p></div>
        <div><p class="font-normal text-xs italic">email address: evenparcorporation@gmail.com</p></div>
        
      </div>

      <!-- <div class="text-2xl p-3 lg:text-4xl text-center ">
        <p class="font-bold text-xl text-green-500">EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION</p>
        <p class="font-normal text-xs">P-1, Poblacion 8, Buenavista, Agusan Del Norte</p>
        <p class="font-normal text-xs italic">email address: evenparcorporation@gmail.com</p>
        
      </div> -->
      
      
      <form>
        
        <div class="w-full md:flex gap-2">
          <div class="md:w-1/3 py-2">
            <form>
              <div class="md:flex w-full ">
                <div class="w-full">
                  <div
                    class="md:grid lg:grid grid-cols-1 border-dashed rounded-lg border-2 border-gray-400 p-4 gap-10"
                  >
                    <div>
                      <p class="text-xl font-semibold pb-4 uppercase">
                        Personnel Action Notice
                      </p>
                      <div class="md:grid lg:grid grid-cols-3 gap-4">
                        <div class="relative z-0 mb-6 w-full group">
                          <input
                            type="text"
                            value="Juan"
                            name="floating_fname"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                            placeholder=" "
                            
                          /><label
                            for="floating_fname"
                            class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                            >First Name</label
                          >
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                          <input
                            type="text"
                            value="Dela"
                            name="floating_mname"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                            placeholder=" "
                            disabled=""
                          /><label
                            for="floating_mname"
                            class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                            >Middle Name</label
                          >
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                          <input
                            type="text"
                            value="Cruz"
                            name="floating_lname"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                            placeholder=" "
                            disabled=""
                          /><label
                            for="floating_lname"
                            class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                            >Last Name</label
                          >
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                          <select
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                          >
                            <option value="">-SELECT-</option>
                            <option value="Jr">Jr</option>
                            <option value="Sr">Sr.</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                            <option value="V">V</option></select
                          ><label
                            for="floating_lname"
                            class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                            >Extension</label
                          >
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                          <input
                            type="date"
                            name="floating_birthday"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                            placeholder=" "
                            disabled=""
                          /><label
                            for="floating_birthday"
                            class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                            >Birthday</label
                          >
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                          <select
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                          >
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Devorce">Devorce</option>
                            <option value="Widow">Widow</option></select
                          ><label
                            for="floating_status"
                            class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                            >Status</label
                          >
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                          <select
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                          >
                            <option value="">-Select-</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option></select
                          ><label
                            for="floating_gender"
                            class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                            >Gender</label
                          >
                        </div>
                      </div>
                    </div>
                    <div>
                      <p class="text-xl font-semibold pb-4 underline">
                        Employment Information
                      </p>
                      <div class="md:grid lg:grid grid-cols-2 gap-4">
                        <div class="relative z-0 mb-6 w-full group">
                          <select
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                          >
                            <option value="D">Department 1</option>
                            <option value="D">Department 2</option></select
                          ><label
                            for="floating_deparment"
                            class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                            >Department</label
                          >
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                          <input
                            type="date"
                            name="floating_hiredDate"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                            placeholder=" "
                            disabled=""
                          /><label
                            for="floating_hiredDate"
                            class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                            >Hired Date</label
                          >
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                          <input
                            type="number"
                            name="floating_rate"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                            placeholder=" "
                            disabled=""
                          /><label
                            for="floating_rate"
                            class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                            >Rate</label
                          >
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                          <input
                            type="text"
                            name="floating_jobTitle"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                            placeholder=" "
                            disabled=""
                          /><label
                            for="floating_jobTitle"
                            class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                            >Middle Name</label
                          >
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                          <select
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                          >
                            <option value="D">Employement Type 1</option>
                            <option value="D">Probationary</option></select
                          ><label
                            for="floating_employementType"
                            class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                            >Employement Type</label
                          >
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                          <input
                            type="number"
                            name="floating_mobile"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                            placeholder=" "
                            disabled=""
                          /><label
                            for="floating_mobile"
                            class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                            >Mobile Number</label
                          >
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                          <input
                            type="number"
                            name="floating_phoneNumber"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                            placeholder=" "
                            disabled=""
                          /><label
                            for="floating_phoneNumber"
                            class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                            >Phone Number</label
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <!-- <div class="md:w-3/4 py-2">
            <div class="w-full p-2">
              <p class="font-semibold text-xl">ACTION TO BE TAKEN</p>
            </div>
            <div class="md:flex gap-2">
              <div class="w-full p-2">
                <div class="relative z-0 mb-6 w-full group">
                  <select
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                  >
                    <option value="Regularization">Regularization</option>
                    <option value="Promotion">Promotion</option>
                    <option value="Salary Increase">Salary Increase</option>
                    <option value="Transfer">Transfer</option></select
                  ><label
                    for="floating_status"
                    class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                    >Status</label
                  >
                </div>
              </div>
              <div class="w-full p-2">
                <div class="relative z-0 mb-6 w-full group">
                  <input
                    type="date"
                    name="floating_date_effective"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                    placeholder=" "
                    required=""
                  /><label
                    for="floating_date_effective"
                    class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                    >Date Effective</label
                  >
                </div>
              </div>
            </div>
            <div class="w-full p-2 md:mt-10">
              <div class="relative z-0 mb-6 w-full group">
                <select
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                >
                  <option value="Department">Department</option>
                  <option value="Basic Salary">Basic Salary</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Meal ALlowance">
                    Meal ALlowance
                  </option></select
                ><label
                  for="floating_status"
                  class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                  >Category</label
                >
              </div>
            </div>
            <div class="w-full md:grid md:grid-cols-2">
              <div class="w-full p-2">
                <div class="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="floating_from_current"
                    value="example-current-data"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                    placeholder=" "
                    required=""
                    disabled=""
                  /><label
                    for="floating_from_current"
                    class="absolute text-md text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                    >From / Current</label
                  >
                </div>
              </div>
              <div class="w-full p-2">
                <div class="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="floating_to"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                    placeholder=" "
                    required=""
                  /><label
                    for="floating_to"
                    class="absolute text-md text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                    >To</label
                  >
                </div>
              </div>
            </div>
            <div class="w-full md:grid md:grid-cols-3 md:mt-10">
              <div class="w-full p-2">
                <div class="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="floating_sss"
                    value="example-current-data"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                    placeholder=" "
                    required=""
                    disabled=""
                  /><label
                    for="floating_sss"
                    class="absolute text-md text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                    >SSS NO.</label
                  >
                </div>
              </div>
              <div class="w-full p-2">
                <div class="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="floating_pagibig"
                    value="example-current-data"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                    placeholder=" "
                    required=""
                    disabled=""
                  /><label
                    for="floating_pagibig"
                    class="absolute text-md text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                    >PAG-IBIG NO.</label
                  >
                </div>
              </div>
              <div class="w-full p-2">
                <div class="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="floating_taxExcemption"
                    value="example-current-data"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                    placeholder=" "
                    required=""
                    disabled=""
                  /><label
                    for="floating_taxExcemption"
                    class="absolute text-md text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                    >TIN NO.</label
                  >
                </div>
              </div>
              <div class="w-full p-2">
                <div class="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="floating_tin"
                    value="example-current-data"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                    placeholder=" "
                    required=""
                    disabled=""
                  /><label
                    for="floating_tin"
                    class="absolute text-md text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                    >PHIC NO.</label
                  >
                </div>
              </div>
              <div class="w-full p-2">
                <div class="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="floating_phic"
                    value="example-current-data"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                    placeholder=" "
                    required=""
                    disabled=""
                  /><label
                    for="floating_phic"
                    class="absolute text-md text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                    >ATM ACCOUNT NO.</label
                  >
                </div>
              </div>
              <div class="w-full p-2">
                <div class="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="floating_atm_acc_no"
                    value="example-current-data"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                    placeholder=" "
                    required=""
                    disabled=""
                  /><label
                    for="floating_atm_acc_no"
                    class="absolute text-md text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
                    >TAX EXCEMPTION</label
                  >
                </div>
              </div>
            </div>
            <div class="w-full p-2">
              <p class="font-semibold text-xl">JUSTIFICATION / REMARKS</p>
            </div>
            <div class="mb-2">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your message</label
              ><textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>
            <div class="flex justify-end mb-2 p-2">
              <button
                type="submit"
                class="flex gap-2 justify-center text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                <svg
                  class="w-6 h-6 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path
                    d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"
                  ></path>
                </svg>
                Add Announcement
              </button>
            </div>
          </div> -->
        </div>
      </form>
    </div>
  </div>
</template>