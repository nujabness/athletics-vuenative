import axiosInstance from "../shared/http-common";

class DataService {

  login(body){
    return axiosInstance.post("/login" , body)
  }
  register(body){
    return axiosInstance.post("/register" , body)
  }
  supprimerUsers(body){
    return axiosInstance.post("/user/delete", body)
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
  eventUpdate(body){
    return axiosInstance.put("/epreuve/update", body)
  }
  getParticipations(body){
    return axiosInstance.post("/participation" , body)
  }
  participationUpdate(body){
    return axiosInstance.put("/participation/update", body)
  }
  supprimerEvent(body){
    return axiosInstance.post("/epreuve/delete", body)
  }
  eventCreate(body){
    return axiosInstance.post("/epreuve/create", body)
  }
}

export default new DataService();