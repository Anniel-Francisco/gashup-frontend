import axios from 'axios';

const pathName = window.location.pathname;
var baseUrl: string;

baseUrl = pathName.includes("localhost")
  ? `http://localhost:3006/api`
  : `http://localhost:3006/api`;

interface apiResponse {
  ok: boolean;
  mensaje: string;
  message: string;
  data?: string
}

const fetchData = async (url: string) => {
	try {
		const configuration = {
			method: 'get',
			url: `${baseUrl}` + url,
		};
		const response: apiResponse = await axios(configuration);
		return response.data;
	} catch (error) {
		return error;
	}
};

const sendData = async (url: string, data: {}) => {
	try {
		const configuration = {
			method: 'post',
			url: `${baseUrl}` + url,
			data: data,
		};

		const response: apiResponse = await axios(configuration);
		return response?.data;
	} catch (error) {
		return error
	}
};

const sendDataPut = async (url: string, data: {}) => {
	try {
		const configuration = {
			method: 'put',
			url: `${baseUrl}` + url,
			data: data,
		};

		const response: apiResponse = await axios(configuration);
		return response.data;
	} catch (error) {
		return error;
	}
};

const sendDataDelete = async (url: string) => {
	try {
		const configuration = {
			method: 'delete',
			url: `${baseUrl}` + url,
		};
		const response: apiResponse = await axios(configuration);
		return response.data;
	} catch (error) {
		return error;
	}
};

export { fetchData, sendData, sendDataPut, sendDataDelete };
