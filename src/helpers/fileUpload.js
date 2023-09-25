

export const fileUpload = async(file) => {

    if (!file) throw new Error('No tenemos ningun archivo para subor')

    const cloudURl = 'https://api.cloudinary.com/v1_1/dbzre01di/upload?';
    const formData = new FormData();
    formData.append('upload_preset', 'reac-journal')
    formData.append('file', file)

    try {

        const resp = await fetch(cloudURl, {
            method: 'POST', 
            body: formData
        })


        if(!resp.ok) throw new Error('No se puede subir imagen')

        const CloudResp = await resp.json();
  
        return CloudResp.secure_url;
   

    } catch (error) {
        console.log(error); 
        throw new Error(error.message)
    }

}