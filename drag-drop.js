const dropArea= document.querySelector(".drag-area");
dragText = dropArea.querySelector("p");
button = dropArea.querySelector("button");
input = dropArea.querySelector("input");
let file;    //global variable  and used in every function

button.onclick = ()=>{
    input.click();
}
input.addEventListener("change",function(){
    file= this.files[0];
    showFile();
    dropArea.classList.add("active");
})

// If user Drag File in DragArea
dropArea.addEventListener("dragover",(event)=>{
    event.preventDefault();   //prevent from default behavior
    dropArea.classList.add("active");
    dragText.textContent ="Release to Upload File";
});

// If user leaves Dragged File from DragArea
dropArea.addEventListener("dragleave",()=>{
    dropArea.classList.remove("active");
    dragText.textContent ="Drag & Drop to Upload File";
}); 

// If user Drop File on DragArea
dropArea.addEventListener("drop",(event)=>{
    event.preventDefault();
    dropArea.classList.remove("active");
    //getting user select file
    file =event.dataTransfer.files[0]; //It will only select 1st picture out of multiple 
    showFile();
});

   function showFile(){
    let fileType = file.type;
    console.log(fileType);

    let validExtensions=["image/jpeg","image/jpg","image/png"];
    if(validExtensions.includes(fileType)){
        let fileReader = new FileReader();
        fileReader.onload=()=>{
            let fileURL = fileReader.result;
            console.log(fileURL);
            let imgTag = `<img src="${fileURL}" alt="image">`;
            dropArea.innerHTML= imgTag;
        }
        fileReader.readAsDataURL(file);
        }
    else{
        alert("this is not an image file !");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
} 