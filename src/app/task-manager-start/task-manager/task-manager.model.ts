export interface TaskManagerModel {

  userId:string,
  taskId: string,
  taskStatus: string,
  taskKeywords: string[],
  taskTitle: string,
  taskDescription: string,
  taskDateStarted: Date,
  taskDateEnding: Date
  taskItems: {
    taskItemHeadline: string,
    taskItemDescription: string
  }[]
}