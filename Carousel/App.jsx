import React from 'react';

/* Component which contains all the image slides */
class Slider extends React.Component {
  /* This function is called initially when the component gets mounted */
  componentDidMount() {
    let slider = document.querySelector("#slider");
    let firstClonedImage = slider.firstChild.cloneNode(true);
    let lastClonedImage = slider.lastChild.cloneNode(true);

    /* Adding cloned images at the beginning and end of the list */
    firstClonedImage.setAttribute("data-image-index", this.props.images.length + 1);
    slider.appendChild(firstClonedImage);
    lastClonedImage.setAttribute("data-image-index", 0);
    slider.insertBefore(lastClonedImage, slider.childNodes[0]);

    /* adjusting the left offset of <ul> so that the cloned image gets out of the frame */
    slider.style.left = "-" + document.getElementsByTagName('li')[0].clientWidth + "px";
  }

  /* This function gets called everytime when the component is updated (but not initially) */
  componentDidUpdate() {
    let slider = document.getElementById('slider'),
        leftOffset;

    /* adjusting the left offset whenever the currentImageIndex is changed */
    leftOffset = document.getElementsByTagName('li')[0].clientWidth * (this.props.currentImageIndex);
    slider.style.left = "-" + leftOffset + "px";
    setTimeout(function() {
      slider.style.transition = "left 0.5s";  
    });
  }

  render() {
    let imageList = this.props.images.map(function(imgSrc, index) {
      return(
        <li key={index} data-image-index={index + 1} ><img src={imgSrc}/></li>
      );
    });

    return(
      <ul id="slider">
        {imageList}
      </ul>
    );
  }
}

/* Left arrow component for slider */
class LeftArrow extends React.Component {
  render() {
    return(
      <button id="leftArrow" onClick={this.props.slideImage}>
        <img src={this.props.arrowImage} />
      </button>
    );
  }
}

/* Right arrow component for slider */
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
    if(this.localState === nextProps.isTransitionAutomatic) {
      return false;
    } else {
      this.localState = nextProps.isTransitionAutomatic;
      return true;
    }
  }

  componentDidUpdate() {
    if(this.props.isTransitionAutomatic) {
      this.interval = window.setInterval(function() {
        document.getElementById("rightArrow").click();
      }, 1000);
    } else {
      window.clearInterval(this.interval);
    }  
  }

  render() {
    let isTransitionAutomatic = this.props.isTransitionAutomatic;
    return(
      <div id="automaticTransition">
        <input type="checkbox" onChange={this.props.toggleAutomaticTransition} checked={isTransitionAutomatic} />
        <span> Automatic Transition</span>
      </div>
    );
  }
}

/* Component that contains the radio buttons to show the slider progress */
class BulletFrame extends React.Component {
  componentDidMount() {
    document.querySelector("#bulletFrame input:nth-of-type("+ this.props.currentImageIndex +")").checked = true;
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
        document.querySelector("#bulletFrame input:nth-of-type("+ imageIndex +")").checked = true;
      } else {
        document.querySelector("#bulletFrame input:nth-of-type("+ imageIndex +")").checked = false;
      }
    }
  }

  render() {
    var _self = this;
    var bulletList = this.props.images.map(function(item, index) {
      return(<input type="radio" disabled key={index} />);
    });

    return(
      <div id="bulletFrame">
        {bulletList}
      </div>
    );
  }
}

/* The base component which renders all other components */
class Carousel extends React.Component {
  /* This method initializes the state and binds all the methods to the class context */
  constructor(props) {
    super(props);
    this.state = {
      isTransitionAutomatic: false,
      currentImageIndex: 1
    }
    this.toggleAutomaticTransition = this.toggleAutomaticTransition.bind(this);
    this.showPreviousImage = this.showPreviousImage.bind(this);
    this.showNextImage = this.showNextImage.bind(this);
    this.changeImageState = this.changeImageState.bind(this);
    this.repositionSlider = this.repositionSlider.bind(this);
  }

  componentDidMount() {
    let slider = document.getElementById('slider'),
        newWidth,
        _self = this;

    /* calculating the width of the slider according to the inner images */    
    newWidth = document.getElementsByTagName('li')[0].clientWidth * (IMAGES.length + 2);
    slider.style.width = newWidth + "px";
    
    /* adding a boolean to the current context which is true when no transition is going on, and false otherwise */
    this.isTransitionOver = true;
    document.querySelector("#slider").addEventListener("transitionend", function(event) {
      _self.isTransitionOver = true;
    });
  }

  /* the state changer method for "isTransitionAutomatic" state */
  toggleAutomaticTransition() {
    this.setState({
      isTransitionAutomatic: !this.state.isTransitionAutomatic
    });
  }

  /* handler which gets called on previous arrow click */
  showPreviousImage() {
    if(this.isTransitionOver) {
      this.arrowType = "previous";
      this.changeImageState();
      this.isTransitionOver = false;
    }
  }

  /* handler which gets called on next arrow click */
  showNextImage() {
    if(this.isTransitionOver) {
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
      slider.addEventListener("transitionend", this.repositionSlider);
    } else if(this.arrowType === "next" && this.state.currentImageIndex === 5) {
      slider.addEventListener("transitionend", this.repositionSlider);
    }
  }

  repositionSlider() {
    let slider = document.querySelector("#slider");
    /* turning off transition to hide the reseting of slider left position */
    slider.style.transition = "none";
    this.setState({
      currentImageIndex: this.arrowType === "previous" ? IMAGES.length : 1
    });
    slider.removeEventListener("transitionend", this.repositionSlider);
  }

  render() {
    return(
      <div id="carousel">
        <div id="frame">
          <LeftArrow slideImage={this.showPreviousImage} arrowImage={ARROW} />
          <Slider images={IMAGES} currentImageIndex={this.state.currentImageIndex} />
          <RightArrow slideImage={this.showNextImage} arrowImage={ARROW} />
        </div>
        <AutomaticTransition isTransitionAutomatic={this.state.isTransitionAutomatic} toggleAutomaticTransition={this.toggleAutomaticTransition} />
        <BulletFrame images={IMAGES} currentImageIndex={this.state.currentImageIndex} />
      </div>
    );
  }
}
 
const IMAGES = [
  "Images/slides/1.jpg",
  "Images/slides/2.jpg",
  "Images/slides/3.jpg",
  "Images/slides/4.jpg",
  "Images/slides/5.jpg"
];

const ARROW = "Images/arrow.png";

export default Carousel;