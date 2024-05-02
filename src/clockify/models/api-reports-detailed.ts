export interface ApiReportsDetailed {
  totals: Total[]
  timeentries: Timeentry[]
}

export interface Total {
  totalTime: number
  totalBillableTime: number
  entriesCount: number
  amounts: Amount[]
  numOfCurrencies: number
  _id: string
  totalAmount: number
  totalAmountByCurrency: TotalAmountByCurrency[]
}

export interface Amount {
  type: string
  value: number
  amountByCurrency: AmountByCurrency[]
}

export interface AmountByCurrency {
  currency: string
  amount: number
}

export interface TotalAmountByCurrency {
  currency: string
  amount: number
}

export interface Timeentry {
  _id: string
  description: string
  userId: string
  timeInterval: TimeInterval
  billable: boolean
  projectId?: string
  taskId: string
  approvalRequestId: string
  type: string
  isLocked: boolean
  currency: string
  amount: number
  rate: number
  earnedAmount: number
  earnedRate: number
  costAmount: number
  costRate: number
  userName: string
  userEmail: string
  projectName?: string
  projectColor?: string
  clientName?: string
  clientId?: string
  tags?: Tag[]
  tagIds: string
}

export interface TimeInterval {
  start: string
  end: string
  duration: number
}

export interface Tag {
  name: string
  _id: string
}
