import React from "react";
import "./ImageViewer.css";

interface IProps {
  src: string;
  setVisibility: (visible: boolean) => void;
}

interface IState {
  currentScale: number;
  moveStart: { x: number; y: number };
  moveBy: { x: number; y: number };
  currentTransform: { x: number; y: number };
}
export default class ImageViewer extends React.Component<IProps, IState> {
  imageRef: React.RefObject<HTMLImageElement>;
  constructor(props: IProps) {
    super(props);
    //  console.log(this.props.src)
    this.imageRef = React.createRef();
    this.state = {
      currentScale: 1,
      moveStart: { x: 0, y: 0 },
      moveBy: { x: 0, y: 0 },
      currentTransform: { x: 0, y: 0 },
    };
  }

  hide() {
    this.props.setVisibility(false);
    this.setState({ currentScale: 1 });
  }

  zoom(e: any) {
    function changeScaleState(currentZoom: number, zoom: number) {
      return currentZoom + zoom;
    }

    if (e.deltaY > 0) {
      console.log("small");
      this.setState(function (prevState) {
        return { currentScale: changeScaleState(prevState.currentScale, -0.1) };
      });
    } else if (e.deltaY < 0) {
      this.setState(function (prevState) {
        return { currentScale: changeScaleState(prevState.currentScale, 0.1) };
      });
    }
  }
  render() {
    return (
      <div
        onKeyPress={(e) => {
          console.log(e);
        }}
        onMouseDown={(e) => {
          this.imageRef.current?.classList.add("dragging");
          this.setState({ moveStart: { x: e.clientX, y: e.clientY } });

          console.log("DOWN");
        }}
        onMouseUp={(e) => {
          console.log("UP");
          this.imageRef.current?.classList.remove("dragging");
          this.setState({
            currentTransform: {
              x: this.state.moveBy.x,
              y: this.state.moveBy.y,
            },
          });
        }}
        onWheel={this.zoom.bind(this)}
        onMouseMove={(e) => {
          if (this.imageRef.current?.classList.contains("dragging")) {
            let scale = 1;
            this.setState({
              moveBy: {
                x:
                  (this.state.currentTransform.x +
                    e.clientX -
                    this.state.moveStart.x) *
                  scale,
                y:
                  (this.state.currentTransform.y +
                    e.clientY -
                    this.state.moveStart.y) *
                  scale,
              },
            });
          }
        }}
        className={`image parent ${this.props.src === "" ? "hidden" : "shown"}`}
      >
        <div
          onClick={this.hide.bind(this)}
          className="overlay scale"
        >{`${Math.round(this.state.currentScale * 100)}%`}</div>
        <div
          className="imageParent"
          style={{
            transform: `translate(${this.state.moveBy.x}px, ${this.state.moveBy.y}px)`,
          }}
        >
          <img
            draggable={false}
            alt="Fullscreen"
            style={{
              transform: `scale(${this.state.currentScale})`,
            }}
            ref={this.imageRef}
            src={this.props.src}
          ></img>
        </div>
      </div>
    );
  }
}
