import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import {
  deleteTask,
  getAllTasks,
  updateTask,
  updateTaskStatus,
} from '../apis/tasks'
import { useEffect, useState } from 'react'
import { Task, TaskObject } from '../../models/tasks'

export default function TodoList() {
  const queryClient = useQueryClient()
  const [active, setActive] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])

  const {
    data: allTasks,
    isLoading,
    error,
  } = useQuery(['tasks'], () => getAllTasks())

  const taskComplete = useMutation(updateTaskStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })
  const editTask = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const removeTask = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  useEffect(() => {
    if (allTasks) {
      setTasks(allTasks)
    }
  }, [allTasks])

  if (isLoading) {
    return <div>Tasks loading...</div>
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>
  } else if (error) {
    return <div>Unknown Error</div>
  }

  function handleStatusChange(
    taskId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const isChecked = event.target.checked
    console.log(taskId, isChecked)
    taskComplete.mutate({ id: taskId, completed: isChecked })
  }

  function handleNameChange(
    taskId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const updatedTaskName = event.target.value
    editTask.mutate({ id: taskId, name: updatedTaskName })
  }

  function filterByAll() {
    if (allTasks) {
      setActive(false)
      setCompleted(false)
      setTasks(allTasks)
    }
  }

  function filterByActive() {
    if (allTasks) {
      setActive(true)
      setCompleted(false)
      setTasks(allTasks.filter((task) => task.completed === 0))
    }
  }

  function filterByCompleted() {
    if (allTasks) {
      setActive(false)
      setCompleted(true)
      setTasks(allTasks.filter((task) => task.completed === 1))
    }
  }

  function deleteTaskClick(taskId: number) {
    removeTask.mutate(taskId)
  }

  function handleClearCompleted() {}
  console.log(tasks)

  return (
    <div>
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {allTasks
          ? allTasks.map((task) => {
              return (
                <li key={task.id} className={task.completed ? 'completed' : ''}>
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={Boolean(task.completed)}
                      onChange={(event) => handleStatusChange(task.id, event)}
                    />
                    <label>{task.name}</label>
                    <button
                      className={'destroy'}
                      onClick={() => deleteTaskClick(task.id)}
                    ></button>
                  </div>
                  <input
                    className="edit"
                    value={task.name}
                    onChange={(event) => handleNameChange(task.id, event)}
                  />
                </li>
              )
            })
          : ''}
      </ul>
      <div className="footer">
        <span className="todo-count">
          <strong>
            {tasks.filter((task) => task.completed === 0).length || 0}
          </strong>{' '}
          items left
        </span>
        {allTasks && allTasks.length > 1 ? (
          <ul className="filters">
            <li>
              <button
                onClick={filterByAll}
                className={!active && !completed ? 'selected' : ''}
              >
                All
              </button>
            </li>
            <li>
              <button
                onClick={filterByActive}
                className={active ? 'selected' : ''}
              >
                Active
              </button>
            </li>
            <li>
              <button
                onClick={filterByCompleted}
                className={completed ? 'selected' : ''}
              >
                Completed
              </button>
            </li>
          </ul>
        ) : (
          <div></div>
        )}
        {allTasks &&
        allTasks?.filter((task) => task.completed === true).length > 0 ? (
          <button className="clear-completed" onClick={handleClearCompleted}>
            Clear completed
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
