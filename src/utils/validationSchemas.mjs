export const userValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 6,
        max: 32
      },
      errorMessage: "Username must be at least 6 characters with a max of 32"
    },
    notEmpty: {
      errorMessage: "Username cannot be empty"
    },
    isString: {
      errorMessage: "Username must be a string"
    }
  },
  displayName: {
    notEmpty: true
  }
}