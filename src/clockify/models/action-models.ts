import { Tag, TimeInterval } from './api-reports-detailed'

export type ClockifyUser = {
  id: string
  email: string
  name: string
}

export type ClockifyClient = {
  id: string
  name: string
}

export type ClockifyProject = {
  id: string
  name: string
  color: string
}

export type ClockifyTimeEntry = {
  id: string
  billable: boolean
  client: ClockifyClient
  description: string
  project: ClockifyProject
  tags?: Tag[]
  timeInterval: TimeInterval
  user: ClockifyUser
}
