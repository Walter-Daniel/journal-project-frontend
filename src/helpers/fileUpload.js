import journalApi from "../api/journalApi";

export const fileUpload = async(files, id) => {

    if( !files ) throw new Error( 'No tenemos ningun archivo a subir' );
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    };

    try {

        const { data } = await journalApi.post(`/uploads/notes/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        });
        

        const imageUrl = data.result.map( image => {
            return image.url
        });  

        return imageUrl;
        
    } catch (error) {
        throw new Error(error)
    }

}