import { ChangeEvent, FormEvent, useState } from "react";
import Modal from "./Modal";
import { useUpdateStudentMutation, useGetStudentsQuery } from "../features/students/studentsApiEndpoints";

const UpdateStudent = ({ student, updateModal, setUpdateModal }: any) => {

    const [fullname, setFullName] = useState<string>(student.fullname);
    const [subjects, setSubjects] = useState<string[]>(student.subjects);
    const [birthdate, setBirthdate] = useState<string>(student.birthdate);
    const [status, setStatus] = useState<'paid' | 'waiting' | 'expired'>(student.status);

    const [updateStudent, { isLoading }] = useUpdateStudentMutation();
    const getStudents = useGetStudentsQuery("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          // Calling the `updateStudent` function with the student data
          await updateStudent({ id: student.id, fullname, birthdate, status, subjects });
          setUpdateModal(!updateModal);
          // refetch getStudents to update state
          getStudents.refetch();
        } catch (err) {
          console.error('Failed to update student:', err);
        }
    };

    const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        if (value === 'paid' || value === 'waiting' || value === 'expired') {
            setStatus(value);
        }
    }

    const handleSubjectsChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
        e.preventDefault();
        const newSubjects = [...subjects];
        newSubjects[i] = e.target.value;
        setSubjects(newSubjects);
    };

    const addSubject = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSubjects([...subjects, ""]);
    };

    return(
        <Modal
            isOpen={updateModal}
            onClose={() => setUpdateModal(!updateModal)}
        >
            <form onSubmit={handleSubmit} className="flex flex-col items-start rounded-xl p-5">
                <h3 className="text-zinc-800 text-center mb-4 text-3xl font-extrabold">
                    Update Student
                </h3>
                <div className="my-4 w-full">
                    <h3 className=" mb-2 text-lg font-bold text-left mx-2 text-zinc-700 ">
                    FullName
                    </h3>
                    <textarea
                    className="w-full resize-none rounded-md border border-gray-300 dark:bg-graydark p-2"
                    rows={1}
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    ></textarea>
                </div>
                <div className="my-4 w-full">
                    <h3 className=" mb-2 text-lg font-bold text-left mx-2 text-zinc-700 ">
                    BirthDate
                    </h3>
                    <input value={birthdate} onChange={(e) => setBirthdate(e.target.value)} type="date" id="date" className="w-full border border-zinc-300 h-11 px-2 text-xl rounded-md" />
                </div>
                <div className="my-4 w-full">
                    <h3 className="mb-2 text-lg font-bold text-left mx-2 text-zinc-700">
                        Subjects
                    </h3>
                    {
                        subjects.map((subject, i) => <input
                            key={i}
                            className="w-full resize-none rounded-md border border-gray-300 dark:bg-graydark p-2"
                            value={subject}
                            onChange={(e) => handleSubjectsChange(e, i)}
                        />)
                    }
                    <button
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={addSubject}
                    >
                        Add Subject
                    </button>
                </div>
                <div className="mb-4 w-full">
                    <h3 className="block text-zinc-700 text-lg font-bold text-left mx-2 mb-2">Subscription Status</h3>
                    <select
                        className="w-full p-2 h-10 border border-gray-300 rounded-md dark:bg-graydark"
                        value={status}
                        onChange={handleStatus}
                    >
                    <option value="paid">Paid</option>
                    <option value="waiting">Waiting</option>
                    <option value="expired">Expired</option>
                    </select>
                </div>
                <div className="flex items-center justify-end w-full p-6 ">
                    <button
                        className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-blue-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                        type="button"
                        onClick={() => {
                            setUpdateModal(false);
                        }}
                    >
                        Close
                    </button>
                    <button
                        className={`mb-1 mr-1 rounded-lg bg-blue-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600 ${isLoading && "bg-zinc-500"}`}
                        type="submit"
                    >
                        Update Student
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default UpdateStudent;