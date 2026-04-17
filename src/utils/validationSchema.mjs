export const createUserValidation = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Username must be at least 5 characters with a max of 32 characters"
    },
    notEmpty: {
      errorMessage: "Username cannot be empty"
    },
    isString: {
      errorMessage: "Username must be a string"
    }
  }
}

export const createProductValidation = {
  name: {
    isLength: {
      options: {
        min: 3,
        max: 32
      },
      errorMessage: "Product must be at least 5 characters with a max of 32 characters"
    },
    notEmpty: {
      errorMessage: "Product cannot be empty"
    },
    isString: {
      errorMessage: "Product must be a string"
    }
  }
}