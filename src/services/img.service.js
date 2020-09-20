class ImgService {
  getNationalite(nomNationalite){
    switch (nomNationalite) {
      case 'FRANCE': return require('../assets/france.png');break;
      case 'MAROC': return require('../assets/morocco.png');break;
      default: return require('../assets/france.png');break;
    }
  }
}

export default new ImgService();