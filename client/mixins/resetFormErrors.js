export default {
  methods: {
    resetFormErrors (form) {
      if (form && form.errors) {
        Object.keys(form.errors).forEach(k => {
          form.errors[k] = []
        })
      }
    }
  }
}
