import axios from "axios";

export async function donorCount() {
    try {
        const res = await axios.get('/api/donors');
        const data = await res?.data;
        console.log('donor user api data=>  ', res);
        console.log('donor user api data=>  ', data);
        return data
    } catch (error) {
        console.log('donor count error');
    }
}