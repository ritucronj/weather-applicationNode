const display=document.getElementById('display');

const input=document.getElementById('location');

 document.getElementById('inputform').addEventListener('submit',(e)=>{
    display.innerHTML='Loading....';
 fetch(`http://localhost:3000/weather?address=${input.value}`).then(response=>response.json())
         .then(data=>{
             if(data.error){
                display.innerHTML=data.error;
             }
             else if(data.Error){
              display.innerHTML=data.Error;
             }
             else{
                 let output="";
                 output+=`
                 <p class="lead">${data.location}</p>
                 <p>${data.forecast}</p>
                  `
                
                display.innerHTML=output;
             }
         })

 input.value="";
 e.preventDefault();
 })     





        

      

      
