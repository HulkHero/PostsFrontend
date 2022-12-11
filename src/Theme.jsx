import { createTheme } from "@mui/material"
const theme=createTheme({
    
    palette:{
      // mode: 'dark',
        primary:{
          main:'#0097a7'
        }
    },
    components: {
      // Changing default props
      MuiCardActionArea: {  //name of the component
        defaultProps: {
          // Name of the property
          disableRipple:true
        },
      },
    },

})

export default theme;