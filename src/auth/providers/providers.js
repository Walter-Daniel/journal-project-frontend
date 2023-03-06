

export const registerWithEmail = async( { name, surname, email, password } ) => {
  
    try {

        
    } catch (error) {
        console.log(error)
        return { 
            ok: false, errorMessage: error.message
          }
    }


}
