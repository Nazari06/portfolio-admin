import axios from 'axios';

export const addToProject = ({ commit }, { title, sDate, eDate, description, image }) => {
    commit('ADD_TO_PROJECT', { title, sDate, eDate, description, image });
    const url = "http://localhost:8000/api/save_project";
    axios.post(url, {
        title: title,
        description: description,
        start_date: sDate,
        end_date: eDate,
        image: image,
    })
}