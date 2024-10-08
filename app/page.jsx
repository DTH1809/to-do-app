import InputForm from "@/components/InputForm";
import PageHeader from "@/components/PageHeader";
import TaskList from "@/components/TaskList";
import { getTasks } from "@/db/getTasks";

const MainPage = async () => {
  const tasksArray = await getTasks();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 lg:px-10">
      <PageHeader text={"To Do App"} />
      <main className="w-full h-full flex flex-col lg:flex-row items-center justify-center flex-1 gap-y-2">
        <InputForm />
        <TaskList tasksArray={tasksArray} />
      </main>
    </div>
  );
};

export default MainPage;
