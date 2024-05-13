import { PenLine, Trash2 } from "lucide-react"
import { useState } from "react";
import UpdateStudent from "./UpdateStudent";

const studentsData = [
    {
        id: 1,
        fullName: 'John Doe',
        dateOfBirth: '1998-05-15',
        subjects: 'Biology',
        status: 'paid',
      },
      {
        id: 2,
        fullName: 'Jane Smith',
        dateOfBirth: '1999-08-20',
        subjects: 'Geography',
        status: 'waiting',
      },
      {
        id: 3,
        fullName: 'Alice Johnson',
        dateOfBirth: '2000-02-10',
        subjects: 'Literature',
        status: 'expired',
      },
      {
        id: 4,
        fullName: 'Bob Brown',
        dateOfBirth: '1997-11-30',
        subjects: 'Mathematics',
        status: 'paid',
      },
];

export default function Table() {

    const [updateModal, setUpdateModal] = useState(false);
    
    return (
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
    
            {studentsData.map((student) => (
            <div className="grid grid-cols-10 px-2 my-2 h-16 items-center sm:grid-cols-11 rounded-lg " key={student.id}>
                <div className=" p-2 xl:py-2 col-span-2">
                    <p className="text-black text-lg ">{student.fullName}</p>
                </div>
                <div className=" p-2 xl:py-2 col-span-2">
                    <p className="text-blue-500 text-lg font-medium">{student.dateOfBirth}</p>
                </div>
                <div className=" p-2 xl:py-2 col-span-2">
                    <p className="text-black text-lg ">{student.subjects}</p>
                </div>

                <div className=" flex items-center justify-center p-2.5 xl:py-2 col-span-2">
                   <p className={`text-zinc-800 rounded-lg w-fit opacity-70 font-bold text-lg px-4 py-2 ${
                        student.status === 'paid'
                            ? "text-success bg-green-200"
                            : student.status === 'waiting'
                            ? "text-warning bg-blue-200" 
                            : "text-danger bg-red-200"
                        }`}>
                        {student.status}
                    </p>
                </div>

                <div className=" items-center justify-center col-span-3 space-x-4 p-2 xl:py-3 xl:px-1">
                    <button onClick={()=> setUpdateModal(!updateModal)} className="hover:text-blue-500">
                        <div className="group relative mx-1 mt-2 transform scale-100 hover:scale-110 transition-transform">
                            <PenLine size={30} color="#666" />
                            <span className="absolute top-8 right-0 w-22 scale-0 rounded-xl border border-blue-600 bg-white bg-opacity-90 p-1 px-2 text-md font-black text-sm text-center text-zinc-900 group-hover:scale-100">Update</span>
                        </div>
                    </button>
                    <button className="hover:text-blue-500">
                        <div className="group relative mx-1 mt-2 transform scale-100 hover:scale-110 transition-transform">
                            <Trash2 size={30} color="#666" /> 
                            <span className="absolute top-8 right-0 w-22 scale-0 rounded-xl border border-blue-600 bg-white bg-opacity-90 p-1 px-2 text-md font-black text-sm text-center text-zinc-900 group-hover:scale-100">Delete</span>
                        </div>
                    </button>
                </div>
                { updateModal && <UpdateStudent updateModal={updateModal} setUpdateModal={setUpdateModal} />}
            </div>
        ))}
      </div>
    )
}