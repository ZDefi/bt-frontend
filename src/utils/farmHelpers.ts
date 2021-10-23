// const ARCHIVED_FARMS_START_PID = 139
// const ARCHIVED_FARMS_END_PID = 250

// const isArchivedPid = (pid: number) => pid >= ARCHIVED_FARMS_START_PID && pid <= ARCHIVED_FARMS_END_PID
const isArchivedPid = (pid: number) => pid < 0

export default isArchivedPid
