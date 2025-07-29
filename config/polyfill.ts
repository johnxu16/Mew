function queueMicrotask(callback) {
  if (typeof window !== 'undefined' && window.queueMicrotask) {
    window.queueMicrotask(callback)
  }
  else {
    Promise.resolve()
      .then(callback)
      .catch(err => setTimeout(() => {
        throw err
      }))
  }
}

export default queueMicrotask
