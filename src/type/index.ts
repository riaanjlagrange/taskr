export * from './actions'

export type Project = {
  id: number
  title: string
  description: string
  userId: number
  issues?: Issue[] | null
  createdAt: string
  updatedAt: string
}

export type Issue = {
  id: number
  title: string
  status: string
  priority: string
  projectId: number
  createdAt: string
  updatedAt: string
}

