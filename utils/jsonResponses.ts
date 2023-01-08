export function getSuccessJsonResponse(message: String = 'Success', data: Object = {}) {
  return {
    data: data,
    message: message,
    ts: Date.now()
  }
}

export function getErrorJsonResponse(message: String = 'Error', data: Object = {}) {
  return {
    data: data,
    message: message,
    ts: Date.now()
  }
}
