

export const fileUpload = async( file ) => {
    if ( !file ) return null;

    const cloudUrl = 'https://api.cloudinary.com/v1_1/journal-project/upload';

    const formData = new FormData();
    formData.append('upload_preset','journalProject');
    formData.append('file', file );

    try {
 
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });


        if ( !resp.ok ) throw new Error('No se pudo subir imagen')
        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        return null
    }

}