import axios from "../axios-DB";

// Utility functions
export const getRequest = async (uri) => {
	console.log(uri)
	try {
		let response = await axios.get(uri);

		return {
			data: response.data,
			error: null,
		};
	} catch (error) {
		return {
			data: null,
			error: error,
		};
	}
};

export const postRequest = async (uri, data) => {
	try {
		let response = await axios.post(uri, data);

		return {
			data: response.data,
			error: null,
		};
	} catch (error) {
		return {
			data: null,
			error: error,
		};
	}
};

export const deleteRequest = async (uri) => {
	try {
		let response = await axios.delete(uri);

		return {
			data: response.data,
			error: null,
		};
	} catch (error) {
		return {
			data: null,
			error: error,
		};
	}
};

export const putRequest = async (uri, data) => {
	try {
		let response = await axios.put(uri, data);

		return {
			data: response.data,
			error: null,
		};
	} catch (error) {
		return {
			data: null,
			error: error,
		};
	}
};
