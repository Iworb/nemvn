export default {
  methods: {
    catchFormErrors (form, err) {
      if (form && form.errors && err.response && err.response.data && err.response.data.error && err.response.data.error.fields) {
        const fields = err.response.data.error.fields
        Object.keys(fields).forEach(k => {
          if (form.errors.hasOwnProperty(k) && typeof form.errors[k] === 'object') {
            form.errors[k].push(fields[k])
          }
        })
      }
    }
  }
}
