import { Card, CardHeader } from '@mui/material'
import React from 'react'
import { Skeleton } from '@mui/material'
const CardSkeleton = () => {
  return (
    <div style={{display:"flex",alignSelf:"center",flexDirection:"column",alignItems:"center",minHeight:"100%"}}> <Card elevation={3} sx={{  maxWidth:{xs:"95%",sm:"75%"}, minWidth:{xs:"95%",sm:"75%"},alignSelf:"center",mb:1,mt:2,borderRadius:"10px"}}>
    <CardHeader avatar={<Skeleton variant="circular" animation="wave" width={70} height={70}></Skeleton>} 
     title={<Skeleton  sx={{borderRadius:0}} animation="wave" ></Skeleton>} subheader={<Skeleton variant='rectangular' animation="wave"></Skeleton>} > 
     </CardHeader>
     <Skeleton variant="rectangular" animation="wave" sx={{ml:"10px",mr:"10px"}}></Skeleton>
    
      <Skeleton variant="rectangular" animation="wave" sx={{minHeight:"200px",minWidth:"250px",maxHeight:"300px",maxWidth:"100%",mt:2,position:"center",justifyContent:"center",objectFit:"scale-down"}}></Skeleton>

    
      
    {/* <Skeleton >
    </Skeleton> */}
    </Card>
    
    </div>
  )
}

export default CardSkeleton