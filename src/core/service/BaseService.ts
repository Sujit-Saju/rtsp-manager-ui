/**
* File: Sujit.ts
* Company: Eoxys
* Author: AK
* Description: Global Base Api
* Modification History: 
* Date         Version         Author         Description
* ---------------------------------------------------------------------------------
* 28-May-2024    V10            AK          Initial Draft
* 
*/

import api from "../api/axios";


export const PostAPI = (url: string, body?: any, config?: any) => {

    return api.post(url, body, config)

};

export const GetAPI = (url: string, config?: any) => {

    return api.get(url, config)

};

export const PutAPI = (url: string, body?: any, config?: any) => {

    return api.put(url, body, config)

};

export const PatchAPI = (url: string, body?: any, config?: any) => {

    return api.patch(url, body, config)

};

export const DeleteAPI = (url: string, config?: any) => {

    return api.delete(url, config)

};