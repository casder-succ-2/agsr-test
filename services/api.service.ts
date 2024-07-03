import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export class ApiError extends Error {
	__proto__: ApiError

	data: any

	status: number

	constructor(data: any, status = 500, statusText = 'Internal Server Error') {
		super(`${status} ${statusText}`)

		this.constructor = ApiError
		this.__proto__ = ApiError.prototype

		this.name = this.constructor.name
		this.data = data
		this.status = status

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor)
		}
	}

	inspect() {
		return this.stack
	}
}
const throwApiError = ({ status, statusText, data }: any) => {
	console.error(`API Error: ${status} ${statusText}`, data)
	throw new ApiError(data, status, statusText)
}

class ApiClient {
	_api: AxiosInstance

	_handlers: Map<string, any>

	constructor(axiosConfig: AxiosRequestConfig) {
		this._handlers = new Map()

		this._api = axios.create(axiosConfig)
		this._api.interceptors.response.use(
			(response: AxiosResponse) => response.data,
			async error => {
				const originalRequest = error.config

				if (error.response.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true

					await axios.get('/api/account/refresh-tokens', {
						withCredentials: true,
					})

					return this._api(originalRequest)
				}

				if (axios.isCancel(error)) {
					throw error
				}

				const errorResponse = error.response || {
					status: error.code,
					statusText: error.message,
					data: error.data,
				}

				const errorHandlers = this._handlers.get('error') || []
				errorHandlers.forEach((handler: any) => {
					handler(errorResponse)
				})

				return throwApiError(errorResponse)
			},
		)
	}

	get(
		url: string,
		params: any = {},
		requestConfig: AxiosRequestConfig<any> = {},
	): Promise<any> {
		return this._api({
			method: 'get',
			url,
			params,
			...requestConfig,
		})
	}

	post(
		url: string,
		data: any = {},
		requestConfig: AxiosRequestConfig<any> = {},
	): Promise<any> {
		return this._api({
			method: 'post',
			url,
			data,
			...requestConfig,
		})
	}

	put(
		url: string,
		data: any = {},
		requestConfig: AxiosRequestConfig<any> = {},
	): Promise<any> {
		return this._api({
			method: 'put',
			url,
			data,
			...requestConfig,
		})
	}

	delete(
		url: string,
		data: any = {},
		requestConfig: AxiosRequestConfig<any> = {},
	): Promise<any> {
		return this._api({
			method: 'delete',
			url,
			data,
			...requestConfig,
		})
	}
}

export const apiService = new ApiClient({
	baseURL: 'http://localhost:3000',
	withCredentials: true,
	responseType: 'json',
})
