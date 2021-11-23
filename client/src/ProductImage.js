
import React,{Component, useState} from 'react';
import axios from 'axios';
//////////////////////////////
////////
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
/////////SCENARIO 1/////////////
const initialState = { alt: "", src: "" };

const formData = new FormData();
  
const ProductImage = () => {

    const [file, setFile] = React.useState(null)
    
    const fileHandler2 = (e) => {
        setFile(e.target.files[0])

       console.log("---file---");
       console.log(e.target.files[0]);
       
       // imgs[1]=e.target.files[0];
        imgs[1] = URL.createObjectURL(e.target.files[0]);
       console.log("---IMG------------");
       console.log(imgs[1]);
       myFunction() ;

        // Update the formData object
       formData.append( "myFile",e.target.files[0] ,e.target.files[0].name);
       console.log("---formData----");
       console.log(formData);
       //////////////////////////////////////
         axios.post('/card', formData, {
                                                     headers: {
                                                               'content-type': 'multipart/form-data',
                                                              },
                           });
      
        }
      
  
//////////////////////////////////////////////////////////////////////////////

//////////SCENARIO 2/////////

const [{ alt, src }, setPreview] = useState(initialState);

 const fileHandler = event => 
  {
       const { files } = event.target;   

       setPreview(
                   files.length
                   ? {
                        src: URL.createObjectURL(files[0]),
                        alt: files[0].name
                     }
                     : initialState

              
                 );
       
      
       

       // Update the formData object
       formData.append( "myFile",event.target.files[0] ,event.target.files[0].name);
       console.log("---formData----");
       console.log(formData);
       //////////////////////////////////////
         axios.post('/card', formData, {
                                                     headers: {
                                                               'content-type': 'multipart/form-data',
                                                                 },
                           });

 };

//////////////////////////////////////////////////////////////////////////////////////

//const [selected, setSelected] = useState(imgs[1])
const  imgs = [
  '/LOGO.PNG',
  'https://res.cloudinary.com/stealthman22/image/upload/v1586308023/new-portfolio/hero/two-cargo-ships-sailing-near-city-2144905.jpg',
];

 function myFunction() {
  document.getElementById("myImg").src = imgs[1] ;
}

  return (
    <div className="addNew">
    <h1>Product Image Upload</h1>

      <img className="preview" src={src} alt={alt} />
      <input accept="image/*" type="file" onChange={fileHandler} />

        
      <img id="original"  src={file? URL.createObjectURL(file) : null} alt={file? file.name : null}/>
      <input type="file" onChange={fileHandler2}   />
      



       <h1>Image Source</h1>
      <button onClick={() => myFunction()}> Click me</button>
      <img id="myImg" src={imgs[0]}   />

        
    </div>
  );
};



///////////////////////////////////////////////////////////////////////////////
export default ProductImage;
///////////////////////////////