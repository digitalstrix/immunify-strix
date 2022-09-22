import React from 'react'
import MainContext from './MainContext'

// const baseUrl = 'http://localhost:5000';
const baseUrl = 'http://ap-2.celestiq.com:5000';

const Mainstate = (props) => {
    // const getPodcast = async (id = '', name = '', UserId = '', author = '') => {
    const getPodcast = async (id = '') => {
        try {
            // const response = await fetch(`${baseUrl}/podcast/get?id=${id}&name=${name}&UserId=${UserId}&author=${author}`, {
            let url;
            if (id !== '') {
                url = `${baseUrl}/podcast/get?id=${id}`;
            }
            else {
                url = `${baseUrl}/podcast/get`;
            }

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const createPodcast = async (data1) => {
        try {
            // console.log(data1);
            const formData = new FormData();
            formData.append("photos", data1.photos);
            formData.append("name", data1.name);
            formData.append("UserId", data1.UserId);
            formData.append("slug", data1.slug);
            formData.append("content", data1.content);
            formData.append("PodcastCategoryId", data1.PodcastCategoryId);
            const response = await fetch(`${baseUrl}/podcast/upload`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data1)
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const updatePodcast = async (data1) => {
        try {
            const formData = new FormData();
            formData.append("name", data1.name);
            formData.append("status", data1.status);
            formData.append("photos", data1.photos);

            const response = await fetch(`${baseUrl}/podcast/update?id=${data1.id}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: formData
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const deletePodcast = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/podcast/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    // const getPost = async (id = '', title = '', type = '', slug = '', categories = '') => {
    const getPost = async (id = '') => {
        try {
            // const response = await fetch(`${baseUrl}/blog/get?id=${id}&title=${title}&type=${type}&slug=${slug}?categories=${categories}`, {
            let url;
            if (id !== '') {
                url = `${baseUrl}/blog/get?id=${id}`;
            }
            else {
                url = `${baseUrl}/blog/get`;
            }

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const createPost = async (data1) => {
        try {
            const response = await fetch(`${baseUrl}/blog/create`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data1)
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const updatePost = async (data1) => {
        try {
            const response = await fetch(`${baseUrl}/blog/update?id=${data1.id}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data1)
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const deletePost = async (id, user) => {
        try {
            const response = await fetch(`${baseUrl}/blog/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ user })
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    // const getWhitenoise = async (id = '', name = '', UserId = '', author = '') => {
    const getWhitenoise = async (id = '') => {
        try {
            // const response = await fetch(`${baseUrl}/whitenoise/get?id=${id}&name=${name}&UserId=${UserId}&author=${author}`, {
            let url;
            if (id !== '') {
                url = `${baseUrl}/whitenoise/get?id=${id}`;
            }
            else {
                url = `${baseUrl}/whitenoise/get`;
            }
            console.log(url);

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const createWhitenoise = async (data) => {
        try {
            const formData = new FormData();
            formData.append("whitenoise", data.whitenoise);
            formData.append("name", data.name);
            formData.append("UserId", data.UserId);

            const response = await fetch(`${baseUrl}/whitenoise/upload`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: formData
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateWhitenoise = async (data) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("status", data.status);
            formData.append("whitenoise", data.whitenoise);

            const response = await fetch(`${baseUrl}/whitenoise/update?id=${data.id}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: formData
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const deleteWhitenoise = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/whitenoise/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    // const getMusic = async (id = '', name = '', UserId = '', author = '') => {
    const getMusic = async (id = '') => {
        try {
            // const response = await fetch(`${baseUrl}/music/get?id=${id}&name=${name}&UserId=${UserId}&author=${author}`, {
            let url;
            if (id !== '') {
                url = `${baseUrl}/music/get?id=${id}`;
            }
            else {
                url = `${baseUrl}/music/get`;
            }

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const createMusic = async (data) => {
        try {
            const formData = new FormData();
            formData.append("music", data.music);
            formData.append("name", data.name);
            formData.append("UserId", data.UserId);

            const response = await fetch(`${baseUrl}/music/upload`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: formData
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateMusic = async (data) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("status", data.status);
            formData.append("music", data.music);

            const response = await fetch(`${baseUrl}/music/update?id=${data.id}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: formData
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const deleteMusic = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/music/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    // const getQuestion = async (id = '', question = '', status = '', author = '') => {
    const getQuestion = async () => {
        try {
            // const response = await fetch(`${baseUrl}/question/get?id=${id}&question=${question}&status=${status}&author=${author}`, {
            const response = await fetch(`${baseUrl}/question/get`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const createQuestion = async (data) => {
        try {
            const formData = new FormData();
            formData.append("question", data.question);
            formData.append("UserId", data.UserId);

            const response = await fetch(`${baseUrl}/question/create`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: formData
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateQuestion = async (data) => {
        try {
            const formData = new FormData();
            formData.append("question", data.question);

            const response = await fetch(`${baseUrl}/question/update?id=${data.id}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: formData
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const deleteQuestion = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/question/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    // const getAnswer = async (id = '', QuestionId = '', status = '', author = '') => {
    const getAnswer = async () => {
        try {
            // const response = await fetch(`${baseUrl}/answer/get?id=${id}&QuestionId=${QuestionId}&status=${status}&author=${author}`, {
            const response = await fetch(`${baseUrl}/answer/get`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const createAnswer = async (data) => {
        try {
            const formData = new FormData();
            formData.append("QuestionId", data.QuestionId);
            formData.append("UserId", data.UserId);
            formData.append("answer", data.answer);

            const response = await fetch(`${baseUrl}/answer/create`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: formData
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateAnswer = async (data) => {
        try {
            const formData = new FormData();
            formData.append("answer", data.answer);
            formData.append("status", data.status);

            const response = await fetch(`${baseUrl}/answer/update?id=${data.id}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: formData
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAnswer = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/answer/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    // const getCategory = async (id = '', type = '', status = '', name = '', parent_id = '') => {
    const getCategory = async () => {
        try {
            // const response = await fetch(`${baseUrl}/category/get?id=${id}&type=${type}&status=${status}&name=${name}&parent_id=${parent_id}`, {
            const response = await fetch(`${baseUrl}/category/get`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            // console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const createCategory = async (data) => {
        try {
            console.log(data);
            const response = await fetch(`${baseUrl}/category/create`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const data1 = await response.json();
            console.log(data1);
            return data1;
        } catch (error) {
            console.log(error);
        }
    };

    const updateCategory = async (data1) => {
        try {
            const response = await fetch(`${baseUrl}/category/update?id=${data1.id}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data1)
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCategory = async (id, user) => {
        try {
            const response = await fetch(`${baseUrl}/category/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ user })
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const getAppointment = async () => {
        try {
            // const response = await fetch(`${baseUrl}/appointment/get?id=${id}&start=${start}&end=${end}&status=${status}&author=${author}`, {
            const response = await fetch(`${baseUrl}/appointment/get`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const createAppointment = async (data1) => {
        try {
            const response = await fetch(`${baseUrl}/appointment/create`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data1)
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateAppointment = async (data1) => {
        try {
            const response = await fetch(`${baseUrl}/appointment/update?id=${data1.id}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data1)
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAppointment = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/appointment/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <MainContext.Provider value={{ getPodcast, createPodcast, updatePodcast, deletePodcast, getPost, createPost, updatePost, deletePost, getWhitenoise, createWhitenoise, updateWhitenoise, deleteWhitenoise, getMusic, createMusic, updateMusic, deleteMusic, getQuestion, createQuestion, updateQuestion, deleteQuestion, getAnswer, createAnswer, updateAnswer, deleteAnswer, getCategory, createCategory, updateCategory, deleteCategory, getAppointment, createAppointment, updateAppointment, deleteAppointment }}>
                {props.children}
            </MainContext.Provider>
        </>
    )
}

export default Mainstate;
