export function wait (timeout = 3000) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeout)
  })
}

export function all (process = []) {
  return Promise.all(process)
}

export function race (first, second) {
  return Promise.race([first, second])
}
