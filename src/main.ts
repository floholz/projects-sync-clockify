import * as core from '@actions/core'
import ClockifyApi from './clockify/clockify'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const clockifyApiKey: string = core.getInput('clockify-api-key')
    core.debug(`ClockifyApi key: ${clockifyApiKey}`)
    const clockifyWorkspaceId: string = core.getInput('clockify-workspace-id')
    core.debug(`ClockifyWorkspaceId: ${clockifyWorkspaceId}`)
    const projectUrl: string = core.getInput('project-url')
    core.debug(`GitHub Project URL: ${projectUrl}`)
    const githubToken: string = core.getInput('github-token')
    core.debug(`GitHub PAT: ${githubToken}`)

    const clockifyApi = new ClockifyApi(clockifyApiKey, clockifyWorkspaceId)

    const timeEntries = await clockifyApi.getTimeEntriesFromWeek()
    core.debug(`Number of Time Entries: ${timeEntries.length}`)
    core.setOutput('times', timeEntries)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
