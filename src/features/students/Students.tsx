import { useState } from "react"
import styles from "./Students.module.css"
import { PenLine, Trash2 } from "lucide-react"
import UpdateStudent from "../../components/UpdateStudent"
import { useDeleteStudentMutation, useGetStudentsQuery } from "./studentsApiEndpoints"

export const Students = () => {
  const [updateModal, setUpdateModal] = useState(false);
  // Using a query hook automatically fetches data and returns query values
  const getStudents = useGetStudentsQuery("");
  const [deleteStudent] = useDeleteStudentMutation();

  const handleUpdate = () => setUpdateModal(!updateModal);

  const handleDelete = async (id: string) => {
    try {
      await deleteStudent({ id });
      getStudents.refetch();
    } catch (err) {
      console.error('Failed to delete student:', err);
    }
  };

  if (getStudents.isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    )
  }

  if (getStudents.isLoading || !getStudents.data) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (getStudents.isSuccess) {
    return (
      <div className={styles.container}>
        <div className="flex flex-col my-14">
            <div className=" grid grid-cols-11 p-2 bg-zinc-100 rounded-lg bg-gray-2 sm:grid-cols-11">
                <div className="p-2.5 xl:py-2 col-span-2">
                    <h5 className="text-lg font-semibold uppercase xsm:text-base">
                        Student
                    </h5>
                </div>
                <div className="p-2.5 text-center xl:py-2 col-span-2">
                    <h5 className="text-lg font-semibold uppercase xsm:text-base">
                        BirthDate
                    </h5>
                </div>
                <div className="p-2.5 text-center xl:py-2 col-span-2 ">
                    <h5 className="text-lg font-semibold uppercase xsm:text-base">
                        Subjects
                    </h5>
                </div>
                <div className="p-2.5 text-center xl:py-2 col-span-2 ">
                    <h5 className="text-lg font-semibold uppercase xsm:text-base">
                        Status
                    </h5>
                </div>
                <div className="hidden p-2.5 text-center sm:block xl:py-2 col-span-3 ">
                    <h5 className="text-lg font-semibold uppercase xsm:text-base">
                        Actions
                    </h5>
                </div>
            </div>

            {getStudents.data.students.map((student) => (
                <div key={student.id} className="grid grid-cols-10 px-2 my-2 h-16 items-center sm:grid-cols-11 rounded-lg ">
                    <div className=" p-2 xl:py-2 col-span-2">
                        <p className="text-black text-lg ">{student.fullname}</p>
                    </div>
                    <div className=" p-2 xl:py-2 col-span-2">
                        <p className="text-blue-500 text-lg font-medium">{student.birthdate}</p>
                    </div>
                    <div className=" p-2 xl:py-2 col-span-2">
                        <p className="text-black text-lg ">{student.subjects}</p>
                    </div>

                    <div className=" flex items-center justify-center p-2.5 xl:py-2 col-span-2">
                        <p className={`text-zinc-800 rounded-lg w-fit opacity-70 font-bold text-lg px-4 py-2 ${student.status === 'paid'
                                ? "text-success bg-green-200"
                                : student.status === 'waiting'
                                    ? "text-warning bg-blue-200"
                                    : "text-danger bg-red-200"
                            }`}>
                            {student.status}
                        </p>
                    </div>

                    <div className=" items-center justify-center col-span-3 space-x-4 p-2 xl:py-3 xl:px-1">
                        <button onClick={handleUpdate} className="hover:text-blue-500">
                            <div className="group relative mx-1 mt-2 transform scale-100 hover:scale-110 transition-transform">
                                <PenLine size={30} color="#666" />
                                <span className="absolute top-8 right-0 w-22 scale-0 rounded-xl border border-blue-600 bg-white bg-opacity-90 p-1 px-2 text-md font-black text-sm text-center text-zinc-900 group-hover:scale-100">Update</span>
                            </div>
                        </button>
                        <button onClick={() => handleDelete(student.id)} className="hover:text-blue-500">
                            <div className="group relative mx-1 mt-2 transform scale-100 hover:scale-110 transition-transform">
                                <Trash2 size={30} color="#666" />
                                <span className="absolute top-8 right-0 w-22 scale-0 rounded-xl border border-blue-600 bg-white bg-opacity-90 p-1 px-2 text-md font-black text-sm text-center text-zinc-900 group-hover:scale-100">Delete</span>
                            </div>
                        </button>
                    </div>
                    {updateModal && <UpdateStudent student={student} updateModal={updateModal} setUpdateModal={setUpdateModal} />}
                </div>
            ))}
        </div>
      </div>
    )
  }

  return null
}
