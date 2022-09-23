export const SET_USER = "SET_USER";
export const SET_TOKEN = "SET_TOKEN";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});
export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

export const fetchUser = (key) => {
  const baseEndpoint = "https://striveschool-api.herokuapp.com/api/profile/me";
  const header = {
    "Content-type": "application/json",
    Authorization: `Bearer ${key}`,
  };

  return async (dispatch, getState) => {
    try {
      const response = await fetch(baseEndpoint, {
        method: "GET",
        headers: header,
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
        dispatch(setToken(key));
        console.log(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
