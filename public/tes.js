let x=document.getElementById('sidemenu');
const fxn=()=>{
    console.log('hi');
    x.style.width='250px';
}
const ex=()=>{
    x.style.width='0';
}

function preview_image(event) 
{
 var reader = new FileReader();
 reader.onload = function()
 {
  var output = document.getElementById('imgg');
  output.src = reader.result;
  output.style.display='inline-block'
 }
 reader.readAsDataURL(event.target.files[0]);
}