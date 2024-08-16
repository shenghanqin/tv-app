export const requestIdleCallback = window.requestIdleCallback || function (cb) {
    let start = Date.now()
    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining: () => {
          return Math.max(0, 50 - (Date.now() - start))
        },
      })
    }, 1)
  }

export const cancelIdleCallback = window.requestIdleCallback || function (id) {
    return clearTimeout(id)
}
