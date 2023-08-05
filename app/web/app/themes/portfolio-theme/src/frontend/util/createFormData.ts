const createFormData = (
  obj: Record<string, string | number | boolean | object>
) => {
  const formData = new FormData()

  Object.keys(obj).forEach((key) =>
    formData.append(key, encodeURIComponent(JSON.stringify(obj[key])))
  )

  return formData
}

export default createFormData
