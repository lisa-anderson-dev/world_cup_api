import axios from "axios";

export const fetchPosts = () => async(dispatch, getState) => {
    dispatch({type: "FETCH_POSTS_REQUEST"});
    try {
        const response = await axios.get("http://worldcup.sfg.io/matches");
        dispatch ({
            type: "FETCH_POSTS_SUCCESS",
            items: response.data
        });
    }
    catch(error) {
        dispatch ({
            type: "FETCH_POSTS_FAILURE",
            error
        });
    }
}