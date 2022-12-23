import
{
  StyleSheet,
  Platform,
  Dimensions,
  StatusBar,
  Appearance,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const copyIos = Platform.OS === "ios" ? "23%" : "30%";
const keyIos = Platform.OS === "ios" ? "77%" : "70%";
const modalIos = Platform.OS === "ios" ? 0.38 : 0.3;
const heightIos = Platform.OS === "ios" ? 0.61 : 0.63;

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

export const stylesM = StyleSheet.create({
  // =====================================================================
  // UNITY VARIABLES
  // =====================================================================

  textColorWhite: {
    color: "white",
  },

  textColorBlack: {
    color: "black",
  },

  textColorOpacity: {
    color: "rgba(87, 82, 87, 0.62)"
  },

  textColorSkyBlue: {
    color: "#0092C6",
  },

  textColorSteelBlue: {
    color: "#0C7398",
  },

  textColorOrange: {
    color: "#FF8F15",
  },

  fontSizeTwelve: {
    fontSize: RFValue(8),
  },

  fontSizeFourteen: {
    fontSize: RFValue(10),
  },

  fontSizeSixteen: {
    fontSize: RFValue(13),
  },

  fontSizeEighteen: {
    fontSize: RFValue(15),
  },

  fontSizeTwenty: {
    fontSize: RFValue(17),
  },

  fontSizeTwentyTwo: {
    fontSize: RFValue(18),
  },

  fontSizeTwentyThree: {
    fontSize: RFValue(19),
  },

  fontSizeTwentyFour: {
    fontSize: RFValue(20),
  },

  fontSizeTwentyEight: {
    fontSize: RFValue(23),
  },

  fontSizeThirtyFive: {
    fontSize: RFValue(29),
  },

  fontSizeTwentySix: {
    fontSize: RFValue(22),
  },

  fontSizeTwentySeven: {
    fontSize: RFValue(23),
  },

  fontSizeSeventyFive: {
    fontSize: RFValue(85),
  },

  fontLineTwenty: {
    lineHeight: 22,
  },

  fontLineThirty: {
    lineHeight: 30,
  },

  backgroundRed: {
    backgroundColor: "red",
  },

  backgroundBlack: {
    backgroundColor: "black",
  },

  backgroundBlackMedium: {
    backgroundColor: "rgba(29, 29, 27, 0.8)",
  },

  backgroundTransparenDark: {
    backgroundColor: "#1C1B1F",
  },

  backgroundWhite: {
    backgroundColor: "white",
  },

  backgroundLightCyan: {
    backgroundColor: "#dcf3fb",
  },

  backgroundBlueLight: {
    backgroundColor: "#DCF3FB",
  },

  backgroundGrayLight: {
    backgroundColor: "#e4e7e9",
  },

  backgroundOrange: {
    backgroundColor: "#FF8F15",
  },

  backgroundOrangeLight: {
    backgroundColor: "#FF6145",
  },

  backgroundOpacity: {
    backgroundColor: "rgba(196, 196, 196, 0.5)",
  },
  backgroundGreenligth: {
    backgroundColor: "#CBFAED",
  },
  backgroundOrangeCyan: {
    backgroundColor: "#FCDEB5",
  },

  tintColorGrey: {
    tintColor: "#6e797d",
  },

  tintColorOrange: {
    tintColor: "#FF8F15",
  },

  tintColorWhite: {
    tintColor: "white",
  },

  widthRectangle: {
    width: RFValue(305),
  },

  radiusFive: {
    borderRadius: 5,
  },

  radiusSix: {
    borderRadius: 6,
  },

  radiusEight: {
    borderRadius: 8,
  },

  radiusFifteen: {
    borderRadius: 15,
  },

  radiusEighteen: {
    borderRadius: 18,
  },

  radiusTwenty: {
    borderRadius: 20,
  },

  radiusTwentyFive: {
    borderRadius: 25,
  },

  radiusTwentyNine: {
    borderRadius: 15,
  },

  radiusSixteen: {
    borderRadius: 16,
  },

  radiusThirty: {
    borderRadius: 30,
  },

  radiusTopFour: {
    borderTopLeftRadius: 4,
    borderTopEndRadius: 4,
  },

  marginTopTwo: {
    marginTop: RFValue(2),
  },

  marginTopFive: {
    marginTop: RFValue(3.5),
  },

  marginTopTwenty: {
    marginTop: RFValue(17),
  },

  marginTopThirty: {
    marginTop: RFValue(33),
  },

  marginTopTen: {
    marginTop: RFValue(8),
  },

  marginBottomFifteen: {
    marginBottom: RFValue(15),
  },

  widthPercentageTen: {
    width: "10%",
  },

  widthPercentageTwenty: {
    width: "20%",
  },

  widthPercentageTwentyTwo: {
    width: "25%",
  },

  widthPercentageTree: {
    width: copyIos,
  },

  widthPercentageForty: {
    width: "40%",
  },

  widthPercentageFifty: {
    width: "50%",
  },

  widthPercentageSixty: {
    width: "60%",
  },

  widthPercentageSeven: {
    width: keyIos,
  },

  widthPercentageEighty: {
    width: "80%",
  },

  widthPercentageNinety: {
    width: "90%",
  },

  widthPercentageHundred: {
    width: "100%",
  },

  heightPercentageTen: {
    height: "10%",
  },

  heightPercentageFifteen: {
    height: "15%",
  },

  heightPercentageTwo: {
    height: "20%",
  },

  heightPercentageFifty: {
    height: "50%",
  },

  heightPercentageSix: {
    height: "82%",
  },

  heightPercentageSixtySix: {
    height: "63%",
  },

  heightPercentageEight: {
    height: "80%",
  },

  heightPercentageEightyFive: {
    height: "85%",
  },

  heighPercentageHundred: {
    height: "100%",
  },

  marginPercentageTen: {
    marginHorizontal: "10%",
  },

  marginHorizontalTwelve: {
    marginHorizontal: RFValue(12),
  },

  leftTwelve: {
    marginLeft: RFValue(10),
  },

  paddingEighteen: {
    padding: RFValue(15),
  },

  paddingLeftFive: {
    paddingLeft: RFValue(5),
  },

  paddingLeft: {
    paddingLeft: RFValue(12),
  },

  paddingLeftSixteen: {
    paddingLeft: RFValue(13),
  },

  paddingLeftTitle: {
    paddingLeft: RFValue(12),
  },

  bottomTitle: {
    marginBottom: RFValue(33),
  },

  paddingFour: {
    padding: RFValue(3),
  },

  paddingTopTen: {
    paddingTop: RFValue(8),
  },

  paddingBottomFifteen: {
    paddingBottom: RFValue(12.5),
  },

  paddingHorizontalTwentyFive: {
    paddingHorizontal: RFValue(21),
  },

  paddingHorizontalEight: {
    paddingHorizontal: RFValue(7),
  },

  paddingHorizontalSixteen: {
    paddingHorizontal: RFValue(13),
  },

  paddingHorizontalTwenty: {
    paddingHorizontal: RFValue(17),
  },

  paddingHorizontalTwentySix: {
    paddingHorizontal: RFValue(14),
    paddingVertical: RFValue(16),
  },

  boxTotal: {
    width: "100%",
    height: "100%",
  },

  shadow: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  resizeCover: {
    resizeMode: "cover",
  },

  letterSpacing: {
    letterSpacing: 0.5,
  },

  // =====================================================================
  // END UNITY VARIABLES.
  // =====================================================================
  //Lottie
  lottie: {
    width: RFValue(41.7),
    height: RFValue(41.7),
  },

  lottiexito: {
    width: 60,
    height: 60,
  },

  lottieqr: {
    width: 380,
    height: 380,
  },

  lottiesplash: {
    width: RFValue(70),
    height: RFValue(70),
  },

  lottiecopy: {
    width: 53,
    height: 53,
  },

  lottiecarga: {
    width: 220,
    height: 220,
  },

  lottiefallido: {
    width: RFValue(213.8),
    height: RFValue(213.8),
  },

  lottiesucces: {
    width: RFValue(136.9),
    height: RFValue(136.9),
  },

  lottiecondorchart: {
    //backgroundColor: "red",
    width: 50,
    height: 50,
    flex: 1,
  },

  lottiecerrars: {
    width: RFValue(230),
    height: RFValue(230),
  },

  lottieinternet: {
    width: RFValue(334),
    height: RFValue(334),
  },
  //End Lottie

  //Splash
  boxImgDropi: {
    width: RFValue(131),
    height: RFValue(121),
    resizeMode: "contain",
  },

  boxTextDropi: {
    width: RFValue(191.5),
    height: RFValue(38),
    resizeMode: "contain",
    marginTop: RFValue(20),
  },
  //End Splash
  //Login
  boxTextDropiLight: {
    width: RFValue(150.5),
    height: RFValue(33.5),
    resizeMode: "contain",
  },

  boxImgDelivery: {
    width: RFValue(305),
    height: RFValue(360),
    resizeMode: "contain",
  },

  boxLogin: {
    width: RFValue(305),
    height: RFValue(196.5),
  },

  boxInputEmail: {
    height: RFValue(47),
  },

  boxButtom: {
    height: RFValue(33.5),
  },
  //End Login

  //Load
  boxImgLoad: {
    width: RFValue(185),
    height: RFValue(50),
    resizeMode: "contain",
  },
  //End Load

  //Home
  boxBlueGradient: {
    height: RFValue(202),
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: "hidden",
  },

  boxBlueGradient_img: {
    width: RFValue(140),
    height: RFValue(29),
    resizeMode: "contain",
  },

  boxBlueGradient_boxQr: {
    height: RFValue(43),
  },

  boxBlueGradient_boxQr_img: {
    width: RFValue(49),
    height: RFValue(49),
    resizeMode: "contain",
  },

  boxScroll: {
    position: "absolute",
    top: RFValue(110),
    bottom: RFValue(8),
    paddingLeft: RFValue(17),
    paddingVertical: RFValue(19),
  },

  boxScoll_txt: {
    marginBottom: RFValue(12.5),
  },

  boxScoll_scrollView: {
    marginTop: RFValue(29),
    bottom: RFValue(41.5),
    paddingRight: RFValue(17),
  },

  boxScoll_scrollView_info: {
    height: RFValue(100),
    paddingVertical: RFValue(9),
    paddingHorizontal: RFValue(15),
  },

  boxScoll_scrollView_info_imgDetail: {
    width: RFValue(18),
    height: RFValue(18),
    resizeMode: "contain",
  },

  boxScoll_scrollView_info_img: {
    width: RFValue(17),
    height: RFValue(17),
    resizeMode: "contain",
  },

  boxMore: {
    position: "absolute",
    bottom: RFValue(7.5),
    right: RFValue(19),
  },

  boxMore_btn: {
    width: RFValue(75),
    height: RFValue(24),
  },

  //End Home

  //CompleteOrder

  boxImgComplete: {
    width: RFValue(48),
    height: RFValue(48),
    resizeMode: "contain",
  },
  //End CompleteOrder

  //Settings

  boxScoll_scrollView_dropi: {
    marginTop: RFValue(38),
    marginBottom: RFValue(27),
  },

  boxScoll_scrollView_dropi_img: {
    width: RFValue(130),
    height: RFValue(109),
    resizeMode: "contain",
  },

  boxScroll_height: {
    height: RFValue(67),
  },

  //End Settings

  //End OrderDetail

  boxBlueGradient_boxQr_back: {
    width: RFValue(33.5),
    height: RFValue(33.5),
    resizeMode: "contain",
  },

  boxPhone: {
    height: RFValue(65),
  },

  boxPhone_img: {
    position: "absolute",
    top: RFValue(11),
    right: RFValue(18.5),
  },

  boxPhone_imgCell: {
    width: RFValue(19),
    height: RFValue(19),
    resizeMode: "contain",
  },

  boxMap: {
    height: RFValue(175),
  },

  boxMap_img: {
    height: RFValue(120),
  },

  boxButton: {
    height: RFValue(23.5),
    width: RFValue(72),
  },

  boxStatus: {
    marginTop: 15,
    marginBottom: 1
  },

  boxStatus_txt: {
    height: RFValue(50),
    borderBottomWidth: 2,
    borderColor: "#79747E",
  },

  //End OrderDetail

  //QrReader
  box_titleQr: {
    padding: RFValue(20),
    top: RFValue(-40),
  },

  boxScanQr: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
    borderWidth: 5,
    borderColor: "rgba(0, 146, 199, 0.48)",
  },

  textKey: {
    paddingHorizontal: RFValue(12),
    top: RFValue(-50),
  },

  boxBottomQr: {
    padding: RFValue(12),
  },

  boxBottomQr_txt: {
    height: RFValue(42),
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  boxArrow: {
    position: "absolute",
    left: RFValue(5),
    top: RFValue(2),
    zIndex: 3,
    elevation: 3,
  },

  boxArrow_buttom: {
    width: RFValue(40),
    height: RFValue(40),
    zIndex: 3,
    elevation: 3,
  },

  boxArrow_buttom_image: {
    resizeMode: "contain",
    width: RFValue(35),
    height: RFValue(27),
  },

  //End QrReader

  //Route
  boxRouteMap: {
    position: "absolute",
    top: RFValue(110),
    paddingHorizontal: RFValue(17),
    paddingVertical: RFValue(19),
    paddingBottom: RFValue(48),
  },

  boxSwipe: {
    position: "absolute",
    bottom: RFValue(-35),
  },

  boxSwipe_button: {
    height: RFValue(35),
  },

  boxCheckout: {
    width: RFValue(106),
    height: RFValue(35),
  },

  modalCenter: {
    height: windowHeight * modalIos,
    paddingBottom: RFValue(21),
    paddingHorizontal: RFValue(21),
    paddingTop: RFValue(10),
    width: windowWidth * 0.80,
  },

  modalCenter_img: {
    resizeMode: "contain",
    width: "100%",
    height: RFValue(33.5),
    marginBottom: RFValue(6),
  },


  //End Route

  //OnRoute

  boxOnRoute: {
    position: "relative",
    marginTop: RFValue(-92),
    paddingTop: RFValue(7),
    paddingLeft: RFValue(17),
    paddingBottom: RFValue(10),
    height: windowHeight * heightIos
  },

  boxOnRoute_tittle: {
    paddingLeft: RFValue(17),
    height: "7.5%",
  },

  boxOnRoute_imgBike: {
    resizeMode: "contain",
    width: RFValue(28),
    height: "100%"
  },

  boxOnRoute_map: {
    height: "79%"
  },

  boxOnRoute_info: {
    paddingHorizontal: RFValue(17),
    marginTop: RFValue(10),
  },

  boxOnRoute_imgInfo: {
    resizeMode: "contain",
    width: RFValue(42),
  },

  boxBtnOn: {
    position: "absolute",
    bottom: RFValue(7)
  },

  boxScoll_scrollView_novedad: {
    minHeight: RFValue(50),
    maxHeight: RFValue(350),
    paddingVertical: RFValue(9),
    paddingHorizontal: RFValue(15),
  },

  textNovedad: {
    marginLeft: 5
  },


  //OnRoute End


  // Inicio

  view: {
    width: '100%',
    height: '100%',
    flex: 1,
  },

  fondo: {
    flex: 2,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    alignItems: 'center',
  },

  btn1: {
    marginTop: '170%',

  },

  txtbtn1: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },

  btn2: {
    fontWeight: "bold",
    color: '#FBBA00',
    marginTop: '3%'
  },

  Imagenlogo: {
    resizeMode: 'contain',
    width: 180,
    height: 120
  },
  
  logo: {
    alignItems: "center",
    top: '48%',
    marginBottom: '-20%'
  }

  // end Inicio


});
