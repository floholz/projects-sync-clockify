import { ApiReportsDetailed } from './models/api-reports-detailed'
import { ClockifyTimeEntry, ClockifyUser } from './models/action-models'

export default class ClockifyApi {
  private readonly baseUrl = 'https://api.clockify.me/api/v1'
  private readonly reportsUrl = 'https://reports.api.clockify.me/v1'
  private readonly apiKey: string
  private readonly workspaceId: string

  constructor(apiKey: string, workspaceId: string) {
    this.apiKey = apiKey
    this.workspaceId = workspaceId
  }

  async getUsers(): Promise<ClockifyUser[]> {
    const response = await fetch(
      `${this.baseUrl}/workspaces/${this.workspaceId}/users`,
      {
        method: 'GET',
        headers: {
          'x-api-key': this.apiKey,
        },
      },
    )
    const json = await response.json()
    return json.body as ClockifyUser[]
  }

  async getTimeEntriesFromWeek(refDate?: Date): Promise<ClockifyTimeEntry[]> {
    const today = refDate ?? new Date()
    today.setUTCHours(0)
    today.setUTCMinutes(0)
    today.setUTCSeconds(0)
    today.setUTCMilliseconds(0)
    const start = new Date(today) // last Monday
    start.setUTCDate(today.getUTCDate() - ((today.getUTCDay() + 6) % 7))
    const end = new Date(start) // next Monday
    end.setUTCDate(start.getUTCDate() + 7)

    const requestBody = {
      dateRangeStart: start.toISOString(),
      dateRangeEnd: end.toISOString(),
      detailedFilter: {}, // needs to be present
    }
    const response = await fetch(
      `${this.reportsUrl}/workspaces/${this.workspaceId}/reports/detailed`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': this.apiKey,
        },
        body: JSON.stringify(requestBody),
      },
    )
    const json = await response.json()
    const detailedReportResponse = json as ApiReportsDetailed
    return detailedReportResponse.timeentries.map(entry => {
      return {
        id: entry._id,
        billable: entry.billable,
        client: {
          id: entry.clientId,
          name: entry.clientName,
        },
        description: entry.description,
        project: {
          id: entry.projectId,
          name: entry.projectName,
          color: entry.projectColor,
        },
        tags: entry.tags,
        timeInterval: entry.timeInterval,
        user: {
          id: entry.userId,
          name: entry.userName,
          email: entry.userEmail,
        },
      } as ClockifyTimeEntry
    })
  }
}
