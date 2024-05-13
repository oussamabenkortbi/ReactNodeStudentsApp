// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Student {
  id: string
  fullname: string
  subjects: string[]
  birthdate: string
  status: "paid" | "waiting" | "expired"
}

// Define a service using a base URL and expected endpoints
export const studentsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api/v1/students" }),
  reducerPath: "studentsApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Students", "Student"],
  endpoints: build => ({
    createStudent: build.mutation<Student, Partial<Student>>({
      query: student => ({
        url: "",
        method: "POST",
        body: student,
      }),
    }),
    getStudents: build.query<Student[], string>({
      query: () => ``,
      providesTags: () => [{ type: "Students" }],
    }),
    getStudent: build.query<Student, string>({
      query: id => `${id}`,
      providesTags: () => [{ type: "Student" }],
    }),
    updateStudent: build.mutation<Student, Partial<Student>>({
      query: student => ({
        url: ``,
        method: "PUT",
        body: student,
      }),
    }),
    deleteStudent: build.mutation<Student, Partial<Student>>({
      query: student => ({
        url: `${student.id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} = studentsApiSlice.endpoints;