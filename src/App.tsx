import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ImageViewer from "./ImageViewer";

function App() {
  const imgSource = [
    "https://danbooru.donmai.us/data/__makinami_mari_illustrious_neon_genesis_evangelion_and_1_more_drawn_by_nezzme__ad3eb8dda955837edbd21fd97333e736.jpg",
    "https://danbooru.donmai.us/data/__kawai_rika_wonder_egg_priority_drawn_by_purrr__994fed595641e9d536a6777e0d86570c.jpg",
    "https://danbooru.donmai.us/data/__kazano_hiori_idolmaster_and_1_more_drawn_by_world_create__e66b1802aa3693e5d64aa74ef67809a8.png",
    "https://danbooru.donmai.us/data/__runa_kei_indie_virtual_youtuber_drawn_by_usotsuki_penta__0c52f02caf95b0c8bdc52134ea278f1f.jpg",
    "https://danbooru.donmai.us/data/__natalia_luzu_kimlasca_lanvaldear_tales_of_and_1_more_drawn_by_muguet__cb408fad062b255a47f1b60316f9cffb.png",
    "https://danbooru.donmai.us/data/__link_the_legend_of_zelda_and_1_more_drawn_by_joanne_tran__f9a8f8174c914319427a2d1d5879cb6a.jpg",
  ];
  var images: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >[] = [];
  loadImages();

  const [currentImage, setCurrentImage] = useState("");

  function loadImages() {
    // images.push(<img src=></img>)
    for (let i = 0; i < imgSource.length; i += 1) {
      images.push(
        <img
          key={i}
          className="imgTable"
          src={imgSource[i]}
          onClick={() => {
            selectImage(imgSource[i]);
          }}
        ></img>
      );
    }
  }

  function selectImage(source: string) {
    // console.log(source)
    setCurrentImage(source);
  }

  function setVisibility(visible: boolean) {
    selectImage("");
  }

  return (
    <div>
      {images}
      <ImageViewer src={currentImage} setVisibility={setVisibility} />
    </div>
  );
}

export default App;
