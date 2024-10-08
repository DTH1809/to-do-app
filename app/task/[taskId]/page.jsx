import PageHeader from "@/components/PageHeader";
import UpdateForm from "@/components/UpdateForm";
import { getTaskById } from "@/db/getTaskById";
import React from "react";

const TaskPage = async ({ params }) => {
  const taskId = params.taskId;
  const taskData = await getTaskById(taskId);
  console.log("task data", taskData);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 lg:px-10">
      <PageHeader text="Update Task" />
      <main className="w-full h-full flex flex-col lg:flex-row items-center justify-center flex-1 gap-y-2">
        <UpdateForm taskData={taskData} />
      </main>
    </div>
  );
};

export default TaskPage;
