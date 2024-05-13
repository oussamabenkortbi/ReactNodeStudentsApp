import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const API = import.meta.env.VITE_API_URL;

interface Student {
  id: string
  fullname: string
  subjects: string[]
  birthdate: string
  status: "paid" | "waiting" | "expired"
}

interface StudentsApiResponse {
  students: Student[];
}

// Define a service using a base URL and expected endpoints
export const studentsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API + "/students" }),
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
    getStudents: build.query<StudentsApiResponse, string>({
      query: () => ``,
      providesTags: () => [{ type: "Students" }],
    }),
    getStudent: build.query<Student, Partial<Student>>({
      query: student => `${student.id}`,
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
});


export const {
  useCreateStudentMutation,
  useGetStudentsQuery,
  useGetStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApiSlice;