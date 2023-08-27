import axios, { AxiosResponse } from 'axios';
import { TodoModel } from './../Models/Todo';
import urlService from './UrlService';
import { LoginReqModel, LoginResModel } from '../Models/Login';
import store from './../Redux/Store'
import { RegisterReqModel } from '../Models/Register';
class WebApiService {

    public login(data: LoginReqModel): Promise<AxiosResponse<LoginResModel>> {
        return axios.post<LoginResModel>(urlService.auth + "/login", data);
    }

    public register(data: RegisterReqModel): Promise<AxiosResponse<any>> {
        return axios.post<any>(urlService.auth + "/register", data);
    }

    public getAllTasks(): Promise<AxiosResponse<TodoModel[]>> {
        return axios.get<TodoModel[]>(urlService.todo);
    }

    public getAllTasksAuth(): Promise<AxiosResponse<TodoModel[]>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.get<TodoModel[]>(urlService.user, { headers });
    }

    public addTaskAuth(todo: TodoModel): Promise<AxiosResponse<TodoModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.post<TodoModel>(urlService.user, todo, { headers });
    }

    public deleteTaskAuth(id: number): Promise<AxiosResponse<any>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.delete<any>(`${urlService.user}/${id}`, { headers })
    }

    public updateTaskAuth(id: number, todo: TodoModel): Promise<AxiosResponse<TodoModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.put(`${urlService.user}/${id}`, todo, { headers });
    }

}

const webApiService = new WebApiService();
export default webApiService;