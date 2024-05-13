import { useState } from "react";
import Modal from "./Modal";


const AddStudent = ({ simpleModalOpen, setSimpleModalOpen }: any) => {

    const [fullName, setFullName] = useState("");
    const [subjects, setSubjects] = useState("");
    const [resolutionStatus, setResolutionStatus] = useState("");

    return(
        <Modal
            isOpen={simpleModalOpen}
            onClose={() => setSimpleModalOpen(false)}
        >
                <div className="flex flex-col items-start rounded-xl p-5">
                <h3 className="text-zinc-800 text-center mb-4 text-3xl font-extrabold">
                    Add Student
                </h3>
                <div className="my-4 w-full">
                    <h3 className=" mb-2 text-lg font-bold text-left mx-2 text-zinc-700 ">
                    FullName
                    </h3>
                    <textarea
                    className="w-full resize-none rounded-md border border-gray-300 dark:bg-graydark p-2"
                    rows={1}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    ></textarea>
                </div>
                <div className="my-4 w-full">
                    <h3 className=" mb-2 text-lg font-bold text-left mx-2 text-zinc-700 ">
                    BirthDate
                    </h3>
                    <input type="date" id="date" className="w-full border border-zinc-300 h-11 px-2 text-xl rounded-md" />
                </div>
                <div className="my-4 w-full">
                    <h3 className=" mb-2 text-lg font-bold text-left mx-2 text-zinc-700 ">
                    Subjects
                    </h3>
                    <textarea
                    className="w-full resize-none rounded-md border border-gray-300 dark:bg-graydark p-2"
                    rows={2}
                    value={subjects}
                    onChange={(e) => setSubjects(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-4 w-full">
                    <h3 className="block text-zinc-700 text-lg font-bold text-left mx-2 mb-2">Subscription Status</h3>
                    <select
                    className="w-full p-2 h-10 border border-gray-300 rounded-md dark:bg-graydark"
                    value={resolutionStatus}
                    onChange={(e) => setResolutionStatus(e.target.value)}
                    >
                    <option value="Resolved">Waiting</option>
                    <option value="Resolved">Paid</option>
                    <option value="Pending Further Action">Expired</option>
                    </select>
                </div>
                <div className="flex items-center justify-end w-full p-6 ">
                    <button
                    className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-blue-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => {
                        setSimpleModalOpen(false);
                    }}
                    >
                    Close
                    </button>
                    <button
                    className=" mb-1 mr-1 rounded-lg bg-blue-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
                    type="button"
                    // formAction={handleResolved}
                    >
                    Add Student
                    </button>
                </div>
                </div>
        </Modal>
    )
}

export default AddStudent