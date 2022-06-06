export const ADD_TO_PROJECT = (state, { title, sDate, eDate, description, image }) => {
    state.project.push({
        title,
        sDate,
        eDate,
        description,
        image,
    });
};