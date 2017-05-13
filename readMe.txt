Steps to change the parameters of Carousel

1. Open main.js
2. The default values of the parameters are:-
	{
      speed: 500,
      autoStart: false,
      activeSlide: 1,
      isInfinite: true
	}
3. Pass the new parameters as props inside the App component. For eg:-
	<App speed={1000} />

NOTE: The outermost div with the id "app" has to have fixed width and height, otherwise the Carousel would break. The responsive behaviour should also be defined inside this outer div. The Carousel will take the 100% width/height of this div.