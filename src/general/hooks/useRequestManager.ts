import IRequestManager from '../interfaces/IRequestManager';
import axios from 'axios';
import { useState } from 'react';
import BasicStatus from '../types/BasicStatus';

export default function useRequestManager<Request, Response>(): IRequestManager<Request, Response> {
    const [status, setStatus] = useState<BasicStatus>(BasicStatus.Idle);

    async function get(url: string, data?: Request): Promise<Response | null> {
        return new Promise<Response | null>((resolve, reject) => {
            setStatus(BasicStatus.Doing);

            axios.get(url, { params: data })
                .then((res) => {
                    resolve(res.data);
                    setStatus(BasicStatus.Success);
                })
                .catch((error) => {
                    setStatus(BasicStatus.Failed);
                    reject(null);
                });
        });
    }

    async function post(url: string, data?: Request): Promise<Response | null> {
        return new Promise<Response | null>((resolve, reject) => {
            setStatus(BasicStatus.Doing);

            axios.post(url, data)
                .then((res) => {
                    resolve(res.data);
                    setStatus(BasicStatus.Success);
                })
                .catch((error) => {
                    reject(null);
                    setStatus(BasicStatus.Failed);
                });
        });
    }

    async function patch(url: string, data?: Request): Promise<Response | null> {
        return new Promise<Response | null>((resolve, reject) => {
            setStatus(BasicStatus.Doing);

            axios.patch(url, data)
                .then((res) => {
                    resolve(res.data);
                    setStatus(BasicStatus.Success);
                })
                .catch((error) => {
                    reject(null);
                    setStatus(BasicStatus.Failed);
                });
        });
    }

    return {
        status,
        get,
        post,
        patch,
    }
}
