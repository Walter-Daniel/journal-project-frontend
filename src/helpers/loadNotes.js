import journalApi from "../api/journalApi";

export const LoadNotes = async() => {  

    const { data } = await journalApi.get('/notes');
   
    data.notes.forEach(element => {
        console.log(element)
    });
    
}