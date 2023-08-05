const tryCatch = <T>(
  callback: () => T,
  fallback: T | undefined = undefined
) => {
  try {
    return callback()
  } catch {
    return fallback
  }
}

export default tryCatch
