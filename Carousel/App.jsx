import React from 'react';
 
const IMAGES = [
  "Images/slides/1.jpg",
  "Images/slides/2.jpg",
  "Images/slides/3.jpg",
  "Images/slides/4.jpg",
  "Images/slides/5.jpg"
];

const ARROW = "Images/arrow.png";

/* The base component which renders all other components */
class CarouselContainer extends React.Component {
  constructor(props) {
    super(props);

    /* setting the default parameters */
    this.defaults = {
      infiniteLoop: false,
      speed: 500,
      autoStart: false,
      slideCount: IMAGES.length,
      activeSlide: 1,
      carouselContainerWidth: "50%",
      carouselContainerHeight: "50%"
    };

    for(let property in this.props) {
      this.defaults[property] = this.props[property];
    }

    /* creating the state object */
    this.state = {
      isTransitionAutomatic: this.defaults.autoStart,
      currentImageIndex: this.defaults.activeSlide
    }

    /* binding all the methods to the class' context */
    this.toggleAutomaticTransition = this.toggleAutomaticTransition.bind(this);
    this.showPreviousImage = this.showPreviousImage.bind(this);
    this.showNextImage = this.showNextImage.bind(this);
    this.changeImageState = this.changeImageState.bind(this);
    this.repositionCarousel = this.repositionCarousel.bind(this);
    this.changeImageOnBulletClick = this.changeImageOnBulletClick.bind(this);
  }

  componentDidMount() {
    let newWidth,
        _self = this,
        images = carousel.getElementsByTagName('img');

    /* setting the options */
    carouselContainer.style.width = this.defaults.carouselContainerWidth;
    carouselContainer.style.height = this.defaults.carouselContainerHeight;
    Object.keys(images).forEach(function(image, index) {
      images[image].style.width = carouselContainer.parentElement.offsetWidth + "px";
      images[image].style.height = carouselContainer.parentElement.offsetHeight + "px";
    });
    carousel.style.transition = "left "+ this.defaults.speed +"ms";

    automaticTransition.querySelector('span').addEventListener("click", function() {
      toggleTransitionBtn.click();
    });

    /* adjusting the left offset of <ul> so that the cloned image gets out of the frame */
    carousel.style.left = "-" + (document.getElementsByTagName('li')[0].clientWidth * this.state.currentImageIndex) + "px";

    /* calculating the width of the carousel according to the inner images */    
    newWidth = document.getElementsByTagName('li')[0].clientWidth * (IMAGES.length + 2);
    carousel.style.width = newWidth + "px";
    
    /* adding a boolean to the current context which is true when no transition is going on, and false otherwise */
    this.isTransitionOver = true;
    carousel.addEventListener("transitionend", function(event) {
      _self.isTransitionOver = true;
    });
  }

  changeImageOnBulletClick(imageIndex) {
    if(this.isTransitionOver) {
      this.setState({
        currentImageIndex: imageIndex
      });
      this.isTransitionOver = false;
    }
  }

  /* the state changer method for "isTransitionAutomatic" state */
  toggleAutomaticTransition() {
    this.setState({
      isTransitionAutomatic: !this.state.isTransitionAutomatic
    });
  }

  /* handler which gets called on previous arrow click */
  showPreviousImage() {
    if(this.isTransitionOver && carousel.style.transition !== "none") {
      this.arrowType = "previous";
      this.changeImageState();
      this.isTransitionOver = false;
    }
  }

  /* handler which gets called on next arrow click */
  showNextImage() {
    if(this.isTransitionOver && carousel.style.transition !== "none") {
      this.arrowType = "next";
      this.changeImageState();
      this.isTransitionOver = false;
    }
  }

  /* the state changer method for "currentImageIndex" state */
  changeImageState() {
    this.setState({
      currentImageIndex: this.arrowType === "previous" ? this.state.currentImageIndex - 1 : this.state.currentImageIndex + 1
    });

    /* handling boundary cases */
    if(this.arrowType === "previous" && this.state.currentImageIndex === 1) {
      carousel.addEventListener("transitionend", this.repositionCarousel);
    } else if(this.arrowType === "next" && this.state.currentImageIndex === IMAGES.length) {
      carousel.addEventListener("transitionend", this.repositionCarousel);
    }
  }

  repositionCarousel() {
    /* turning off transition to hide the reseting of carousel left position */
    carousel.style.transition = "none";
    this.setState({
      currentImageIndex: this.arrowType === "previous" ? IMAGES.length : 1
    });
    carousel.removeEventListener("transitionend", this.repositionCarousel);
  }

  render() {
    return(
      <div id="carouselContainer">
        <div id="frame">
          <LeftArrow slideImage={this.showPreviousImage} arrowImage={ARROW} />
          <Carousel images={IMAGES} speed={this.defaults.speed} currentImageIndex={this.state.currentImageIndex} />
          <RightArrow slideImage={this.showNextImage} arrowImage={ARROW} />
        </div>
        <AutomaticTransition speed={this.defaults.speed} isTransitionAutomatic={this.state.isTransitionAutomatic} toggleAutomaticTransition={this.toggleAutomaticTransition} />
        <BulletFrame images={IMAGES} currentImageIndex={this.state.currentImageIndex} changeImageOnBulletClick={this.changeImageOnBulletClick} />
      </div>
    );
  }
}

/* Component which contains all the image slides */
class Carousel extends React.Component {
  /* This function is called initially when the component gets mounted */
  componentDidMount() {
    let firstClonedImage = carousel.firstChild.cloneNode(true);
    let lastClonedImage = carousel.lastChild.cloneNode(true);

    /* Adding cloned images at the beginning and end of the list */
    firstClonedImage.setAttribute("data-image-index", this.props.images.length + 1);
    carousel.appendChild(firstClonedImage);
    lastClonedImage.setAttribute("data-image-index", 0);
    carousel.insertBefore(lastClonedImage, carousel.childNodes[0]);
  }

  /* This function gets called everytime when the component is updated (but not initially) */
  componentDidUpdate() {
    let leftOffset,
        _self = this;

    /* adjusting the left offset whenever the currentImageIndex is changed */
    leftOffset = document.getElementsByTagName('li')[0].clientWidth * (_self.props.currentImageIndex);
    carousel.style.left = "-" + leftOffset + "px";
    setTimeout(function() {
      carousel.style.transition = "left "+ _self.props.speed +"ms";
    });
  }

  render() {
    let imageList = this.props.images.map(function(imgSrc, index) {
      return(
        <li key={index} data-image-index={index + 1} ><img src={imgSrc}/></li>
      );
    });

    return(
      <ul id="carousel">
        {imageList}
      </ul>
    );
  }
}

/* Left arrow component for carousel */
class LeftArrow extends React.Component {
  render() {
    return(
      <button id="leftArrow" onClick={this.props.slideImage}>
        <img src={this.props.arrowImage} />
      </button>
    );
  }
}

/* Right arrow component for carousel */
class RightArrow extends React.Component {
  render() {
    return(
      <button id="rightArrow" onClick={this.props.slideImage}>
        <img src={this.props.arrowImage} />
      </button>
    );
  }
}

/* The checkbox component for toggling the automatic transition */
class AutomaticTransition extends React.Component {
  /* The method which controls the rendering of component. If it returns true, component renders, and vice-versa
   * @param {nextProps} Object - contains the updated props
   * (here nextProps.isTransitionAutomatic gives the updated state value, where this.props.isTransitionAutomatic doesn't)
   */
  shouldComponentUpdate(nextProps) {
    if(this.localState === nextProps.isTransitionAutomatic) { /* this code block gets executed when isTransitionAutomatic has not changed */
      return false;
    } else if(this.localState === undefined && this.props.isTransitionAutomatic) { /* this code block gets executed initially when the defaults.autoStart is true */
      this.localState = nextProps.isTransitionAutomatic;
      return false;
    } else { /* this code block gets executed when isTransitionAutomatic state gets changed on toggling checkbox */
      this.localState = nextProps.isTransitionAutomatic;
      return true;
    }
  }

  componentDidMount() {
    /* Calls componentDidUpdate as same operations are required on component mount as well */
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if(this.props.isTransitionAutomatic) {
      rightArrow.click(); /* so that the transition start as soon as user checks the checkbox (since setInterval fires after delay) */
      this.interval = window.setInterval(function() {
        rightArrow.click();
      }, 2 * this.props.speed);
    } else {
      window.clearInterval(this.interval);
    }  
  }

  render() {
    let isTransitionAutomatic = this.props.isTransitionAutomatic;
    return(
      <div id="automaticTransition">
        <input type="checkbox" id="toggleTransitionBtn" onChange={this.props.toggleAutomaticTransition} checked={isTransitionAutomatic} />
        <span htmlFor="toggleTransitionBtn"> Automatic Transition</span>
      </div>
    );
  }
}

/* Component that contains the radio buttons to show the carousel progress */
class BulletFrame extends React.Component {
  componentDidMount() {
    bulletFrame.querySelector("input:nth-of-type("+ this.props.currentImageIndex +")").checked = true;
  }

  componentDidUpdate() {
    let currentImageIndex = this.props.currentImageIndex;
    
    /* handling the boundary cases */
    if(currentImageIndex === 0) {
      currentImageIndex = this.props.images.length;
    } else if(currentImageIndex === this.props.images.length + 1) {
      currentImageIndex = 1;
    }

    /* setting the checked attribute value according to the in-frame image */
    for(let imageIndex = 1; imageIndex <= this.props.images.length; imageIndex++) {
      if(imageIndex === currentImageIndex) {
        bulletFrame.querySelector("input:nth-of-type("+ imageIndex +")").checked = true;
      } else {
        bulletFrame.querySelector("input:nth-of-type("+ imageIndex +")").checked = false;
      }
    }
  }

  render() {
    var _self = this;
    var bulletList = this.props.images.map(function(item, index) {
      return(<input type="radio" key={index} onClick={_self.props.changeImageOnBulletClick.bind(null, index+1)} />);
    });

    return(
      <div id="bulletFrame">
        {bulletList}
      </div>
    );
  }
}

export default CarouselContainer;