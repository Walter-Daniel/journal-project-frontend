import journalApi from "../api/journalApi";

export const LoadNotes = async(id) => {  

    try {
        const { data } = await journalApi.get(`/notes/${id}`);
        return data.notes
    } catch (error) {
        console.log('error al obtener las notas')
    }
    
}