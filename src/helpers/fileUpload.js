import journalApi from "../api/journalApi";

export const fileUpload = async(files, id) => {

    if( !files ) throw new Error( 'No tenemos ningun archivo a subir' )
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }

    // if( !file ) throw new Error( 'No tenemos ningun archivo a subir' )

  


    try {

        // const resp = await fetch( cloudUrl, {
        //     method: 'POST',
        //     body: formData
        // } )
        const { data } = await journalApi.post(`/uploads/notes/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        } );
        console.log(data, 'hola desde el try')

        const imageUrl = data.result.map( image => {
            return image.url
        } )
        // const {data} = await fetch( journalApi.post(`/uploads/notes/${id}` ), {
        //     method: 'POST',
        //     body: formData
        // } )

        // const cloudUrl = 'https://api.cloudinary.com/v1_1/journal-project/upload';
     

        // if(!resp.ok) throw new Error('La imagen no se pudo subir');
        
        // // const cloudResp = await resp.json();

        // console.log(data, 'data desde el helper')

   

        return imageUrl;
        
    } catch (error) {
        // throw new Error('Error lalaala')
        console.log(error)
    }

}