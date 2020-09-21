import axiosInstance from "../shared/http-common";

class DataService {

  login(body){
    return axiosInstance.post("/login" , body)
  }
  register(body){
    return axiosInstance.post("/register" , body)
  }
  getAllUsers(){
    return axiosInstance.get("/users")
  }
  detailsUser(body){
    return axiosInstance.post("/user/details" , body)
  }
  userUpdate(body){
    return axiosInstance.put("/user/update" , body)
  }

  getAllNationalites(){
    return axiosInstance.get("/nationalite")
  }
  getAllEvents() {
    return axiosInstance.get("/epreuve");
  }
  participeEvents(body){
    return axiosInstance.post("/participer" , body)
  }
  annulerParticipation(body){
    return axiosInstance.post("/annuler/participation" , body)
  }







  getParticipations(body, headers){
    return axiosInstance.post("/participation" , body, headers)
  }
  supprimerEvents(body, headers){
    return axiosInstance.post("/epreuve/delete", body, headers)
  }

  supprimerUsers(body, headers){
    return axiosInstance.post("/user/delete", body, headers)
  }

  createEvents(body, headers){
    return axiosInstance.post("/epreuve/create", body, headers)
  }
}

export default new DataService();