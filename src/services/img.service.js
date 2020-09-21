class ImgService {
  getNationalite(nomNationalite){
    switch (nomNationalite) {
      case 'FRANCE': return require('../assets/france.png');break;
      case 'MAROC': return require('../assets/morocco.png');break;
      default: return require('../assets/france.png');break;
    }
  }
  getEvent(typeEvent){
    switch (typeEvent) {
      case 'SPRINT': return require('../assets/athletics.png');break;
      default: return require('../assets/athletics.png');break;
    }
  }
}

export default new ImgService();