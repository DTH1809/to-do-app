import InputForm from '@/components/InputForm'
import PageHeader from '@/components/PageHeader'
import TaskList from '@/components/TaskList'
import { getTasks } from '@/db/getTasks'


const MainPage = async () => {

  const tasksArray = await getTasks()

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900 p-2 px-10">
      <PageHeader />
      <main className="w-full h-full flex items-center justify-center flex-1">
        <InputForm />
        <TaskList tasksArray={tasksArray} />
      </main>
    </div>
  )
}

export default MainPage