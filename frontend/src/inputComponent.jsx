import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
function InputComponent(){
    

    const onSubmit=e=>{
      
        const description=document.getElementById('inputBoxDescription').value;
        if(description===""){
          alert("field is empty");
        }
        else{
           let tod={"description":description};
           console.log(tod);
          fetch("http://localhost:3000/todos",{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify(tod)
          }).then(response=>response.json())
          .then(response=>alert(response.message))
          .catch((err)=>console.log(err, "error here"));
        }
    }
    return (
        <div style={{display:"flex",  justifyContent:"center"}}>
            <TextField 
            id='inputBoxDescription' 
            label="Todo" 
            variant="outlined" 
            sx={{
              "& .MuiInputBase-root": {//style for input box
                color: 'white', 
                height:40, 
                marginTop:1, 
                backgroundColor:"#031956"
                },
              "& .MuiFormLabel-root":{color:'#8d93b5'},/*label color */
              borderRadius:"10px", 
              marginLeft:"7px"
              }}/>
            <Button onClick={onSubmit} variant="contained" sx={{margin:"7px", height:"40px"}}>Add todo</Button>
        </div>
    )
}

export default InputComponent;