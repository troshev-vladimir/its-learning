export type TargetTestStatus = 'in_process' | 'waiting' | 'result'
export interface ITestResult {
  result?: {
    iq?: number
    score?: number
    allowance?: boolean
  }
}
