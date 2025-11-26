import baseAPI from "../api/baseApi";
import { authHeader, authHeaderWithImage } from "../helpers/authHeader";
import { toast } from "react-toastify";


const getDashboard = async () => {
    try {
        const res = await baseAPI.get(`dashboard/`);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
};

const createContact = async (data) => {
    console.log("data",data)
    try {
        const formdata = new FormData();
        formdata.append("name", data?.name);
        formdata.append("email", data?.email);
        formdata.append("phone",data?.phone);
        formdata.append("message", data?.message);
        formdata.append("subject",data?.subject);


        const res = await baseAPI.post(`contact-us/`,formdata);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
};

const CommanServices = {
    getDashboard,
    createContact,
};

export default CommanServices;