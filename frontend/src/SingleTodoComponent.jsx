import { Card } from "@mui/material";
import { React,useState,useEffect } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Typography from '@mui/material/Typography';

function SingleTodoComponent(props){
  const [displayUpdate, setdisplayUpdate]=useState(false);
    return(
      <Card sx={{backgroundColor:"#031956", margin:"7px"}}>
        <div>
          {displayUpdate?(<ComponentWithUpArrow/>):(<ComponentWithPencil/>)}
        </div>
      </Card>
    )

    function ComponentWithPencil(){
      const handleDeleteClick=async ()=>{
        console.log(props.todo);
        console.log(props.id);
        await fetch(`http://localhost:3000/todos/${props.id}`,{method:"DELETE"})
        .then(response=>response.json())
        .catch(err=>console.log(err,"err here1"))
        .then(data=>{
          let t=props.todo;
          t.splice(props.n,1);
          props.setTodo([...t]);
          console.log(data.message);
        })
        .catch(err=>console.log(err, "error in delete"));
      }
      return(
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <Typography variant="subtitle1" gutterBottom sx={{color:"whitesmoke", marginLeft:"10px", marginTop:"5px"}}>
            {props.description}
          </Typography>
          <div style={{display:"flex", justifyContent:"end"}}>
            <EditOutlinedIcon onClick={()=>setdisplayUpdate(true)} sx={{color:"green", padding:"5px"}}></EditOutlinedIcon>
            <DeleteOutlinedIcon onClick={handleDeleteClick} sx={{color:"red", padding:"5px"}}></DeleteOutlinedIcon>
          </div>
        </div>
      )
    }


    function ComponentWithUpArrow(){
      return(
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <input type="text" id="updateInput" style={{width:"100%", color:"whitesmoke", backgroundColor:"#031956", margin:"7px"}} />
          <ArrowUpwardIcon onClick={()=>{
            fetch(`http://localhost:3000/todos/${props.id}`,{
              method:"PUT",
              headers:{
                "Content-Type":"Application/json"
              },
              body:JSON.stringify({description:document.getElementById('updateInput').value})
            }).then(response=>response.json())
            .then(data=>alert(data.message))
            .catch(err=>console.log(err,"error in update"));
            setdisplayUpdate(false);
          }
          } sx={{color:"#1976D2", padding:"5px"}}></ArrowUpwardIcon>
        </div>
      )
    }

  }

  

  export default SingleTodoComponent;