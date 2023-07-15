import { PhotoCamera } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { api } from "../api";
import Swal from "sweetalert2";
import { uniqueId } from "lodash";


// recebe o paramentro "setIMGC" sendo um usestate=false apos o upload completo retornara um true no "setIMGC"
// se produto=true ele vai salvar como imagem de produto
// se produto=false salva como imagem de cliente
export default function UploadImage({setIMGC,produto}){
    return(
        <IconButton className='col-1' id="Camera" color="success" aria-label="upload picture" component="label">
              <input id='img' hidden accept="image/*" type="file"
                onChange={(ee) => {


                  const files = ee.target.files;
                  let uploadedFiles = []
                  // console.log(files)

                  for (let iterator of files) {

                    uploadedFiles.push(
                      {
                        "file": iterator,
                        "id": uniqueId(),//definindo um id unico 
                        "name": iterator.name,
                        "prod": false,
                        "readableSize": iterator.size,
                        preview: URL.createObjectURL(iterator), // criando um link para preview da foto carregada
                        url: URL.createObjectURL(iterator),// sera usado para setar a variavel img no proprietario/index.js
                      }
                    )
                  }



                  // CRIANDO UM DATAFORM
                  const data = new FormData();
                  data.append('file', uploadedFiles[0].file, uploadedFiles[0].name);

                  // SALVANDO NOVA IMAGEM

                  try {
                    api.post(`${produto?"/insertImageP":"/uploadImage"}`, data, {
                      // onUploadProgress: e => {
                      //   let progress = parseInt(Math.round((e.loaded * 100) / e.total));
                      //   setProgress(a => a + progress)
                      // }
                    }).then(r => {


                      // document.location.reload()

                      Swal.fire(
                        'Imagem Salva!',
                        '',
                        'success'
                      )
                      setIMGC(a => !a)


                    })

                  } catch (error) {
                    
                    alert("formato nao aceito");
                  }
                }}
              />
              <PhotoCamera />
            </IconButton>
    )
}